import { deleteWrite, updateWrite } from "@/util/writeSupaBase/writeSupaBase";
import { postQueryKey, useDetailQuery } from "./useDetailQuery";
import useSetMutation from "../useSetMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Post } from "@/types/writePage";

const useDetailPost = (id?: string) => {
  const router = useRouter();
  const [editForm, setEditForm] = useState(false);
  const { post, isLoading } = useDetailQuery(id!);
  const { mutate: deleteMutate } = useSetMutation(deleteWrite, postQueryKey);
  const { mutate: updateMutate } = useSetMutation(updateWrite, postQueryKey);

  const onClickEditFormToggleHandler = () => {
    setEditForm(!editForm);
  };

  const onClickCancelHandler = () => {
    const result = window.confirm("취소하시겠습니까?");
    if (result) {
      setEditForm(false);
    }
  };

  const onClickDeleteHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      router.replace("/");
      deleteMutate(id);
    } else {
      return;
    }
  };

  return {
    post,
    isLoading,
    onClickDeleteHandler,
    editForm,
    onClickEditFormToggleHandler,
    onClickCancelHandler,
    updateMutate,
  };
};

export default useDetailPost;
