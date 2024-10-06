import { useContext } from "react";
import { UserContext } from "../context/user.provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTraveler, getAllTraveler } from "@/services/user";
import { TFilterQuery } from "@/types";
import { message } from "antd";

const useUserData = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("The hook must be used within user context provider!");
  }

  return context;
};

const useGetAllTraveler = (query: TFilterQuery[] = []) => {
  return useQuery({
    queryKey: ["traveler", ...query.map(({ name, value }) => [name, value])],
    queryFn: async () => {
      return await getAllTraveler(query);
    },
  });
};
const useDeleteTraveler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["traveler"],
    mutationFn: async (id: string) => await deleteTraveler(id),
    async onSuccess(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["traveler"] });
        message.success(data?.message || "Traveler deleted successfully!");
        // router.push("/category");
      } else {
        message.error(data?.message || "Failed to delete traveler!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to delete traveler!");
    },
  });
};

export { useUserData, useGetAllTraveler, useDeleteTraveler };
