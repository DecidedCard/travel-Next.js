import { User } from "@/types";
import { supabase } from "../supabase";

export const getUserInfo = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userInfo, error: userInfoError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id);
  if (userInfoError) {
    console.error(userInfoError);
    return Promise.reject(userInfoError);
  }
  return userInfo[0] as User;
};
