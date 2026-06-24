import { UserCreateRequest } from "../types/user";
import { UserUpdateRequest } from "../types/user";
import { UserResponce } from "../types/user";

const API_URL = "http://localhost:8080/users";

export async function getMyPage(token: string) {
  const response = await fetch(`${API_URL}/mypage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}

export async function createUser(user: UserCreateRequest) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

export async function updateUser(
  user: UserUpdateRequest,
  token: string
) {
  const response = await fetch(`${API_URL}/mypage`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

export async function deleteUser(token: string) {
  await fetch(`${API_URL}/mypage`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}