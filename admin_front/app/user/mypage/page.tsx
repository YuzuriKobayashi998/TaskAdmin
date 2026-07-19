"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { deleteTaskCategory } from "@/app/services/taskCategoryApi"
import { getTaskCategories } from "@/app/services/taskCategoryApi"
import { TaskCategoryResponse } from "@/app/types/taskCategory"
import Link from "next/link";

export default function Mypage() {
    const [categories, setCategories] = useState<TaskCategoryResponse[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const sortedCategories = [...categories].sort((a, b) => {
  if (sortOrder === "asc") {
    return (
      new Date(a.dueDate).getTime() -
      new Date(b.dueDate).getTime()
    );
  }
  return (
    new Date(b.dueDate).getTime() -
    new Date(a.dueDate).getTime()
  );
});
    const router = useRouter();
    //ログアウト処理のメソッド
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/user/login");
    }

    const fetchCategories = useCallback(async () => {
      const token =localStorage.getItem("token");
      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }
      try {
        const data = await getTaskCategories(token);
        setCategories(data);
      } catch (error) {
        console.error(error);
        alert("カテゴリの取得に失敗しました");
      }
    }, [router]);

    useEffect(() => {
      fetchCategories();
    }, [fetchCategories]);

    //タスク削除処理のメソッド
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
    await deleteTaskCategory(token, id);
    alert("削除しました");
    // 一覧を再取得
        await fetchCategories();
  } catch (error) {
    console.error(error);
    alert("削除に失敗しました");
  }
};

    return (
  <div>
    <h1>マイページ</h1>
    <button
      onClick={() => router.push("/taskCategory/create")}
      className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
    >カテゴリ作成</button>
    <button
      onClick={handleLogout}
      className="mb-4 ml-4 rounded bg-red-500 px-4 py-2 text-white"
    >ログアウト</button>
    <br />
    <div>
      <label>期限日順</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">昇順</option>
        <option value="desc">降順</option>
      </select>
    </div>
    <br />
    <h2>カテゴリ一覧</h2>
    {sortedCategories.map((category) => (
      <div
        key={category.id}
        onClick={() => router.push(`/task/readAll/${category.id}`)}
        className="border rounded-lg p-4 mb-3 cursor-pointer"
      >
        <h2>{category.title}</h2>
        <p>{category.dueDate}</p>
        <p>{category.description}</p>
          <Link href={`/taskCategory/update/${category.id}`}
          onClick={(e) => e.stopPropagation()}>
          編集
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(category.id);
          }}
        >
          🗑️
        </button>
      </div>
    ))}
  </div>
);
}