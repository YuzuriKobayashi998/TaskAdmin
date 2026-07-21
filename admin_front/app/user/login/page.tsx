"use client";

import { useState, } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/app/types/login";
import { login } from "@/app/services/loginApi";
import Link from "next/link";



export default function LoginPage(){
    const router = useRouter();

const [loginUser, setUser] = useState<LoginRequest>({
    name:"",
    password:"",
});

const handleSubmit = async (
    e:React.SyntheticEvent<HTMLFormElement>
) => {
    e.preventDefault();
    //入力チェック
      if (!loginUser.name || !loginUser.password) {
    alert("ユーザー名とパスワードを入力してください。");
    return null;
  }
    try {
        const user = await login(loginUser);
        //トークンを保存。各所で使えるようにする
        localStorage.setItem("token", user.token);
        
        //ユーザー登録が完了したらログイン画面に行く
        router.push("/user/mypage")
    } catch(error:unknown) {
        if (error instanceof Error) {
            alert(error.message);
        } else {
            alert("ログインに失敗しました");
        }
    }
};


return (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
    <h1 className="text-2xl font-bold mb-4">ログイン</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-semibold text-slate-700">ユーザー名</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="text"
          value={loginUser.name}
          required
          onChange={(e) =>
            setUser({
              ...loginUser,
              name: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-slate-700">パスワード</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="password"
          value={loginUser.password}
          required
          onChange={(e) =>
            setUser({
              ...loginUser,
              password: e.target.value,
            })
          }
        />
      </div>
      <button type="submit" className="rounded bg-slate-500 px-4 py-2 text-white">
        ログイン
      </button>
    </form>
    <br />
      <p>
        <Link href="/user/create">
          ユーザー登録はこちら
        </Link>
      </p>
  </div>
</div>
);
}