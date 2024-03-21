import { supabase } from "../supabase";

import type { PostComment } from "@/types/writePage";

export const getComment = async (id: string): Promise<PostComment[]> => {
  const { data: postComment, error } = await supabase
    .from("postComment")
    .select("*")
    .eq("postId", id);
  if (error) {
    console.error(error);
    return Promise.reject(error);
  } else {
    return postComment;
  }
};

export const insertComment = async ({
  newComment,
}: {
  newComment: PostComment;
}) => {
  const { error } = await supabase
    .from("postComment")
    .insert({ ...newComment })
    .select();
  if (error) {
    console.error(error);
    alert("실패했습니다.");
    Promise.reject(error);
  }
};

export const deleteComment = async (id: string) => {
  const { error } = await supabase.from("postComment").delete().eq("id", id);
  if (error) {
    console.error(error);
    alert("실패했습니다.");
    Promise.reject(error);
  }
};

// export const getCommentCount = async (postId: string) => {
//   try {
//   const { data: postComment, error } = await supabase
//     .from("postComment")
//     .select("postId")
//     .eq("postId", postId);
//   if (error) {
//     console.error(error);
//     Promise.reject(error);
//   }
//     return postComment?.length;
//   } catch (error) {
//     console.error(error);
//     return 0;
//   }
// };

