"use client";

import { signIn } from "@/hook/authService";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import loginImg from "@/assets/loginImg.jpg";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
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
    <div className="flex relative">
      <div>
        <img src={loginImg.src} alt="LoginBackgroundImg" className="absolute" />
      </div>
      <div className="flex absolute px-28 py-20">
        <Card className="flex w-[560px] h-[600px]">
          <CardBody className="flex flex-col items-center justify-between px-8 py-16">
            <h1 className="text-4xl font-bold mb-10">여행한탕</h1>
            <h1 className="text-2xl font-bold mb-4">로그인</h1>
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-5">
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
              <Button
                type="submit"
                color="primary"
                style={{ width: "100%" }}
                className="mt-5 h-[56px] text-lg"
              >
                로그인
              </Button>
            </form>
            <div className="flex flex-row items-center gap-4 mt-5">
              <p className="text-default-400 ">회원이 아니신가요?</p>
              <button
                onClick={() => {
                  router.push("/signup");
                }}
                style={{ textDecoration: "underline" }}
              >
                회원가입
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
