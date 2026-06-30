import { UserResponse } from "./user";

export interface TaskCategoryCreateRequest {
  title: string;
  description: String;
  isFinished: Boolean;
  dueDate: Date;
}

export interface TaskCategoryUpdateRequest {
  title: string;
  description: String;
  isFinished: Boolean;
  dueDate: Date;
}

export interface TaskCategoryResponse {
  id: number;
  title: string;
  description: String;
  isFinished: Boolean;
  dueDate: Date;
  user: UserResponse;
}
