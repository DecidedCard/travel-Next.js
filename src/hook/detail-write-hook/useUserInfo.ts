import { User } from "@/types";
import { getUserInfo } from "@/util/detail-writeSupaBase/userInfoSupabase";
import { useQuery } from "@tanstack/react-query";

const queryKey = ["userInfo"];
const useUserInfo = () => {
  const { data: userInfo, isLoading } = useQuery({
    queryKey,
    queryFn: getUserInfo,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { userInfo, isLoading };
};

export default useUserInfo;
