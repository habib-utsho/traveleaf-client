import {
  createPost,
  deletePost,
  getAllPost,
  getSinglePost,
} from "@/services/post";
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
export const useGetAllPost = (query: TFilterQuery[] = []) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["post", ...query.map(({ name, value }) => [name, value])],
    queryFn: async () => {
      return await getAllPost(query);
    },
  });
};
export const useGetSinglePost = (id: string) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      return await getSinglePost(id);
    },
  });
};

export const useDeletePost = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (id: string) => await deletePost(id),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "post deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["post"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to delete post!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to delete post!");
    },
  });
};
