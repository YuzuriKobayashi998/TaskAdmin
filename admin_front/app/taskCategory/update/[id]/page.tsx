"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getTaskCategoryById, updateTaskCategory } from "@/app/services/taskCategoryApi";
import { TaskCategoryUpdateRequest } from "@/app/types/taskCategory";

export default function UpdateTaskPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [category, setCategory] = useState<TaskCategoryUpdateRequest>({
    title:"",
    description:"",
    isFinished:false,
    dueDate: "",
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
        const data = await getTaskCategoryById(token, id);
        console.log(data);
        setCategory({
          title: data.title,
          description: data.description ?? "",
          isFinished: data.isFinished,
          dueDate: data.dueDate,
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

    if (!category.title) {
      alert("タイトルを入力してください");
      return;
    }
    if (!category.dueDate) {
      alert("期限日を入力してください");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }

      await updateTaskCategory(token, id, category);

      alert("タスクの更新が完了しました");
      router.push("/user/mypage");
    } catch (error: unknown) {
      console.error(error);
          if(error instanceof Error) {
            alert(error.message);
        } else {
           alert("カテゴリ更新に失敗しました");
        }
    }
  };

  return (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100"> 
  <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
    <h1 className="text-2xl font-bold mb-4">カテゴリ編集</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-semibold text-slate-700">カテゴリ名</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="text"
          value={category.title}
          required
          onChange={(e) =>
            setCategory({
              ...category,
              title: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-slate-700">期限日</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={category.dueDate}
          required
          onChange={(e) =>
            setCategory({
              ...category,
              dueDate: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-slate-700">コメント</label>
        <br />
        <textarea
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          value={category.description}
          onChange={(e) =>
            setCategory({
              ...category,
              description: e.target.value,
            })
          }
        />
      </div>
      <button type="submit" className="rounded bg-slate-500 px-4 py-2 text-white">
        更新
      </button>
    </form>
      <p>
        <Link href="/user/mypage">
          戻る
        </Link>
      </p>
  </div>
</div>
);
}