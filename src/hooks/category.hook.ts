import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/category";
import { TCategory } from "@/types/category";
import { TFilterQuery } from "@/types";

export const useCreateCategory = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["category"],
    mutationFn: async (payload: TCategory) => await createCategory(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Category created successfully!");
        queryClient.invalidateQueries({ queryKey: ["category"] });
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
// export const useGetAllCategory = (query: TFilterQuery[] = []) => {
//   return useQuery({
//     queryKey: ["category", ...query.map(({ name, value }) => [name, value])],
//     queryFn: async () => {
//       // try {
//       //   console.log("hello inside category hook");
//       console.log(query, "query");
//       const categories = await getAllCategory(query);
//       console.log(categories, "await getAllCategory(query)");
//       return categories;
//       // } catch (error) {
//       //   console.error("Error fetching categories:", error);
//       //   throw error;
//       // }
//     },
//   });
// };

export const useGetAllCategory = (query: TFilterQuery[] = []) => {
  return useQuery({
    queryKey: ["category", ...query.map(({ name, value }) => [name, value])],
    queryFn: async () => {
      const params = new URLSearchParams();

      query.forEach(({ name, value }) => {
        params.append(name, value);
      });
      const fetchOption = {
        next: {
          tags: ["category"],
        },
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category?${params.toString()}`,
        fetchOption
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      return await response.json();
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["category"], // This is fine, as you're updating categories
    mutationFn: async (payload: TCategory) => await updateCategory(payload), // Correct function for updating
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Category updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["category"] }); // Invalidate the category query to refresh data
      } else {
        message.error(data?.message || "Failed to update category!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to update category!");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["category"], // Same key, as you're managing the same category data
    mutationFn: async (id: string) => await deleteCategory(id), // Correct function for deleting, expecting an id
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Category deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["category"] }); // Invalidate the category query to refresh data
      } else {
        message.error(data?.message || "Failed to delete category!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to delete category!");
    },
  });
};
