"use client"

import { deleteTask, finishTask } from "@/app/services/taskApi";
import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { TaskResponse } from "@/app/types/task"
import { getTasksByCategory } from "@/app/services/taskApi"

export default function ReadAllTaskPage() {
  const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.id);

    const [tasks, setTasks] = useState<TaskResponse[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortType, setSortType] = useState("dueDate");
     const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/user/login");
    }
    const sortedTasks = [...tasks].sort((a, b) => {
          // 完了済みを最後にする
          if (a.isFinished !== b.isFinished) {
            return a.isFinished ? 1 : -1;
          }
          // 並び替えの条件に応じてソートする
        if (sortType === "dueDate") {
          return sortOrder === "asc"
            ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
            : new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        }
        if (sortType === "priority") {
          return sortOrder === "asc"
            ? a.priority - b.priority
            : b.priority - a.priority;
        }
        return 0;
      });

    const fetchTasks = useCallback(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }
      try {
        const data = await getTasksByCategory(token, categoryId);
        setTasks(data);
      } catch (error) {
        console.error(error);
        alert("タスクの取得に失敗しました");
      }
    }, [categoryId, router]);

    useEffect(() => {
      fetchTasks();
    }, [fetchTasks]);

    const handleFinish = async (id: number) => {
      if (!confirm("ステータスを変更しますか？")) {
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("ログインしてください");
          return;
        }
        await finishTask(token, id);
        alert("完了しました");
        // 一覧を再取得
        await fetchTasks();
      } catch (error) {
        console.error(error);
        alert("完了に失敗しました");
      }
    };
     const handleDelete = async (id: number) => {
      if (!confirm("このタスクを削除しますか？")) {
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("ログインしてください");
          return;
        }
        await deleteTask(token, id);
        alert("削除しました");
        // 一覧を再取得
        await fetchTasks();
        // router.push(`/task/readAll/${categoryId}`);
      } catch (error) {
        console.error(error);
        alert("削除に失敗しました");
      };
    }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-4xl px-6">
      <h1 className="mb-10 text-center text-5xl font-bold text-slate-700">タスク一覧</h1>
      <button
      onClick={() => router.push(`/task/create/${categoryId}`)}
      className="mb-4 cursor-pointer  rounded bg-slate-500 px-4 py-2 text-white"
    >タスク作成</button>
     <button
      onClick={handleLogout}
      className="mb-4 cursor-pointer  rounded bg-slate-500 px-4 py-2 text-white"
    >ログアウト</button>
    <div className="mb-4">

  <label>並び替え：</label>
  <select
    value={sortType}
    onChange={(e) => setSortType(e.target.value)}
  >
    <option value="dueDate">期限日</option>
    <option value="priority">優先度</option>
  </select>
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="ml-2"
  >
    <option value="asc">昇順</option>
    <option value="desc">降順</option>
  </select>
</div>
    <br />
      {sortedTasks.map((task) => {
        const isExpired = !task.isFinished && new Date(task.endDate) < new Date(new Date().setHours(0, 0, 0, 0));
      return(
        <div
          key={task.id}
          className={`mb-5 rounded-xl border p-6 shadow-md transition hover:shadow-xl ${isExpired
          ? "border-red-400 bg-red-100"
          : "border-slate-200 bg-white"
        }`}
        >
          <h2 className="text-2xl font-semibold text-slate-600">{task.title}</h2>
          <p>開始日：{task.startDate}</p>
          <p>終了日：{task.endDate}</p>
          <p>優先度：{task.priority}</p>
          <p>ステータス：{task.isFinished ? "完了" : "着手中"}</p>

        <button
          onClick={() => router.push(`/task/update/${task.id}`)}
          className="mb-4 cursor-pointer  rounded bg-slate-500 px-4 py-2 text-white"
        >編集
        </button>
        <button
        className="mb-4 cursor-pointer  rounded bg-slate-500 px-4 py-2 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(task.id);
          }}
        >
          削除
        </button>
        <button
          onClick={() => handleFinish(task.id)}
          className={`ml-2 cursor-pointer  rounded px-4 py-2 text-white ${
            task.isFinished ? "bg-red-500" : "bg-slate-500"
          }`}
        >
          {task.isFinished ? "未着手に戻す" : "完了"}
        </button>
        </div>
      );
      })}
      <button
      onClick={() => router.push("/user/mypage")}
      className="mb-4 cursor-pointer  rounded bg-slate-500 px-4 py-2 text-white"
    >戻る</button>
      </div>
    </div>
  );
}