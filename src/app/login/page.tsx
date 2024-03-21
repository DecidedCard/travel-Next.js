"use client";

import { signIn } from "@/hook/authService";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import loginImg from "@/assets/loginImg.jpg";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import EyeFilledIcon from "./EyeFilledIcon";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authLogin } = useAuthStore();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("이메일 또는 비밀번호를 입력하세요.");
      return;
    }

    try {
      const userData = await signIn(email, password);
      authLogin(userData);
      alert("로그인 성공했습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("이메일 또는 비밀번호를 다시 확인해주세요.");
    }
  };

  return (
    <div className="flex w-screen h-screen relative">
      <div className="flex absolute inset-0 w-full h-full">
        <Image
          src={loginImg}
          alt="LoginBackgroundImg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex items-center justify-center absolute top-[50px] md:top-[150px] left-20 px-4 lg:px-0 max-w-lg">
        <Card className="relative flex flex-col items-center justify-center w-[560px] h-[650px]">
          <CardBody className="flex flex-col items-center justify-between px-8 py-8 h-full">
            <h1 className="text-4xl font-bold mb-6">여행한탕</h1>
            <h1 className="text-2xl font-bold mb-2">로그인</h1>
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col gap-5">
                <Input
                  type="email"
                  label="이메일"
                  variant="flat"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="비밀번호"
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
                className="w-full mt-5 h-[56px] text-lg"
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
