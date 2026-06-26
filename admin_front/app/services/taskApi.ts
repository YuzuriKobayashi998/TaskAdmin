import { TaskCreateRequest } from "../types/task";
import { TaskUpdateRequest } from "../types/task";
import { TaskResponse } from "../types/task";

const API_URL = "http://localhost:8080/tasks";

export async function getTasks(token: string): Promise<TaskResponse[]> {
  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("タスク一覧の取得に失敗しました");
  }

  return response.json();
}

export async function createTask(
  token: string,
  task: TaskCreateRequest
): Promise<TaskResponse> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("タスクの作成に失敗しました");
  }

  return response.json();
}

export async function updateTask(
  token: string,
  id: number,
  task: TaskUpdateRequest
): Promise<TaskResponse> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("タスクの更新に失敗しました");
  }

  return response.json();
}

export async function deleteTask(
  token: string,
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("タスクの削除に失敗しました");
  }
}