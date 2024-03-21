"use client";

import useComment from "@/hook/detail-write-hook/useComment";
import React from "react";
import CommentEditForm from "./CommentEditForm";

const CommentList = ({ id }: { id: string }) => {
  const {
    commentData,
    isLoading,
    isError,
    deleteMutate,
    editForm,
    onClickEditFormToggle,
    editComment,
    setEditComment,
    onChangeEditCommentHandler,
  } = useComment(id);
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>에러!</div>;
  }
  return (
    <section>
      {commentData!.map((item) => {
        return (
          <div key={item.id}>
            {editForm === item.id ? (
              <CommentEditForm
                item={item}
                editComment={editComment}
                setEditComment={setEditComment}
                onChangeEditCommentHandler={onChangeEditCommentHandler}
                onClickEditFormToggle={onClickEditFormToggle}
              />
            ) : (
              <div className="flex justify-between">
                <p>{item.comment}</p>
                <div>
                  <button
                    onClick={() => onClickEditFormToggle(item.id!)}
                    className="w-14 border-r border-solid border-slate-700"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteMutate(item.id)}
                    className="w-14"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default CommentList;
