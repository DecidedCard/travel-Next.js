"use client";

import { signIn } from "@/hook/authService";
import useAuthStore from "@/store/authStore";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signIn(email, password);
      console.log("User signIn:", userData);
      login(userData);
      alert("로그인 성공");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default Login;
