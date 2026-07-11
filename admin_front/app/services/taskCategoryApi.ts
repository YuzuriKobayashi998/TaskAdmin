import { TaskCategoryCreateRequest } from "../types/taskCategory";
import { TaskCategoryUpdateRequest } from "../types/taskCategory";
import { TaskCategoryResponse } from "../types/taskCategory";

const API_URL = "http://localhost:8080/task-category";

export async function getTaskCategories(token: string): Promise<TaskCategoryResponse[]> {
  const response = await fetch(`${API_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("カテゴリ一覧の取得に失敗しました");
  }

  return response.json();
}

export async function createTaskCategory(
  token: string,
  category: TaskCategoryCreateRequest
): Promise<TaskCategoryResponse> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("カテゴリの作成に失敗しました");
  }

  return response.json();
}

export async function updateTaskCategory(
  token: string,
  id: number,
  category: TaskCategoryUpdateRequest
): Promise<TaskCategoryResponse> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("カテゴリの更新に失敗しました");
  }

  return response.json();
}

export async function deleteTaskCategory(
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
    throw new Error("カテゴリの削除に失敗しました");
  }
}

export async function getTaskCategoryById(
  token: string,
  id: number
): Promise<TaskCategoryResponse> {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("タスクの取得に失敗しました");
  }
  return response.json();
}