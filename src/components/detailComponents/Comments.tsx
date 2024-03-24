"use client";

import React from "react";
import useComment from "@/hook/detail-write-hook/useComment";
import CommentInputForm from "./CommentInputForm";
import CommentList from "./CommentList";

const Comments = ({ id }: { id: string }) => {
  const {
    user,
    comment,
    onChangeCommentHandler,
    onSubmitInsertHandler,
    commentsData,
    isLoading,
    isError,
    editingId,
    editComment,
    onClickEditingIdSet,
    setEditComment,
    onChangeEditCommentHandler,
    onSubmitUpdateHandler,
    deleteMutate,
  } = useComment(id);
  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>댓글을 가져오지 못 했습니다.</div>;
  }
  return (
    <>
      <CommentInputForm
        user={user!}
        comment={comment}
        onChangeCommentHandler={onChangeCommentHandler}
        onSubmitInsertHandler={onSubmitInsertHandler}
      />
      <CommentList
        user={user!}
        commentsData={commentsData!}
        isLoading={isLoading}
        isError={isError}
        editingId={editingId}
        onClickEditingIdSet={onClickEditingIdSet}
        editComment={editComment}
        setEditComment={setEditComment}
        onChangeEditCommentHandler={onChangeEditCommentHandler}
        onSubmitUpdateHandler={onSubmitUpdateHandler}
        deleteMutate={deleteMutate}
      />
    </>
  );
};

export default Comments;
