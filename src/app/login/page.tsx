"use client";

import { signIn } from "@/hook/authService";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import loginImg from "@/assets/loginImg.jpg";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authLogin } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signIn(email, password);
      console.log("User signIn:", userData);
      authLogin(userData);
      alert("로그인 성공");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <img
        src={loginImg.src}
        alt="LoginBackgroundImg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="bg-cover bg-center w-full h-full">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
