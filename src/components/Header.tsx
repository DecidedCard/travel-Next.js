"use client";

import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import { logout } from "@/hook/authService";

const Header = () => {
  const { isLoggedIn, authLogout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      authLogout();
      alert("로그아웃");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Image src={logo} alt="Logo" width={40} height={40} />
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">여행한탕</h1>
          <span className="text-sm font-light">
            good travel && good experience
          </span>
        </div>
        <a href="/community" className="hover:text-blue-200 text-lg">
          커뮤니티
        </a>
      </div>
      <ul className="flex space-x-4">
        <li>
          {isLoggedIn ? (
            <a
              onClick={handleLogout}
              className="hover:text-blue-200 cursor-pointer"
            >
              로그아웃
            </a>
          ) : (
            <a href="/login" className="hover:text-blue-200">
              로그인
            </a>
          )}
        </li>
        <li>
          <a href="/write" className="hover:text-blue-200">
            글쓰기
          </a>
        </li>
        <li>
          <a href="/userProfile" className="hover:text-blue-200">
            마이페이지
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
