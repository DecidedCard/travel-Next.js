"use client";

import React, { useEffect } from "react";
import { Avatar, Input } from "@nextui-org/react";

import type { PostComment } from "@/types/writePage";

const CommentEditForm = ({
  item,
  editComment,
  setEditComment,
  onChangeEditCommentHandler,
  onClickEditingIdSet,
  onSubmitUpdateHandler,
}: {
  item: PostComment;
  editComment: string;
  setEditComment: (editComment: string) => void;
  onChangeEditCommentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEditingIdSet: (editComment: string) => void;
  onSubmitUpdateHandler: (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => void;
}) => {
  useEffect(() => {
    setEditComment(item.comment);
  }, [setEditComment, item.comment]);

  return (
    <form
      onSubmit={(e) => onSubmitUpdateHandler(e, item.id!)}
      className="flex justify-evenly items-center my-2 py-2 border-b border-solid border-gray-700"
    >
      <div className="flex justify-evenly items-center w-24">
        <Avatar src={item.userProfile} alt="유저 프로필" />
        <p>{item.userName}</p>
      </div>
      <Input
        type="text"
        placeholder="코멘트를 입력해주세요"
        value={editComment}
        onChange={onChangeEditCommentHandler}
        className="w-9/12"
      />
      <div>
        <button
          type="submit"
          className="border-r border-solid border-gray-700 w-20"
        >
          수정하기
        </button>
        <button
          type="button"
          onClick={() => onClickEditingIdSet("")}
          className="w-12 text-subColor1"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default CommentEditForm;
