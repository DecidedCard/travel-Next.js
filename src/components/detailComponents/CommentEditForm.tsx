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
  onClickEditFormToggle,
}: {
  item: PostComment;
  editComment: string;
  setEditComment: (editComment: string) => void;
  onChangeEditCommentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickEditFormToggle: (editComment: string) => void;
}) => {
  useEffect(() => {
    setEditComment(item.comment);
  }, [setEditComment, item.comment]);

  return (
    <div>
      <Input value={editComment} onChange={onChangeEditCommentHandler} />
      <button onClick={() => onClickEditFormToggle("")}>취소</button>
      <button>수정하기</button>
    </div>
  );
};

export default CommentEditForm;
