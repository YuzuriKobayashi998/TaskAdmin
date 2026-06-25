export interface UserCreateRequest {
  name: string;
  password: string;
}

export interface UserUpdateRequest {
  name: string;
  password: string;
}

export interface UserResponse {
  id: number;
  name: string;
}