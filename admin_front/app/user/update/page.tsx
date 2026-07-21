"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyUser, updateUser, deleteUser } from "@/app/services/userApi";
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
        const data = await getMyUser(token);

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

  const handleDelete = async () => {
        if (!confirm("このユーザーを削除しますか？")) {
          return;
        }
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("ログインしてください");
            return;
          }
          await deleteUser(token);
          alert("削除しました");
          router.push("/user/login");
        } catch (error) {
          console.error(error);
          alert("削除に失敗しました");
        };
      };

  // 更新処理
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!user.name) {
      alert("ユーザー名を入力してください");
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
      localStorage.removeItem("token");
      router.push("/user/login");
    } catch (error: unknown) {
      console.error(error);
      if(error instanceof Error) {
        alert(error.message);
      } else {
        alert("ユーザー情報更新に失敗しました");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
      <h1 className="mb-8 text-center text-4xl font-bold text-slate-700">ユーザー編集</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="font-medium text-slate-700">ユーザー名</label>
          <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
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

        <div>
          <label className="font-medium text-slate-700">パスワード</label>
          <br />
          <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
            type="password"
            placeholder="変更する場合のみ入力"
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

        <button className="rounded bg-slate-500 px-4 py-2 text-white" type="submit">
          更新
        </button>
      </form>
      <br />
      <p>
      <button
        onClick={() => router.push("/user/mypage")}
        className="rounded bg-slate-500 px-4 py-2 text-white"
      >
        戻る
      </button>
      <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="ml-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          ユーザー削除
        </button>
      </p>
    </div>
    </div>
  );
}