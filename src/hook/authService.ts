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

    if (error) throw error;

    if (!data || !data.user) {
      throw new Error("User data not found in signInWithPassword response");
    }

    const user = data.user;

    // 사용자의 ID를 사용하여 데이터베이스에서 사용자 데이터를 가져오기
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError) throw fetchError;

    if (!userData) {
      throw new Error("User data not found in database");
    }

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
  } catch (error) {
    console.log(error);
  }
};
