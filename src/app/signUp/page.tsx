"use client";

import { signUp } from "@/hook/authService";
import React, { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, SetNickname] = useState("");

  const handleSingUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signUp(email, password, nickname);
      console.log("User signed up:", data.user?.id);
      alert("회원가입 성공");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <form onSubmit={handleSingUp}>
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
      <input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => SetNickname(e.target.value)}
        required
      />
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUp;
