import { LoginRequest } from "../types/login";
import { UserResponse } from "../types/user";

const API_URL = "http://localhost:8080/auth/login";

export async function login(
  loginRequest: LoginRequest
): Promise<UserResponse> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}