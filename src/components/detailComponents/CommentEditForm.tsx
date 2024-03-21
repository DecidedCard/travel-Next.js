"use client";

import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";

import type { PostComment } from "@/types/writePage";
import useComment from "@/hook/detail-write-hook/useComment";

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
    <form onSubmit={(e) => onSubmitUpdateHandler(e, item.id!)}>
      <Input value={editComment} onChange={onChangeEditCommentHandler} />
      <button type="button" onClick={() => onClickEditingIdSet("")}>
        취소
      </button>
      <button type="submit">수정하기</button>
    </form>
  );
};

export default CommentEditForm;
