"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskCreateRequest } from "@/app/types/task";
import { createTask } from "@/app/services/taskApi";
import { getTaskCategories } from "@/app/services/taskCategoryApi";
import { TaskCategoryResponse } from "@/app/types/taskCategory";

export default function CreateTaskPage(){
    const router = useRouter();

const [task, setTask] = useState<TaskCreateRequest>({
    title:"",
    startDate:"",
    endDate:"",
    isFinished:false,
    priority:0,
    taskCategoryId:0,
});

const [categories, setCategories] = useState<TaskCategoryResponse[]>([]);

useEffect(() => {
  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = await getTaskCategories(token);
    setCategories(data);
  };

  fetchCategories();
}, []);

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
return (
  <div>
    <h1>タスク登録</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>タスク名</label>
        <br />
        <input
          type="text"
          value={task.title}
          required
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value,
            })
          }
        />
      </div>
      <br />
      <div>
        <label>開始日</label>
        <br />
        <input
          type="date"
          value={task.startDate}
          required
          onChange={(e) =>
            setTask({
              ...task,
              startDate: e.target.value,
            })
          }
        />
      </div>

      <br />

      <div>
        <label>終了日</label>
        <br />
        <input
          type="date"
          value={task.endDate}
          required
          onChange={(e) =>
            setTask({
              ...task,
              endDate: e.target.value,
            })
          }
        />
      </div>

       <div>
        <label>優先度</label>
        <br />
        <select
        value={task.priority}
        onChange={(e) => 
          setTask({
            ...task,
            priority: Number(e.target.value)
          })
        }
        >
          <option value={0}>選択してください</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>

      <div>
        <select
        value={task.taskCategoryId}
          onChange={(e) =>
          setTask({
             ...task,
            taskCategoryId: Number(e.target.value),
            })
          }
          >
          <option value="">カテゴリを選択</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
            {category.title}
          </option>
            ))}
          </select>
        </div>
      
      <button type="submit">登録</button>
    </form>
          <p>
        <Link href="/task/readAll">
          ログイン画面に戻る
        </Link>
      </p>
  </div>

);
}