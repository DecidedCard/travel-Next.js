import { deleteWrite } from "@/util/writeSupaBase/writeSupaBase";
import { postQueryKey, useDetailQuery } from "./useDetailQuery";
import useSetMutation from "../useSetMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useDetailPost = (id: string) => {
  const router = useRouter();
  const [editForm, setEditForm] = useState(false);
  const { post, isLoading } = useDetailQuery(id);
  const { mutate: deleteMutate } = useSetMutation(deleteWrite, postQueryKey);

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
    setEditForm,
  };
};

export default useDetailPost;
