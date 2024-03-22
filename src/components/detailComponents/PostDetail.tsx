"use client";

import useDetailPost from "@/hook/detail-write-hook/useDetailPost";
import React from "react";
import InputForm from "../writeComponents/InputForm";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

const PostDetail = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    post,
    isLoading,
    isError,
    onClickDeleteHandler,
    editFormToggle,
    onClickEditFormToggleHandler,
    onClickCancelHandler,
    userInfo,
  } = useDetailPost(id);

  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }

  if (isError) {
    alert("없는 게시글인거 같습니다.");
    router.replace("/");
    return <></>;
  }

  return editFormToggle ? (
    <InputForm post={post!} onClickCancelHandler={onClickCancelHandler} />
  ) : (
    <main>
      <section className="flex justify-between items-center m-2 py-4 border-b border-solid border-gray-700">
        <h2 className="text-4xl font-bold">{post!.title}</h2>
        {userInfo.current ? (
          post?.userId === userInfo.current.id && (
            <div>
              <button
                className="border-r border-solid border-gray-700 w-14"
                onClick={onClickEditFormToggleHandler}
              >
                수정
              </button>
              <button
                className="w-14 text-subColor1"
                onClick={onClickDeleteHandler}
              >
                삭제
              </button>
            </div>
          )
        ) : (
          <></>
        )}
      </section>
      <section className="flex justify-between m-2 pb-1 border-b border-solid border-gray-700 relative">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl">여행일정</h3>
          <div className="flex flex-col gap-2">
            <p>
              <label>일정: </label>
              {post?.travelDate}
            </p>
            <p>
              <label>여행지: </label>
              {post?.travelPlace}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-evenly mr-2">
          <div className="flex gap-6 items-center w-fit">
            <p>
              <label>작성자: </label>
              {post?.userName}
            </p>
            <Avatar src={post?.userProfile} />
          </div>
          <p className="mx-auto w-fit text-gray-500">
            <label>조회: </label>
            {post?.view_count}
          </p>
        </div>
      </section>
      <section className="m-2 p-2 border-b border-solid border-gray-700">
        <div dangerouslySetInnerHTML={{ __html: post!.postMainContent }}></div>
      </section>
    </main>
  );
};

export default PostDetail;
