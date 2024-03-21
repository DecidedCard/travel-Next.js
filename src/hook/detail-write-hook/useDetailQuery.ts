import { getWrite } from "@/util/detail-writeSupaBase/writeSupaBase";
import { useQuery } from "@tanstack/react-query";

export const postQueryKey = ["detail/post"];
export const useDetailQuery = (id: string) => {
  const { data: post, isLoading } = useQuery({
    queryKey: postQueryKey,
    queryFn: () => getWrite(id),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return { post, isLoading };
};
