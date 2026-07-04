"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskUpdateRequest } from "@/app/types/task";
import { updateTask } from "@/app/services/taskApi";

export default function CreateUserPage(){
    const router = useRouter();

const [task, setTask] = useState<TaskUpdateRequest>({
    title:"",
    startDate:"",
    endDate:"",
    isFinished:false,
    priority:0,
    taskCategoryId:0,
});
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

      if(!token) {
        alert("ログインしてください");
        router.push("user/login");
        return;
      }
        await createTask(token, task);
        alert("タスクの登録が完了しました");
        //ユーザー登録が完了したらログイン画面に行く
        router.push("/user/login")
    } catch(error:any) {
        console.error(error);
        alert(error.message);
    }
};
}