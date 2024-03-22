"use client";

import { signUp } from "@/hook/authService";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";
import loginImg from "@/assets/loginImg.jpg";
import { EyeSlashFilledIcon } from "../login/EyeSlashFilledIcon";
import EyeFilledIcon from "../login/EyeFilledIcon";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [nickname, SetNickname] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // 유효성 검사 상태 저장
  const [value, setValue] = React.useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [nicknameError, setNicknameError] = useState<string>("");

  // 이메일 비밀번호 형식
  const validatePassword = (value: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  // 유효성 검사 함수
  const emailIsInvalid = React.useMemo(() => {
    if (value === "") return false;
    return validateEmail(value) ? false : true;
  }, [value]);

  const passwordIsInvalid = React.useMemo(() => {
    if (passwordError === "") return false;
    return validatePassword(password) ? false : true;
  }, [password, passwordError]);

  const confirmPasswordIsInvalid = React.useMemo(() => {
    if (password !== confirmPassword) return true;
    return false;
  }, [password, confirmPassword]);

  const nicknameIsInvalid = React.useMemo(() => {
    if (nicknameError === "") return false;
    if (nickname.length < 2) return true;
    return false;
  }, [nickname, nicknameError]);

  // 회원가입
  const handleSingUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !nickname) {
      alert("입력란을 입력해주세요.");
    }

    if (
      emailIsInvalid ||
      passwordIsInvalid ||
      confirmPasswordIsInvalid ||
      nicknameIsInvalid
    ) {
      alert("회원가입 양식을 확인해주세요.");
      return;
    }

    try {
      const data = await signUp(email, password, nickname);
      console.log("User signed up:", data.user?.id);
      alert("회원가입을 축하합니다!");
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen relative ">
      <div className="flex absolute inset-0 w-full h-full">
        <Image
          src={loginImg}
          alt="LoginBackgroundImg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex items-center justify-center absolute top-[50px] md:top-[150px] left-20 px-4 lg:px-0 max-w-lg">
        <Card className=" relative flex flex-col items-center justify-center w-[560px] h-[650px]">
          <CardBody className="flex flex-col items-center justify-between px-8 py-8 h-full">
            <h1 className="text-4xl font-bold mb-2">여행한탕</h1>
            <h1 className="text-2xl font-bold mb-2">회원가입</h1>
            <form onSubmit={handleSingUp} className="w-full">
              <div className="flex flex-col gap-5">
                <Input
                  type="email"
                  label="이메일"
                  variant="flat"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={emailIsInvalid}
                  color={emailIsInvalid ? "danger" : "default"}
                  errorMessage={
                    emailIsInvalid && "유효한 이메일을 입력해주세요."
                  }
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
                  isInvalid={passwordIsInvalid}
                  color={passwordIsInvalid ? "danger" : "default"}
                  errorMessage={
                    passwordIsInvalid &&
                    "비밀번호는 최소 6자 이상이어야 하며 영문과 숫자를 포함해야 합니다."
                  }
                  onValueChange={setPasswordError}
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
                  onChange={(e) => {
                    SetConfirmPassword(e.target.value);
                  }}
                  isInvalid={confirmPasswordIsInvalid}
                  color={confirmPasswordIsInvalid ? "danger" : "default"}
                  errorMessage={
                    confirmPasswordIsInvalid &&
                    "비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요."
                  }
                  onValueChange={setConfirmPasswordError}
                />
                <Input
                  type="text"
                  label="닉네임"
                  variant="flat"
                  value={nickname}
                  onChange={(e) => {
                    SetNickname(e.target.value);
                  }}
                  isInvalid={nicknameIsInvalid}
                  color={nicknameIsInvalid ? "danger" : "default"}
                  errorMessage={
                    nicknameIsInvalid && "닉네임은 2자 이상이어야 합니다."
                  }
                  onValueChange={setNicknameError}
                />
              </div>
              <Button
                type="submit"
                style={{ width: "100%" }}
                className="mt-5 h-[56px] text-lg  bg-mainColor text-white"
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
