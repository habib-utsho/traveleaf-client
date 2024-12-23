import {
  createCommnet,
  deleteComment,
  getSingleComment,
  updateComment,
} from "@/services/commnets";
import { TFilterQuery } from "@/types";
import { TComment, TCreateComment } from "@/types/commnet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";

export const useCreateComment = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comment"],
    mutationFn: async (payload: TCreateComment) => await createCommnet(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Comment created successfully!");
        queryClient.invalidateQueries({ queryKey: ["comment"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to create comment!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to create comment!");
    },
  });
};
export const useGetAllComment = (query: TFilterQuery[] = []) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["comment", ...query.map(({ name, value }) => [name, value])],
    queryFn: async () => {
      try {
        const fetchOption = {
          next: {
            tags: ["comment"],
            revalidate: 60,
          },
        };

        const params = new URLSearchParams();

        if (query) {
          query.forEach((element: TFilterQuery) => {
            params.append(element.name, element.value);
          });
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/comment?${params.toString()}`,
          fetchOption
        );
        return response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw new Error(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to get all comments!"
        );
      }
    },
  });
};
export const useGetSingleComment = (id: string) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
      return await getSingleComment(id);
    },
  });
};

export const useDeleteComment = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comment"],
    mutationFn: async (id: string) => await deleteComment(id),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "comment deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["comment"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to delete comment!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to delete comment!");
    },
  });
};

export const useUpdateComment = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["comment"],
    mutationFn: async (payload: Partial<TComment>) =>
      await updateComment(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "comment updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["comment"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to update comment!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to update comment!");
    },
  });
};
