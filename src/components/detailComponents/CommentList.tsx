"use client";

import React from "react";
import CommentEditForm from "./CommentEditForm";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import type { PostComment } from "@/types/writePage";
import { UseMutateFunction } from "@tanstack/react-query";

const CommentList = ({
  userInfo,
  commentsData,
  isLoading,
  isError,
  editingId,
  onClickEditingIdSet,
  editComment,
  setEditComment,
  onChangeEditCommentHandler,
  onSubmitUpdateHandler,
  deleteMutate,
}: {
  userInfo: React.MutableRefObject<{
    avatar: string;
    id: string;
    email: string;
    nickname: string;
  }>;
  commentsData: PostComment[];
  isLoading: boolean;
  isError: boolean;
  editingId: string;
  onClickEditingIdSet: (id: string) => void;
  editComment: string;
  setEditComment: React.Dispatch<React.SetStateAction<string>>;
  onChangeEditCommentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitUpdateHandler: (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => void;
  deleteMutate: UseMutateFunction<unknown, Error, any, unknown>;
}) => {
  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>에러!</div>;
  }

  return (
    <section>
      {commentsData!.map((item) => {
        return (
          <div
            key={item.id}
            className="border-b border-solid border-gray-700 mb-2"
          >
            {editingId === item.id ? (
              <CommentEditForm
                item={item}
                editComment={editComment}
                setEditComment={setEditComment}
                onChangeEditCommentHandler={onChangeEditCommentHandler}
                onClickEditingIdSet={onClickEditingIdSet}
                onSubmitUpdateHandler={onSubmitUpdateHandler}
              />
            ) : (
              <Card className="m-4">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={item.userProfile}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {item.userName}
                      </h4>
                    </div>
                  </div>
                  {userInfo.current ? (
                    item.userId === userInfo.current.id && (
                      <div className="mt-auto">
                        <button
                          onClick={() => onClickEditingIdSet(item.id!)}
                          className="w-14 border-r border-solid border-slate-700"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => deleteMutate(item.id)}
                          className="w-14 text-subColor1"
                        >
                          삭제
                        </button>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </CardHeader>
                <CardBody className="p-5 text-small text-default-400">
                  <p>{item.comment}</p>
                </CardBody>
              </Card>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default CommentList;
