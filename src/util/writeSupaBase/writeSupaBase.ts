import { post } from "@/types/writePage";
import { supabase } from "../supabase";

const path = crypto.randomUUID();

export const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage
    .from("postImage")
    .upload(`${path}/${file.lastModified}`, file, {
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

export const insertWriting = async (newWrite: post) => {
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
