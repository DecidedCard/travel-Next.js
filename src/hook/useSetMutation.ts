import {
  MutateFunction,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const useSetMutation = (
  fc: (arg: any) => Promise<undefined>,
  queryKey: QueryKey
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: fc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
  return { mutate };
};

export default useSetMutation;
