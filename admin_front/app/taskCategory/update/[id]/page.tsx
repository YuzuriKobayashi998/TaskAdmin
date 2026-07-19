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
  <div>
    <h1>カテゴリ編集</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>カテゴリ名</label>
        <br />
        <input
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
      <br />
      <div>
        <label>期限日</label>
        <br />
        <input
          type="date"
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

      <br />
      <div>
        <label>コメント</label>
        <br />
        <textarea
          value={category.description}
          onChange={(e) =>
            setCategory({
              ...category,
              description: e.target.value,
            })
          }
        />
      </div>
      <br />
      
      <button type="submit">更新</button>
    </form>
      <p>
        <Link href="/user/mypage">
          戻る
        </Link>
      </p>
  </div>

);
}