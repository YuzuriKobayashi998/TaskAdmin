export interface UserCreateRequest {
  name: string;
  password: string;
}

export interface UserUpdateRequest {
  name: string;
  password: string;
}

export interface UserResponce {
  name: string;
  password: string;
}