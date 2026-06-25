import { UserResponse } from "./user";

export interface TaskCategoryCreateRequest {
  name: string;
}

export interface TaskCategoryUpdateRequest {
  name: string;
}

export interface TaskCategoryResponse {
  id: number;
  name: string;
  user: UserResponse;
}