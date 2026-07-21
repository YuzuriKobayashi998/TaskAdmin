"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { deleteTaskCategory, finishTaskCategory } from "@/app/services/taskCategoryApi"
import { getTaskCategories } from "@/app/services/taskCategoryApi"
import { TaskCategoryResponse } from "@/app/types/taskCategory"


export default function Mypage() {
    const [categories, setCategories] = useState<TaskCategoryResponse[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const sortedCategories = [...categories].sort((a, b) => {
          // 完了済みを最後にする
          if (a.isFinished !== b.isFinished) {
            return a.isFinished ? 1 : -1;
          }
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

    //ステータス変更処理のメソッド
        const handleFinish = async (id: number) => {
      if (!confirm("ステータスを変更しますか？")) {
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("ログインしてください");
          router.push("/user/login");
          return;
        }
        await finishTaskCategory(token, id);
        alert("ステータスを変更しました");
        // 一覧を再取得
        await fetchCategories();
      } catch (error) {
        console.error(error);
        alert("ステータスの変更に失敗しました");
      }
    };

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
  <div className="min-h-screen bg-slate-100 py-10">
    <div className="mx-auto max-w-4xl px-6">
    <h1 className="mb-8 text-center text-4xl font-bold text-slate-500">マイページ</h1>
    <div className="mb-6 flex gap-3">
    <button
      onClick={() => router.push("/taskCategory/create")}
      className="mb-4 rounded bg-slate-500 px-4 py-2 text-white"
    >カテゴリ作成</button>
    <button
      onClick={handleLogout}
      className="mb-4 rounded bg-slate-500 px-4 py-2 text-white"
    >ログアウト</button>
    <button
      onClick={() => router.push("/user/update")}
      className="mb-4 rounded bg-slate-500 px-4 py-2 text-white"
    >ユーザー情報変更</button>
    </div>
    <br />
    <div className="mb-8 flex items-center gap-3">
      <label className="font-medium text-slate-700">期限日順</label>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">昇順</option>
        <option value="desc">降順</option>
      </select>
    </div>
    <br />
    <h2 className="text-2xl font-semibold text-slate-600">カテゴリ一覧</h2>
    {sortedCategories.map((category) => {
      const isExpired = !category.isFinished && new Date(category.dueDate) < new Date(new Date().setHours(0, 0, 0, 0));
      return(
      <div
        key={category.id}
        onClick={() => router.push(`/task/readAll/${category.id}`)}
        className={`mb-5 cursor-pointer rounded-xl border p-6 shadow-md transition hover:shadow-xl ${isExpired ? "border-red-400 bg-red-100" : "border-slate-200 bg-white"}`}
      >
        <h2 className="text-2xl font-semibold text-slate-500">{category.title}</h2>
        <p>期限日：{category.dueDate}</p>
        <p>コメント：{category.description}</p>
        <p>ステータス：{category.isFinished ? "完了" : "着手中"}</p>
        <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/taskCategory/update/${category.id}`);
          }}
          className="mb-4 cursor-pointer rounded bg-slate-500 px-4 py-2 text-white"
        >編集
        </button>
        <button
        className="mb-4 cursor-pointer rounded bg-slate-500 px-4 py-2 text-white"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(category.id);
          }}
        >
          削除
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleFinish(category.id);
          }}
          className={`mb-4 cursor-pointer  rounded bg-blue-500 px-4 py-2 text-white ${
            category.isFinished ? "bg-red-500" : "bg-slate-500"
          }`}
        >
          {category.isFinished ? "未着手に戻す" : "完了"}
        </button>
        </div>
      </div>
    );
    })}
    </div>
  </div>
);
}