import { getWrite } from "@/util/writeSupaBase/writeSupaBase";
import { useQuery } from "@tanstack/react-query";

const queryKey = ["detail/post"];
export const useDetailQuery = (id: string) => {
  const {
    data: post,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey,
    queryFn: () => getWrite(id),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { post, isLoading };
};
