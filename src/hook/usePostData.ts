import { supabase } from "@/util/supabase";
import { Post } from "@/types/writePage";

export const getAllPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");
    if (error) {
      console.error(error);
      return Promise.reject(error);
    } else {
      return data;
    }
  };
