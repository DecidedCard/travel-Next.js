import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { supabase } from '../util/supabase';
import type { UserInfo } from '../types';

const fetchUserInfo = async (): Promise<UserInfo[]> => {
    const { data, error } = await supabase
      .from('userinfo')
      .select('id, nickname, avatar');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useUserInfo = (): UseQueryResult<UserInfo[]> => {
    return useQuery<UserInfo[]>({
      queryKey: ['userinfo'],
      queryFn: fetchUserInfo,
    });
  };