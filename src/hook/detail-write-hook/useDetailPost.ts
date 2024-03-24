"use client";

import {
  deleteWrite,
  deleteWriteComments,
} from "@/util/detail-writeSupaBase/writeSupaBase";
import { postQueryKey, useDetailQuery } from "./useDetailQuery";
import useSetMutation from "../useSetMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useUserInfo from "./useUserInfo";

const useDetailPost = (id: string) => {
  const { userInfo, isLoading: userInfoLoading } = useUserInfo();
  const [editFormToggle, setEditFormToggle] = useState(false);
  const { post, isLoading, isError } = useDetailQuery(id);
  const { mutate: deleteMutate } = useSetMutation(deleteWrite, postQueryKey);
  const router = useRouter();

  const onClickEditFormToggleHandler = () => {
    setEditFormToggle(!editFormToggle);
  };

  const onClickCancelHandler = () => {
    const result = window.confirm("취소하시겠습니까?");
    if (result) {
      setEditFormToggle(false);
    }
  };

  const onClickDeleteHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      router.replace("/");
      deleteMutate(id);
      deleteWriteComments(id);
    } else {
      return;
    }
  };

  return {
    post,
    isLoading,
    isError,
    onClickDeleteHandler,
    editFormToggle,
    onClickEditFormToggleHandler,
    onClickCancelHandler,
    setEditFormToggle,
    userInfo,
    userInfoLoading,
  };
};

export default useDetailPost;
