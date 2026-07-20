"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getTaskById, updateTask } from "@/app/services/taskApi";
import { TaskUpdateRequest } from "@/app/types/task";

export default function UpdateTaskPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [task, setTask] = useState<TaskUpdateRequest>({
    title: "",
    startDate: "",
    endDate: "",
    isFinished: false,
    priority: 0,
    taskCategoryId: 0,
  });

  // 画面表示時にタスクを取得
  useEffect(() => {
    async function fetchTask() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }

      try {
        const data = await getTaskById(token, id);
        setTask({
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
          isFinished: data.isFinished,
          priority: data.priority,
          taskCategoryId: data.taskCategory.id,
        })
      } catch (error) {
        console.error(error);
        alert("タスクの取得に失敗しました");
      }
    }

    fetchTask();
  }, [id, router]);

  // 更新処理
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!task.title) {
      alert("タイトルを入力してください");
      return;
    }
    if (!task.startDate) {
      alert("開始日を入力してください");
      return;
    }
    if (!task.priority) {
      alert("優先度を入力してください");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }

      await updateTask(token, id, task);

      alert("タスクの更新が完了しました");
      router.push(`/task/readAll/${task.taskCategoryId}`);
    } catch (error: unknown) {
      console.error(error);
      if(error instanceof Error) {
        alert(error.message);
      } else {
        alert("タスク更新に失敗しました");
      }
    }
  };

return (
  <div className="min-h-screen bg-slate-100 py-10">
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
      <h1 className="text-2xl font-bold mb-4">タスク編集</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-semibold text-slate-700">タスク名</label>
          <input
            className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
            type="text"
            value={task.title}
            required
            onChange={(e) =>
              setTask({
              ...task,
              title: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-slate-700">開始日</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={task.startDate}
          required
          onChange={(e) =>
            setTask({
              ...task,
              startDate: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-slate-700">終了日</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={task.endDate}
          required
          onChange={(e) =>
            setTask({
              ...task,
              endDate: e.target.value,
            })
          }
        />
      </div>

       <div >
        <label className="block text-lg font-semibold text-slate-700">優先度</label>
        <select
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
        value={task.priority}
        onChange={(e) => 
          setTask({
            ...task,
            priority: Number(e.target.value)
          })
        }
        >
          <option value={0}>選択してください</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      <button type="submit" className="rounded bg-slate-500 px-4 py-2 text-white">
        更新
      </button>
    </form>
    <br />
        <button type="button" onClick={() => router.back()} className="rounded bg-slate-500 px-4 py-2 text-white">
          タスク一覧に戻る
        </button>
  </div>
  </div>
);
}