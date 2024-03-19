import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/util/supabase";
import type { User } from '@/types';

const fetchUserInfo = async (): Promise<User[]> => {
    const { data, error } = await supabase
      .from('users') 
      .select('id, email, password, nickname, avatar');
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
  };
  

export const useUserInfo = () => {
  return useQuery<User[]>({
    queryKey: ['userInfo'], 
    queryFn: fetchUserInfo,
});
};
