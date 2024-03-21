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
  } = useComment(id);
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (isError) {
    return <div>에러!</div>;
  }
  return (
    <section>
      {commentData?.length !== 0 ? (
        commentData!.map((item) => {
          return editForm === item.id ? (
            <CommentEditForm item={item} />
          ) : (
            <div key={item.id} className="flex justify-between">
              <p>{item.comment}</p>
              <div>
                <button
                  onClick={() => onClickEditFormToggle(item.id!)}
                  className="w-14 border-r border-solid border-slate-700"
                >
                  수정
                </button>
                <button onClick={() => deleteMutate(item.id)} className="w-14">
                  삭제
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </section>
  );
};

export default CommentList;
