"use client";

import { Avatar, Button, Input } from "@nextui-org/react";
import React from "react";

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
      <div className="flex justify-evenly items-center w-24">
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
    <div> 로그인 해주시기 바랍니다.</div>
  );
};

export default CommentInputForm;
