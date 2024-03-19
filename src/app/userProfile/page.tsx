"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/react";
import Image from "next/image";
const userProfile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [nickName, setNickname] = useState("");
  const [newNickName, setNewNickname] = useState("");

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    event.target.value = null;
  };

  return (
    <div className="flex">
      <div className="flex flex-col bg-red-400">
        <p>안녕하세요 여행한탕 님 :D</p>
        <Image src={imageUrl} alt="유저프로필" />
        <input
          type="file"
          id="file"
          accept="image/jpg,image/png,image/jpeg"
          onChange={handleProfileImageUpload}
          style={{ display: "none" }}
        />
        <label>파일선택</label>
        <span>여행한탕</span>
        <p>asd123@gmail.com</p>
      </div>
      <section>
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options">
            <Tab key="등록한글" title="등록한글">
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
            <Tab key="music" title="스크랩한글">
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
            <Tab key="videos" title="좋아요">
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
