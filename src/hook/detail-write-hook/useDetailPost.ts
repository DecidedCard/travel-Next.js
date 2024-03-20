import { deleteWrite } from "@/util/writeSupaBase/writeSupaBase";
import { postQueryKey, useDetailQuery } from "./useDetailQuery";
import useSetMutation from "../useSetMutation";
import { useRouter } from "next/navigation";

const useDetailPost = (id: string) => {
  const router = useRouter();
  const { post, isLoading } = useDetailQuery(id);
  const { mutate: deleteMutate } = useSetMutation(deleteWrite, postQueryKey);

  const onClickDeleteHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      router.replace("/");
      deleteMutate(id);
    } else {
      return;
    }
  };

  return { post, isLoading, onClickDeleteHandler };
};

export default useDetailPost;
