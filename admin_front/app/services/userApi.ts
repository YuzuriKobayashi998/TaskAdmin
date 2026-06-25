import { UserCreateRequest } from "../types/user";
import { UserUpdateRequest } from "../types/user";

const API_URL = "http://localhost:8080/users";

export async function getMyPage(token: string) {
  const response = await fetch(`${API_URL}/mypage`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    throw new Error("ユーザー情報の取得に失敗しました")
  }

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
  if (!response.ok) {
    throw new Error("ユーザー登録に失敗しました");
  }
  return response.json();
}

export async function updateUser(
  user: UserUpdateRequest,
  token: string
) {
  const response = await fetch(`${API_URL}/mypage`, {
    method: "PUT",
    headers: {
        //json形式で送りますよの宣言
      "Content-Type": "application/json",
      //ユーザーの認証情報を送る
      Authorization: `Bearer ${token}`,
    },
    //UserUpdateRequestで書いたメソッドの中身をバックエンドに送る
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("ユーザー更新に失敗しました");
  }
  return response.json();
}

export async function deleteUser(token: string): Promise<void> {
const response = await fetch(`${API_URL}/mypage`, {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

  if (!response.ok) {
    throw new Error("ユーザー削除に失敗しました");
  }
}