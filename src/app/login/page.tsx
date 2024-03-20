"use client";

import { signIn } from "@/hook/authService";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import loginImg from "@/assets/loginImg.jpg";
import { Button, Card, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import EyeFilledIcon from "./EyeFilledIcon";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authLogin } = useAuthStore();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
    <div className="relative">
      <div>
        <img src={loginImg.src} alt="LoginBackgroundImg" className="absolute" />
      </div>
      <div className="absolute">
        <Card className="py-20 w-[560px] h-[682px]">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
              <Input
                type="email"
                label="Email"
                variant="flat"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                variant="flat"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" color="primary">
              로그인
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
