import { supabase } from "@/util/supabase";
import { useQuery } from "@tanstack/react-query";

export const getAllPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    console.error(error);
    return Promise.reject(error);
  } else {
    return data;
  }
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
};
