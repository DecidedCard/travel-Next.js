import {
  deleteComment,
  getComment,
  insertComment,
} from "@/util/detail-writeSupaBase/detailSupaBase";
import useSetMutation from "../useSetMutation";
import useInput from "../useInput";

import type { PostComment } from "@/types/writePage";
import { useQuery } from "@tanstack/react-query";

const useComment = (id: string) => {
  const [comment, onChangeCommentHandler, setComment] = useInput();
  const commentQueryKey = ["detail/comment"];

  const {
    data: commentData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: commentQueryKey,
    queryFn: getComment,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: insertCommentMutate } = useSetMutation(
    insertComment,
    commentQueryKey
  );

  const { mutate: deleteMutate } = useSetMutation(
    deleteComment,
    commentQueryKey
  );

  const onSubmitInsertHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment: PostComment = {
      postId: id,
      userId: crypto.randomUUID(),
      userProfile: crypto.randomUUID(),
      comment,
    };
    insertCommentMutate({ newComment });
    setComment("");
    alert("성공적으로 저장 되었습니다.");
  };

  return {
    comment,
    onChangeCommentHandler,
    onSubmitInsertHandler,
    commentData,
    isError,
    isLoading,
    deleteMutate,
  };
};

export default useComment;
