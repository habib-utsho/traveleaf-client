import { createPost, getPost } from "@/services/post";
import { TFilterQuery } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";

export const useCreatePost = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (payload: FormData) => await createPost(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "post created successfully!");
        queryClient.invalidateQueries({ queryKey: ["post"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to create post!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to create post!");
    },
  });
};
export const useGetPost = (query: TFilterQuery[] = []) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["post", ...query.map(({ name, value }) => [name, value])],
    queryFn: async () => {
      return await getPost(query);
    },
  });
};
