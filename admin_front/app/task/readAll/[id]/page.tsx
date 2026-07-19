"use client"

import Link from "next/link";
import { deleteTask } from "@/app/services/taskApi";
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
    const sortedTasks = [...tasks].sort((a, b) => {
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
      }
    }

  return (
    <div>
      <h1>タスク一覧</h1>
      <button
      onClick={() => router.push(`/task/create/${categoryId}`)}
      className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
    >タスク作成</button>
     <br />
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
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-lg p-4 mb-3"
        >
          <h2>{task.title}</h2>
          <p>開始日：{task.startDate}</p>
          <p>終了日：{task.endDate}</p>
          <p>優先度：{task.priority}</p>

        <Link href={`/task/update/${task.id}`}
          onClick={(e) => e.stopPropagation()}>
          編集
        </Link>
        <button
          onClick={() => handleDelete(task.id)}>
          🗑️
        </button>
        </div>
      ))}
      <button
      onClick={() => router.push("/user/mypage")}
      className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
    >戻る</button>
    </div>
  );
}