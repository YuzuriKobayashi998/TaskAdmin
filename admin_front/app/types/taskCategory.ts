import { UserResponse } from "./user";

export interface TaskCategoryCreateRequest {
  title: string;
  description: string;
  isFinished: Boolean;
  dueDate: string;
}

export interface TaskCategoryUpdateRequest {
  title: string;
  description: string;
  isFinished: Boolean;
  dueDate: string;
}

export interface TaskCategoryResponse {
  id: number;
  title: string;
  description: string;
  isFinished: Boolean;
  dueDate: string;
  user: UserResponse;
}
