import {
  createPost,
  deletePost,
  downvotePost,
  getAllPost,
  getSinglePost,
  updatePost,
  upvotePost,
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
export const useUpdatePost = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (payload: { formData: FormData; _id: string }) =>
      await updatePost(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "post updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["post"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to update post!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to update post!");
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

export const useUpvotePost = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (id: string) => await upvotePost(id),
    async onSuccess(data) {
      if (data?.success) {
        // message.success(data?.message || "Upvoted successfully!");
        queryClient.invalidateQueries({ queryKey: ["post"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to upvoted!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to upvoted!");
    },
  });
};

export const useDownvotedPost = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (id: string) => await downvotePost(id),
    async onSuccess(data) {
      if (data?.success) {
        // message.success(data?.message || "Downvoted successfully!");
        queryClient.invalidateQueries({ queryKey: ["post"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to downvoted!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to downvoted!");
    },
  });
};
