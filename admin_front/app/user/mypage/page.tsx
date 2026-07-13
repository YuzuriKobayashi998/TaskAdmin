"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getTaskCategories } from "@/app/services/taskCategoryApi"
import { TaskCategoryResponse } from "@/app/types/taskCategory"
import Link from "next/link";

export default function Mypage() {
    const [categories, setCategories] = useState<TaskCategoryResponse[]>([]);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
         if(!token) return;
         //tokenを渡してAPIからカテゴリ一覧を取得
         getTaskCategories(token)
         //取得したデータをcategoriesに保存
            .then(setCategories)
            .catch(console.error);
    }, []);

    return (
  <div>
    <h1>マイページ</h1>
    <button
      onClick={() => router.push("/taskCategory/create")}
      className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
    >カテゴリ作成</button>
    {categories.map((category) => (
      <div
        key={category.id}
        onClick={() => router.push(`/task/readAll/${category.id}`)}
        className="border rounded-lg p-4 mb-3 cursor-pointer"
      >
        <h2>{category.title}</h2>
        <p>{category.description}</p>
          <Link href={`/taskCategory/update/${category.id}`}
          onClick={(e) => e.stopPropagation()}>
          編集
        </Link>
      </div>
    ))}
  </div>
);
}