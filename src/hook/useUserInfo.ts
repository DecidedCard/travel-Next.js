"use client"

import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/util/supabase";
import type { UserInfo } from '@/types';

const fetchUserInfo = async (): Promise<UserInfo[]> => {
  const { data, error } = await supabase
    .from('users') 
    .select('id, nickname, avatar');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUserInfo = () => {
  return useQuery<UserInfo[]>({
    queryKey: ['userInfo'], 
    queryFn: fetchUserInfo,
});
};
