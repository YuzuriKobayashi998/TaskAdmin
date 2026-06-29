"use client";

import { ChangeEvent, useState, } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/app/types/login";
import { login } from "@/app/services/loginApi";


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
    return;
  }
    try {
        await login(loginUser);
        //ユーザー登録が完了したらログイン画面に行く
        router.push("/mypage")
    } catch(error) {
        console.error(error);
        alert("ログインに失敗しました");
    }
};


return (
  <div>
    <h1>ログイン</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>ユーザー名</label>
        <br />
        <input
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
      <br />
      <div>
        <label>パスワード</label>
        <br />
        <input
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

      <br />
      
      <button type="submit">ログイン</button>
    </form>
  </div>

);
}