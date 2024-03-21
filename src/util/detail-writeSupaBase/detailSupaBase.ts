import { supabase } from "../supabase";
import type { PostComment } from "@/types/writePage";

export const getComment = async (id: string): Promise<PostComment | null> => {
  const { data: postComments, error } = await supabase
    .from("postComment")
    .select("*")
    .eq("id", id)
    .single(); 
  if (error) {
    console.error(error);
    return null; 
  } else {
    return postComments; 
  }
};


export const insertComment = async ({
  newComment,
}: {
  newComment: PostComment;
}) => {
  try {
    const { data, error } = await supabase
      .from("postComment")
      .insert({ ...newComment })
      .select();
    if (error) {
      console.error(error);
      alert("실패했습니다.");
      Promise.reject(error);
    } else {
      // 댓글이 작성되면 해당 게시글의 댓글 수 업데이트
      await updateCommentCount(newComment.postId);
    }
  } catch (error) {
    console.error("Error inserting comment:", error);
    alert("실패했습니다.");
    Promise.reject(error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const { error } = await supabase
      .from("postComment")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.error(error);
      alert("실패했습니다.");
      Promise.reject(error);
    } else {
      // 댓글이 삭제되면 해당 게시글의 댓글 수 업데이트
      const comment = await getComment(id);
      if (comment) {
        await updateCommentCount(comment.postId);
      }
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    alert("실패했습니다.");
    Promise.reject(error);
  }
};

// 해당 postId의 게시글의 댓글 수를 업데이트하는 함수
const updateCommentCount = async (postId: string) => {
  try {
    const { data: comments, error: commentError } = await supabase
      .from("postComment")
      .select("id")
      .eq("postId", postId);
    if (commentError) {
      console.error(`Error fetching comments for post ${postId}:`, commentError);
      return;
    }

    // 댓글 수 업데이트
    const commentCount = comments.length;
    await supabase
      .from("posts")
      .update({ comment_count: commentCount })
      .eq("id", postId);
  } catch (error) {
    console.error(`Error updating comment count for post ${postId}:`, error);
  }
};
