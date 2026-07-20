"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { TaskCreateRequest } from "@/app/types/task";
import { createTask } from "@/app/services/taskApi";
import { getTaskCategories } from "@/app/services/taskCategoryApi";
import { TaskCategoryResponse } from "@/app/types/taskCategory";

export default function CreateTaskPage(){
    const router = useRouter();
    const params = useParams();
    const categoryId = Number(params.id);

const [task, setTask] = useState<TaskCreateRequest>({
    title:"",
    startDate:"",
    endDate:"",
    isFinished:false,
    priority:0,
    taskCategoryId:categoryId,
});

const [categories, setCategories] = useState<TaskCategoryResponse[]>([]);

useEffect(() => {
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return;
    const data = await getTaskCategories(token);
    setCategories(data);
  };

  fetchCategories();
}, []);

const handleSubmit = async (
    e:React.SyntheticEvent<HTMLFormElement>
) => {
    e.preventDefault();
    //入力チェック
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
      console.log(task);
      const token = localStorage.getItem("token");
      console.log("token", token);
      if(!token) {
        alert("ログインしてください");
        router.push("user/login");
        return;
      }
        await createTask(token, task);
        alert("タスクの登録が完了しました");
        //ユーザー登録が完了したらログイン画面に行く
        router.push(`/task/readAll/${task.taskCategoryId}`);
    } catch(error:unknown) {
        console.error(error);
        alert((error as Error).message);
    }
};
return (
  <div className="min-h-screen bg-slate-100 py-10">
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
    <h1 className="mb-8 text-center text-4xl font-bold text-slate-700">タスク登録</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label className="mb-0 block text-lg font-semibold text-slate-700">タスク名</label>
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
        <label className="mb-0 block text-lg font-semibold text-slate-700">開始日</label>
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
        <label className="mb-0 block text-lg font-semibold text-slate-700">終了日</label>
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

       <div>
        <label className="mb-0 block text-lg font-semibold text-slate-700">優先度</label>
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

      <button 
       type="submit" className="mb-4 rounded bg-slate-500 px-4 py-2 text-white">
        登録
      </button>
    </form>
          <p>
        <button type="button" onClick={() => router.back()} className="mb-4 rounded bg-slate-500 px-4 py-2 text-white">
        タスク一覧に戻る  
        </button>
      </p>
  </div>
  </div>
);
}