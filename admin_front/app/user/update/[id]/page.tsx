"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyPage, updateUser } from "@/app/services/userApi";
import { UserUpdateRequest } from "@/app/types/user";

export default function UpdateUserPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserUpdateRequest>({
    name: "",
    password: "",
  });

  // 初期表示時にログインユーザーを取得
  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("ログインしてください");
        router.push("/user/login");
        return;
      }

      try {
        const data = await getMyPage(token);

        setUser({
          name: data.name,
          password: "",
        });
      } catch (error) {
        console.error(error);
        alert("ユーザー情報の取得に失敗しました");
      }
    }

    fetchUser();
  }, [router]);

  // 更新処理
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user.name) {
      alert("ユーザー名を入力してください");
      return;
    }

    if (!user.password) {
      alert("パスワードを入力してください");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("ログインしてください");
      router.push("/user/login");
      return;
    }

    try {
      await updateUser(user, token);

      alert("ユーザー情報を更新しました");

      router.push("/user/mypage");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>ユーザー編集</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>ユーザー名</label>
          <br />
          <input
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
          />
        </div>

        <br />

        <div>
          <label>パスワード</label>
          <br />
          <input
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </div>

        <br />

        <button type="submit">
          更新
        </button>
      </form>

      <p>
        <Link href="/user/mypage">
          マイページに戻る
        </Link>
      </p>
    </div>
  );
}