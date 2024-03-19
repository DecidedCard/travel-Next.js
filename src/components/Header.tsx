'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import useAuthStore from '../store/authStore'; 

const Header = () => {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <Image src={logo} alt="Logo" width={40} height={40} />
        </Link>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">여행한탕</h1>
          <span className="text-sm font-light">good travel & good experience</span>
        </div>
        <Link href="/community" className="hover:text-blue-200 text-lg">커뮤니티</Link>
      </div>
      <ul className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <li><a onClick={logout} className="cursor-pointer hover:text-blue-200">로그아웃</a></li>
            <li><Link href="/write" className="hover:text-blue-200">글쓰기</Link></li>
            <li><Link href="/userProfile" className="hover:text-blue-200">마이페이지</Link></li>
          </>
        ) : (
          <li className='mr-4'><Link href="/login" className="hover:text-blue-200">로그인</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
