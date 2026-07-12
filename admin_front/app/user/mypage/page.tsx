"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getTaskCategories } from "@/app/services/taskCategoryApi"
import { TaskCategoryResponse } from "@/app/types/taskCategory"

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
    {categories.map((category) => (
      <div
        key={category.id}
        onClick={() => router.push(`/task/readAll/${category.id}`)}
        className="border rounded-lg p-4 mb-3 cursor-pointer"
      >
        <h2>{category.title}</h2>
        <p>{category.description}</p>
      </div>
    ))}
  </div>
);
}