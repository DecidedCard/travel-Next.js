import { insertComment } from "@/util/detail-writeSupaBase/detailSupaBase";
import useSetMutation from "../useSetMutation";
import useInput from "../useInput";

const useComment = (id: string) => {
  const [comment, onChangeCommentHandler] = useInput();
  const commentQueryKey = ["detail/comment"];

  const { mutate: insertCommentMutate } = useSetMutation(
    insertComment,
    commentQueryKey
  );

  const onSubmitInsertHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      postId: id,
      userId: crypto.randomUUID(),
      userProfile: crypto.randomUUID(),
      comment,
    };
    insertCommentMutate(newComment);
  };

  return { comment, onChangeCommentHandler, onSubmitInsertHandler };
};

export default useComment;
