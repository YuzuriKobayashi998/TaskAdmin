"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskCategoryCreateRequest } from "@/app/types/taskCategory";
import { createTaskCategory } from "@/app/services/taskCategoryApi";
import Link from "next/link";

export default function CreateUserPage(){
    const router = useRouter();

const [category, setCategory] = useState<TaskCategoryCreateRequest>({
    title:"",
    description:"",
    isFinished:false,
    dueDate:"",
});
const handleSubmit = async (
    e:React.SyntheticEvent<HTMLFormElement>
) => {
    e.preventDefault();
    //入力チェック
      if (!category.title) {
    alert("タイトルを入力してください");
    return;
  }
        if (!category.dueDate) {
    alert("期限日を入力してください");
    return;
  }

    try {
      console.log(category);
      const token = localStorage.getItem("token");

      if(!token) {
        alert("ログインしてください");
        router.push("user/login");
        return;
      }
        await createTaskCategory(token, category);
        alert("カテゴリの登録が完了しました");
        //ユーザー登録が完了したらログイン画面に行く
        router.push("/user/mypage")
    } catch(error:unknown) {
        console.error(error);
        if(error instanceof Error) {
            alert(error.message);
        } else {
            alert("カテゴリ登録に失敗しました");
        }
    }
};

return (
  <div className="min-h-screen bg-slate-100 py-10">
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
      <h1 className="text-2xl font-bold mb-4">カテゴリ登録</h1>
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
      <button  type="submit" className="rounded bg-slate-500 px-4 py-2 text-white">
        作成
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