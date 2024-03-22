import { Post } from "@/types/writePage";
import { supabase } from "../supabase";

const path = crypto.randomUUID();

export const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("postImage")
    .upload(`text/${path}/${file.lastModified}`, file, {
      upsert: true,
    });
  if (error) {
    console.error(error);
    alert("데이터를 저장하지 못 했습니다.");
  } else {
    return data;
  }
};

export const getUrlImage = (arg: string) => {
  const { data } = supabase.storage.from("postImage").getPublicUrl(arg);
  return data;
};

export const insertWriting = async (newWrite: Post) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([newWrite])
    .select();
  if (error) {
    alert("글을 저장하지 못 했습니다.");
    console.error(error);
    return error;
  } else {
    return data;
  }
};

export const getWrite = async (id: string) => {
  // 특정 게시글 조회
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    return Promise.reject(error);
  } else {
    const post = data[0] as Post;

    // 조회수 업데이트 로직 추가
    if (post) {
      const { error: updateError } = await supabase
        .from("posts")
        .update({ view_count: (post.view_count ?? 0) + 1 })
        .eq("id", id);

      if (updateError) {
        console.error('조회수 업데이트 실패:', updateError);

      }
    }

    return post;
  }
};


export const updateWrite = async ({ id, post }: { id: string; post: Post }) => {
  const { error } = await supabase.from("posts").update(post).eq("id", id);
  if (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const deleteWrite = async (id: string) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
