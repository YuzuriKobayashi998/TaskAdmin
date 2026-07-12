"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { TaskResponse } from "@/app/types/task"
import { getTasksByCategory } from "@/app/services/taskApi"

export default function ReadAllTaskPage() {
    const params = useParams();
    const categoryId = Number(params.id);

    const [tasks, setTasks] = useState<TaskResponse[]>([]);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    getTasksByCategory(token, categoryId)
      .then(setTasks)
      .catch(console.error);
  }, [categoryId]);
  return (

    <div>
      <h1>タスク一覧</h1>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded-lg p-4 mb-3"
        >
          <h2>{task.title}</h2>
          <p>開始日：{task.startDate}</p>
          <p>終了日：{task.endDate}</p>
          <p>優先度：{task.priority}</p>
        </div>
      ))}
    </div>
  );
}