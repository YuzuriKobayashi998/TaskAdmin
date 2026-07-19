

export interface TaskCategoryCreateRequest {
  title: string;
  description: string;
  isFinished: boolean;
  dueDate: string;
}

export interface TaskCategoryUpdateRequest {
  title: string;
  description: string;
  isFinished: boolean;
  dueDate: string;
}

export interface TaskCategoryResponse {
  id: number;
  title: string;
  description: string;
  isFinished: boolean;
  dueDate: string;
}
