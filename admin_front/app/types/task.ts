import { UserResponse } from "./user";
import { TaskCategoryResponse } from "./taskCategory";

export interface TaskCreateRequest {
  title: string;
  startDate: string;
  endDate: string;
  priority: number;
  isFinished: boolean;
  taskCategoryId: number;
}

export interface TaskUpdateRequest {
  title: string;
  startDate: string;
  endDate: string;
  priority: number;
  finished: boolean;
  taskCategoryId: number;
}

export interface TaskResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  priority: number;
  finished: boolean;
  user: UserResponse;
  taskCategory: TaskCategoryResponse;
  createdDate: string;
}