import { useContext } from "react";
import { UserContext } from "../context/user.provider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTraveler,
  getAllTraveler,
  updateAdmin,
  updateTraveler,
} from "@/services/user";
import { TFilterQuery } from "@/types";
import { message } from "antd";
import { getAdminById, getTravelerById } from "@/services/authService";

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
const useGetTravelerById = (id: string) => {
  return useQuery({
    queryKey: ["traveler"],
    queryFn: async () => {
      return await getTravelerById(id);
    },
  });
};
const useGetAdminById = (id: string) => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      return await getAdminById(id);
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
const useUpdateTraveler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["traveler"],
    mutationFn: async (payload: { _id: string; formData: FormData }) =>
      await updateTraveler(payload._id, payload.formData),
    async onSuccess(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["traveler"] });
        message.success(data?.message || "Traveler updated successfully!");
      } else {
        message.error(data?.message || "Failed to update traveler!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to update traveler!");
    },
  });
};
const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["admin"],
    mutationFn: async (payload: { _id: string; formData: FormData }) =>
      await updateAdmin(payload._id, payload.formData),
    async onSuccess(data) {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["admin"] });
        message.success(data?.message || "Admin updated successfully!");
      } else {
        message.error(data?.message || "Failed to update admin!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to update admin!");
    },
  });
};

export {
  useUserData,
  useGetAllTraveler,
  useGetTravelerById,
  useGetAdminById,
  useDeleteTraveler,
  useUpdateTraveler,
  useUpdateAdmin,
};
