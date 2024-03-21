"use client";

import useComment from "@/hook/detail-write-hook/useComment";
import { Button, Input } from "@nextui-org/react";
import React from "react";

const CommentInputForm = ({ id }: { id: string }) => {
  const { comment, onChangeCommentHandler, onSubmitInsertHandler } =
    useComment(id);
  return (
    <form
      onSubmit={onSubmitInsertHandler}
      className="flex justify-evenly items-center my-2 py-2 border-b border-solid border-gray-700"
    >
      <div className="w-24">유저정보</div>
      <Input
        type="text"
        placeholder="코멘트를 입력해주세요"
        className="w-10/12"
        size="lg"
        color="primary"
        value={comment}
        onChange={onChangeCommentHandler}
      />
      <Button type="submit">등록</Button>
    </form>
  );
};

export default CommentInputForm;
