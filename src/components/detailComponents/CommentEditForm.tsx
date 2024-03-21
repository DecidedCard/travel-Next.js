"use client";

import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";

import type { PostComment } from "@/types/writePage";
import useComment from "@/hook/detail-write-hook/useComment";

const CommentEditForm = ({ item }: { item: PostComment }) => {
  const {
    onClickEditFormToggle,
    editComment,
    onChangeEditCommentHandler,
    setEditComment,
  } = useComment(item.id!);

  useEffect(() => {
    setEditComment(item.comment);
  }, [setEditComment, item.comment]);

  return (
    <form>
      <Input value={editComment} onChange={onChangeEditCommentHandler} />
      <button onClick={() => onClickEditFormToggle("")}>취소</button>
      <button>수정하기</button>
    </form>
  );
};

export default CommentEditForm;
