"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserCreateRequest } from "@/app/types/user";
import { createUser } from "@/app/services/userApi";


export default function CreateUserPage(){
    const router = useRouter();

const [user, setUser] = useState<UserCreateRequest>({
    name:"",
    password:"",
});

const handleSubmit = async (
    e:React.SyntheticEvent<HTMLFormElement>
) => {
    e.preventDefault();
    //入力チェック
      if (!user.name || !user.password) {
    alert("ユーザー名とパスワードを入力してください。");
    return;
  }
    try {
      console.log(user);
        await createUser(user);
        alert("ユーザーを登録しました");
        //ユーザー登録が完了したらログイン画面に行く
        router.push("/user/login")
    } catch(error:unknown) {
        console.error(error);
        if(error instanceof Error) {
            alert(error.message);
        } else {
           alert("ユーザー登録に失敗しました");
        }
    }
};


return (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-md">
    <h1 className="text-2xl font-bold mb-4">ユーザー登録</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-lg font-semibold text-slate-700">ユーザー名</label>
        <input
          className="mb-2 w-full rounded-lg border border-slate-300 p-3 focus:border-sky-500 focus:outline-none"
          type="text"
          value={user.name}
          required
          onChange={(e) =>
            setUser({
              ...user,
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
          value={user.password}
          required
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />
      </div>
      <button type="submit" className="rounded bg-slate-500 px-4 py-2 text-white">
        登録
      </button>
    </form>
    <br />
          <p>
        <Link href="/user/login">
          ログイン画面に戻る
        </Link>
      </p>
  </div>
  </div>

);
}