import { supabase } from "@/util/supabase";

import React from "react";

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data.user?.id;
  } catch (error) {
    throw error;
  }
};
