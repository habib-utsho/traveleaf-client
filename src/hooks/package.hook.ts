import {
  createPackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
} from "@/services/package";
import { TFilterQuery } from "@/types";
import { TPackage } from "@/types/package";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";

export const useCreatePackage = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["package"],
    mutationFn: async (payload: TPackage) => await createPackage(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "package created successfully!");
        queryClient.invalidateQueries({ queryKey: ["package"] });

        // router.push("/package");
      } else {
        message.error(data?.message || "Failed to create package!");
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError(error: any) {
      message.error(error?.message || "Failed to create package!");
    },
  });
};
export const useGetAllPackage = (query: TFilterQuery[] = []) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["package", ...query.map(({ name, value }) => [name, value])],
    queryFn: async () => {
      return await getAllPackages(query);
    },
  });
};
export const useGetSinglePackage = (id: string) => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["package"],
    queryFn: async () => {
      return await getSinglePackage(id);
    },
  });
};

export const useDeletePackage = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["package"],
    mutationFn: async (id: string) => await deletePackage(id),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "package deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["package"] });

        // router.push("/package");
      } else {
        message.error(data?.message || "Failed to delete package!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to delete package!");
    },
  });
};
