import { deleteWrite } from "@/util/detail-writeSupaBase/writeSupaBase";
import { postQueryKey, useDetailQuery } from "./useDetailQuery";
import useSetMutation from "../useSetMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useDetailPost = (id: string) => {
  const router = useRouter();
  const [editFormToggle, setEditFormToggle] = useState(false);
  const { post, isLoading } = useDetailQuery(id);
  const { mutate: deleteMutate } = useSetMutation(deleteWrite, postQueryKey);

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
    } else {
      return;
    }
  };

  return {
    post,
    isLoading,
    onClickDeleteHandler,
    editFormToggle,
    onClickEditFormToggleHandler,
    onClickCancelHandler,
    setEditFormToggle,
  };
};

export default useDetailPost;
