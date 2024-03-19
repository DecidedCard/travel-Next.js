'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import useAuthStore from '../store/authStore'; 
import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";

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
      {isLoggedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2 pointer-events-none">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem>
              <Link href="/write">글쓰기</Link>
            </DropdownItem>
            <DropdownItem>
              <Link href="/userProfile">마이페이지</Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => logout()}>
              로그아웃
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <ul className="flex space-x-4">
        <li className='mr-4'><Link href="/login" className="hover:text-blue-200">로그인</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
