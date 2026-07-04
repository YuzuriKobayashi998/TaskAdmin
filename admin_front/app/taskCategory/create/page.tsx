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
        router.push("/user/login")
    } catch(error:any) {
        console.error(error);
        alert(error.message);
    }
};

return (
  <div>
    <h1>カテゴリ登録</h1>
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
          required
          onChange={(e) =>
            setCategory({
              ...category,
              description: e.target.value,
            })
          }
        />
      </div>
      <br />
      
      <button type="submit">作成</button>
    </form>
      <p>
        <Link href="/user/mypage">
          戻る
        </Link>
      </p>
  </div>

);
}