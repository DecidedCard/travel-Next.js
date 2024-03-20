"use client";

import React from "react";
import { Input } from "@nextui-org/react";

import type { PostComment } from "@/types/writePage";
import useComment from "@/hook/detail-write-hook/useComment";

const CommentEditForm = ({ item }: { item: PostComment }) => {
  const { onClickEditFormToggle } = useComment(item.id!);
  return (
    <form>
      <Input />
      <button onClick={onClickEditFormToggle}>취소</button>
      <button>수정하기</button>
    </form>
  );
};

export default CommentEditForm;
