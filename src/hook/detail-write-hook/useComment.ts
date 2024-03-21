"use client";

import { useState } from "react";
import {
  deleteComment,
  getComments,
  insertComment,
  updateComment,
} from "@/util/detail-writeSupaBase/detailSupaBase";
import useSetMutation from "../useSetMutation";
import useUserInfo from "./useUserInfo";
import useInput from "../useInput";
import { useQuery } from "@tanstack/react-query";

import type { PostComment } from "@/types/writePage";

const useComment = (id: string) => {
  const { userInfo } = useUserInfo();
  const [comment, onChangeCommentHandler, setComment] = useInput();
  const [editingId, setEditingId] = useState("");
  const [editComment, onChangeEditCommentHandler, setEditComment] = useInput();
  const commentQueryKey = ["detail/comment"];

  const onClickEditingIdSet = (id: string) => {
    setEditingId(id);
  };

  const {
    data: commentsData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: commentQueryKey,
    queryFn: () => getComments(id),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: insertCommentMutate } = useSetMutation(
    insertComment,
    commentQueryKey
  );

  const { mutate: updateCommentMutate } = useSetMutation(
    updateComment,
    commentQueryKey
  );

  const { mutate: deleteMutate } = useSetMutation(
    deleteComment,
    commentQueryKey
  );

  const onSubmitInsertHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) {
      alert("내용을 입력해주시기 바랍니다.");
      return;
    }

    const newComment: PostComment = {
      postId: id,
      userId: userInfo.current!.id,
      userProfile: userInfo.current!.avatar!,
      userName: userInfo.current!.nickname,
      comment,
    };
    insertCommentMutate({ newComment });
    setComment("");
    alert("성공적으로 저장 되었습니다.");
  };

  const onSubmitUpdateHandler = (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    if (!editComment) {
      alert("내용을 입력해주시기 바랍니다.");
      return;
    }
    const result = window.confirm("수정하시겠습니까?");
    if (!result) {
      return;
    }
    const updateComment = {
      comment: editComment,
    };
    updateCommentMutate({ id, comment: updateComment });
    setEditingId("");
    setEditComment("");
  };

  return {
    comment,
    onChangeCommentHandler,
    onSubmitInsertHandler,
    commentsData,
    isError,
    isLoading,
    deleteMutate,
    editingId,
    onClickEditingIdSet,
    editComment,
    onChangeEditCommentHandler,
    setEditComment,
    userInfo,
    onSubmitUpdateHandler,
  };
};

export default useComment;
