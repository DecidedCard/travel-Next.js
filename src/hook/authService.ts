import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/util/supabase";

import React from "react";

export const signUp = async (
  email: string,
  password: string,
  nickname: string
) => {
  // 회원가입
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    // 사용자 데이터 추가
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .insert({ id: data.user?.id, email, nickname });

    if (userDataError) {
      throw userDataError;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};
