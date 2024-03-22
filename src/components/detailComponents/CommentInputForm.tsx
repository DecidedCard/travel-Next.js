"use client";

import React from "react";
import { Avatar, Button, Input } from "@nextui-org/react";

import type { CommentInputFormProps } from "@/types/writePage";

const CommentInputForm = ({
  userInfo,
  comment,
  onChangeCommentHandler,
  onSubmitInsertHandler,
}: CommentInputFormProps) => {
  return userInfo.current ? (
    <form
      onSubmit={onSubmitInsertHandler}
      className="flex justify-evenly items-center my-2 py-2 border-b border-solid border-gray-700"
    >
      <div className="flex gap-6 items-center w-fit">
        <Avatar src={userInfo.current.avatar!} alt="유저 프로필" />
        <p>{userInfo.current.nickname}</p>
      </div>
      <Input
        type="text"
        placeholder="코멘트를 입력해주세요"
        className="w-9/12"
        size="lg"
        value={comment}
        onChange={onChangeCommentHandler}
      />
      <Button type="submit">등록</Button>
    </form>
  ) : (
    <div className="flex items-center mx-auto w-fit h-12 text-xl border-b border-dashed border-gray-700">
      댓글 작성은 로그인 후 이용 가능합니다.
    </div>
  );
};

export default CommentInputForm;
