"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getTaskById, updateTask } from "@/app/services/taskApi";
import { TaskUpdateRequest } from "@/app/types/task";

export default function UpdateTaskPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [task, setTask] = useState<TaskUpdateRequest>({
    title: "",
    startDate: "",
    endDate: "",
    isFinished: false,
    priority: 0,
    taskCategoryId: 0,
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
        const data = await getTaskById(token, id);
        setTask({
          title: data.title,
          startDate: data.startDate,
          endDate: data.endDate,
          isFinished: data.isFinished,
          priority: data.priority,
          taskCategoryId: data.taskCategory.id,
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
      const token = localStorage.getItem("token");

      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }

      await updateTask(token, id, task);

      alert("タスクの更新が完了しました");
      router.push("/task");
    } catch (error: unknown) {
      console.error(error);
      if(error instanceof Error) {
        alert(error.message);
      } else {
        alert("タスク更新に失敗しました");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>タイトル</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) =>
            setTask({
              ...task,
              title: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>開始日</label>
        <input
          type="date"
          value={task.startDate}
          onChange={(e) =>
            setTask({
              ...task,
              startDate: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>終了日</label>
        <input
          type="date"
          value={task.endDate}
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
        <input
          type="number"
          value={task.priority}
          onChange={(e) =>
            setTask({
              ...task,
              priority: Number(e.target.value),
            })
          }
        />
      </div>

      <button type="submit">
        更新
      </button>
    </form>
  );
}