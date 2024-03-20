"use client";

import { signUp } from "@/hook/authService";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";
import loginImg from "@/assets/loginImg.jpg";
import { EyeSlashFilledIcon } from "../login/EyeSlashFilledIcon";
import EyeFilledIcon from "../login/EyeFilledIcon";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [nickname, SetNickname] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // 이메일 유효성 검사
  const [value, setValue] = useState<string>("junior2nextui.org");

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") return false;

    return validateEmail(value) ? false : true;
  }, [value]);

  // 회원가입
  const handleSingUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signUp(email, password, nickname);
      console.log("User signed up:", data.user?.id);
      alert("회원가입을 축하합니다!");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="flex relative">
      <div>
        <img src={loginImg.src} alt="LoginBackgroundImg" className="absolute" />
      </div>
      <div className="flex absolute px-28 py-20">
        <Card className="flex w-[560px] h-[620px]">
          <CardBody className="flex flex-col items-center justify-between px-8 py-12">
            <h1 className="text-4xl font-bold mb-4">여행한탕</h1>
            <h1 className="text-2xl font-bold mb-4">회원가입</h1>
            <form onSubmit={handleSingUp} className="w-full">
              <div className="flex flex-col gap-5">
                <Input
                  type="email"
                  label="이메일"
                  variant="flat"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={isInvalid}
                  color={isInvalid ? "danger" : "default"}
                  errorMessage={isInvalid && "이메일 형식으로 입력해주세요"}
                  onValueChange={setValue}
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
                <Input
                  label="비밀번호 확인"
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
                  value={confirmPassword}
                  onChange={(e) => SetConfirmPassword(e.target.value)}
                />
                <Input
                  type="text"
                  label="닉네임"
                  variant="flat"
                  value={nickname}
                  onChange={(e) => SetNickname(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                color="primary"
                style={{ width: "100%" }}
                className="mt-5 h-[56px] text-lg"
              >
                회원가입
              </Button>
            </form>
            <div className="flex flex-row items-center gap-4 mt-5">
              <p className="text-default-400 ">이미 가입하셨나요?</p>
              <button
                onClick={() => {
                  router.push("/login");
                }}
                style={{ textDecoration: "underline" }}
              >
                로그인
              </button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
