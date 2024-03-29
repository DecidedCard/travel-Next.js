import { User } from "@/types";
import { supabase } from "@/util/supabase";

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
    // 세션 저장
    localStorage.setItem("user", JSON.stringify(data.user));

    // "users"테이블에 사용자 데이터 추가
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .insert({ id: data.user?.id, email, nickname });

    if (error) {
      throw userDataError;
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// 로그인
export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data || !data.user) {
      throw new Error("User data not found in signInWithPassword response");
    }

    const user = data.user;

    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError) throw fetchError;

    return userData;
  } catch (error) {
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    // 세션 제거
  } catch (error) {
    console.log(error);
  }
};
