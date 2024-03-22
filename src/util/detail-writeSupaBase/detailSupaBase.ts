import { supabase } from "../supabase";

import type { PostComment } from "@/types/writePage";

export const getComments = async (id: string): Promise<PostComment[]> => {
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

export const updateComment = async ({
  id,
  comment,
}: {
  id: string;
  comment: PostComment;
}) => {
  const { error } = await supabase
    .from("postComment")
    .update(comment)
    .eq("id", id);
  if (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const deleteComment = async (id: string) => {
  const { data: commentData, error: commentDataError } = await supabase
    .from("postComment")
    .select("postId")
    .eq("id", id)
    .single();

  if (commentDataError || !commentData) {
    console.error(commentDataError ? commentDataError : "댓글 정보 조회 실패");
    alert("댓글 정보 조회에 실패했습니다.");
    return Promise.reject(commentDataError);
  }

  const { error: deleteError } = await supabase
    .from("postComment")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error(deleteError);
    alert("댓글 삭제에 실패했습니다.");
    return Promise.reject(deleteError);
  }

  const { data: postData, error: postDataError } = await supabase
    .from("posts")
    .select("comment_count")
    .eq("id", commentData.postId)
    .single();

  if (postDataError || !postData) {
    console.error(postDataError ? postDataError : "게시물 정보 조회 실패");
    alert("게시물 정보 조회에 실패했습니다.");
    return Promise.reject(postDataError);
  }

  // 댓글이 삭제된 게시물의 comment_count를 1 감소
  const { error: updateError } = await supabase
    .from("posts")
    .update({ comment_count: postData.comment_count - 1 })
    .eq("id", commentData.postId);

  if (updateError) {
    console.error(updateError);
    alert("댓글 수 업데이트에 실패했습니다.");
    return Promise.reject(updateError);
  }
};
