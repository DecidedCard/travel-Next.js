import { supabase } from "../supabase";

import type { PostComment } from "@/types/writePage";

export const insertComment = async ({ arg }: { arg: PostComment }) => {
  const { error } = await supabase.from("postComment").insert([arg]).select();
  if (error) {
    console.error(error);
    alert("실패했습니다.");
    Promise.reject(error);
  }
};
