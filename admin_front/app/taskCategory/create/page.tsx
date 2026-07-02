"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskCategoryCreateRequest } from "@/app/types/taskCategory";
import { createTaskCategory } from "@/app/services/taskCategoryApi";

export default function CreateUserPage(){
    const router = useRouter();

const [category, setCategory] = useState<TaskCategoryCreateRequest>({
    title:"",
    description:"",
    isFinished:false,
    dueDate:new Date(),
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
}