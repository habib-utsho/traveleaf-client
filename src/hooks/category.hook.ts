import { useMutation } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";
import { createCategory, getCategory } from "@/services/category";
import { TCategory } from "@/types/category";

export const useCreateCategory = () => {
  // const router = useRouter();
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (payload: TCategory) => await createCategory(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Category created successfully!");
        // router.push("/category");
      } else {
        message.error(data?.message || "Failed to create category!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to create category!");
    },
  });
};
export const useGetCategory = () => {
  // const router = useRouter();
  return useMutation({
    mutationKey: ["category"],
    mutationFn: async () => await getCategory(),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Category retrieved successfully!");
      } else {
        message.error(data?.message || "Failed to get category!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to get category!");
    },
  });
};
