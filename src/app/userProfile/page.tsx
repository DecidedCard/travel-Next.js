"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import Image from "next/image";
import Profile from "@/components/profile/Profile";
const userProfile = () => {
  return (
    <div className="flex min-w-full m-5">
      <Profile />
      <section className="p-4">
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options">
            <Tab key="내가 등록한글" title="내가 등록한글">
              <Card>
                <CardBody>
                  <article>
                    <h2>여행제목</h2>
                    <p>여행기간 : 2024.01.05 ~2024.01.09(4일간)</p>
                    <span>여행 후기내용</span>
                    <Image src="" alt="이미지 미리보기" />
                    <p>닉네임</p>
                    <Avatar
                      className="flex gap-4 items-center"
                      showFallback
                      src="https://images.unsplash.com/broken"
                    />
                  </article>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="스크랩한글" title="스크랩한글">
              <Card>
                <CardBody>
                  <article>
                    <h2>여행제목</h2>
                    <p>여행기간 : 2024.01.05 ~2024.01.09(4일간)</p>
                    <span>여행 후기내용</span>
                    <Image src="" alt="이미지 미리보기" />
                    <p>닉네임</p>
                    <Avatar
                      className="flex gap-4 items-center"
                      showFallback
                      src="https://images.unsplash.com/broken"
                    />
                  </article>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default userProfile;
