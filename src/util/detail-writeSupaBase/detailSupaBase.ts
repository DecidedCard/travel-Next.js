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

export const insertComment = async ({ newComment }: { newComment: PostComment; }) => {
  const { error: insertError } = await supabase
    .from("postComment")
    .insert([newComment]); 
  if (insertError) {
    console.error(insertError);
    alert("댓글 추가에 실패했습니다.");
    return Promise.reject(insertError);
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("comment_count")
    .eq("id", newComment.postId)
    .single();

  if (postError) {
    console.error(postError);
    alert("댓글 수 조회에 실패했습니다.");
    return Promise.reject(postError);
  }

  // 조회한 comment_count 값에 1을 더해 posts 테이블을 업데이트
  const { error: updateError } = await supabase
    .from("posts")
    .update({ comment_count: postData.comment_count + 1 })
    .eq("id", newComment.postId);

  if (updateError) {
    console.error(updateError);
    alert("댓글 수 업데이트에 실패했습니다.");
    return Promise.reject(updateError);
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
