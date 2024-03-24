"use client";

import React from "react";
import CommentInputForm from "./CommentInputForm";
import CommentList from "./CommentList";
import useComment from "@/hook/detail-write-hook/useComment";

const Comments = ({ id }: { id: string }) => {
  const {
    userInfo,
    userInfoLoading,
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
  if (userInfoLoading || isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>댓글을 가져오지 못 했습니다.</div>;
  }
  return (
    <>
      <CommentInputForm
        userInfo={userInfo!}
        comment={comment}
        onChangeCommentHandler={onChangeCommentHandler}
        onSubmitInsertHandler={onSubmitInsertHandler}
      />
      <CommentList
        userInfo={userInfo!}
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
