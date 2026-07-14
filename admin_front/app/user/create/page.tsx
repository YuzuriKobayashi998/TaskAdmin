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
  <div>
    <h1>ユーザー登録</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>ユーザー名</label>
        <br />
        <input
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
      <br />
      <div>
        <label>パスワード</label>
        <br />
        <input
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

      <br />
      
      <button type="submit">登録</button>
    </form>
          <p>
        <Link href="/user/login">
          ログイン画面に戻る
        </Link>
      </p>
  </div>

);
}