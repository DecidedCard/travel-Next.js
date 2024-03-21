import {
  deleteComment,
  getComment,
  insertComment,
} from "@/util/detail-writeSupaBase/detailSupaBase";
import useSetMutation from "../useSetMutation";
import useInput from "../useInput";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

import type { PostComment, UserInfo } from "@/types/writePage";

const useComment = (id: string) => {
  let userInfo: UserInfo = { avatar: "", id: "", email: "", nickname: "" };
  const [comment, onChangeCommentHandler, setComment] = useInput();
  const [editingId, setEditingId] = useState("");
  const [editComment, onChangeEditCommentHandler, setEditComment] = useInput();
  const commentQueryKey = ["detail/comment"];
  const router = useRouter();

  if (typeof window !== "undefined") {
    userInfo = JSON.parse(localStorage.getItem("user")!);
    if (!userInfo) {
      alert("로그인 해주시기 바랍니다.");
      router.replace("/login");
    }
  }

  const {
    data: commentsData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: commentQueryKey,
    queryFn: () => getComment(id),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: insertCommentMutate } = useSetMutation(
    insertComment,
    commentQueryKey
  );

  const onSubmitInsertHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment: PostComment = {
      postId: id,
      userId: userInfo.id,
      userProfile: userInfo.avatar,
      userName: userInfo.nickname,
      comment,
    };
    insertCommentMutate({ newComment });
    setComment("");
    alert("성공적으로 저장 되었습니다.");
  };

  const onClickEditingIdSet = (id: string) => {
    setEditingId(id);
  };

  const { mutate: deleteMutate } = useSetMutation(
    deleteComment,
    commentQueryKey
  );

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
  };
};

export default useComment;
