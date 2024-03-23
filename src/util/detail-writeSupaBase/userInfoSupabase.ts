import { supabase } from "../supabase";

import type { User } from "@/types";

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
