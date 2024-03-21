"use client";

import React from "react";
import CommentInputForm from "./CommentInputForm";
import CommentList from "./CommentList";
import useComment from "@/hook/detail-write-hook/useComment";

const Comments = ({ id }: { id: string }) => {
  const {
    userInfo,
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
  return (
    <>
      <CommentInputForm
        userInfo={userInfo}
        comment={comment}
        onChangeCommentHandler={onChangeCommentHandler}
        onSubmitInsertHandler={onSubmitInsertHandler}
      />
      <CommentList
        userInfo={userInfo}
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
