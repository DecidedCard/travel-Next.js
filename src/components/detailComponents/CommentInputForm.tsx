"use client";

import useComment from "@/hook/detail-write-hook/useComment";
import { Avatar, Button, Input } from "@nextui-org/react";
import React from "react";

const CommentInputForm = ({ id }: { id: string }) => {
  const { userInfo, comment, onChangeCommentHandler, onSubmitInsertHandler } =
    useComment(id);
  return (
    <form
      onSubmit={onSubmitInsertHandler}
      className="flex justify-evenly items-center my-2 py-2 border-b border-solid border-gray-700"
    >
      <div className="flex justify-evenly items-center w-24">
        <Avatar src={userInfo.current.avatar} alt="유저 프로필" />
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
  );
};

export default CommentInputForm;
