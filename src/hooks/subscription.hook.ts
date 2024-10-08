import {
  createSubscription,
  getAllSubscription,
} from "@/services/subscription";
import { TFilterQuery } from "@/types";
import { TSubscription } from "@/types/subscription";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
import { message } from "antd";

export const useCreateSubscription = () => {
  // const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["subscription"],
    mutationFn: async (payload: TSubscription) =>
      await createSubscription(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Subscription created successfully!");
        queryClient.invalidateQueries({ queryKey: ["subscription"] });

        // router.push("/post");
      } else {
        message.error(data?.message || "Failed to subscribe!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to subscribe!");
    },
  });
};

export const useGetAllSubscription = (query: TFilterQuery[] = []) => {
  // const router = useRouter();
  return useQuery({
    queryKey: [
      "subscription",
      ...query.map(({ name, value }) => [name, value]),
    ],
    queryFn: async () => {
      return await getAllSubscription(query);
    },
  });
};
