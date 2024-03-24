"use client";

import {
  deleteWrite,
  deleteWriteComments,
} from "@/util/detail-writeSupaBase/writeSupaBase";
import { useState } from "react";
import { postQueryKey, useDetailQuery } from "./useDetailQuery";
import useSetMutation from "../useSetMutation";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const useDetailPost = (id: string) => {
  const { user, isLoggedIn } = useAuthStore();
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
    user,
    isLoggedIn,
  };
};

export default useDetailPost;
