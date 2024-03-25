"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import useAuthStore from "../store/authStore";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { logout } from "@/hook/authService";
import useUserInfo from "@/hook/detail-write-hook/useUserInfo";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isLoggedIn, user, authLogout, authLogin } = useAuthStore();
  const { userInfo, isLoading } = useUserInfo();
  const router = useRouter();
  useEffect(() => {
    authLogin(userInfo!);
  }, [authLogin, userInfo]);

  const handleLogout = async () => {
    const confirmed = window.confirm("로그아웃 하시겠습니까?");
    if (confirmed) {
      try {
        await logout();
        router.replace("/");
        authLogout();
        alert("로그아웃 되었습니다.");
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 bg-mainColor z-50">
        <Spinner
          size="lg"
          color="primary"
          className="flex justify-center items-center w-screen h-screen"
        />
      </div>
    );
  }

  return (
    <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <div className="bounce-on-hover">
            <Image src={logo} alt="Logo" width={40} height={40} />
          </div>
        </Link>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">여행한탕</h1>
          <span className="text-sm font-light">
            Good Travel & Good Experience
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4 mr-3">
        <Link href="/community" className="hover:text-blue-200 text-lg">
          커뮤니티
        </Link>
        {isLoggedIn && user && user.avatar ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform bounce-on-hover"
                color="secondary"
                size="md"
                src={user.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                className="h-14 gap-2 pointer-events-none"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem as={Link} href="/write">
                글쓰기
              </DropdownItem>
              <DropdownItem as={Link} href="/userProfile">
                마이페이지
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => handleLogout()}
              >
                로그아웃
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <ul className="flex space-x-4">
            <li className="mr-4">
              <Link href="/login" className="hover:text-blue-200">
                로그인
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
