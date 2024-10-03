import { createPost, getPost } from "@/services/post";
import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";

export const useCreatePost = () => {
  // const router = useRouter();
  return useMutation({
    mutationKey: ["post"],
    mutationFn: async (payload: FormData) => await createPost(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "post created successfully!");
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
export const useGetPost = () => {
  // const router = useRouter();
  return useMutation({
    mutationKey: ["post"],
    mutationFn: async () => await getPost(),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "post retrieved successfully!");
      } else {
        message.error(data?.message || "Failed to get post!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to get post!");
    },
  });
};
