import { useMutation, useQuery } from "@tanstack/react-query";
import { TDecodedUser, TSignin, TPasswordUpdate } from "../types/user";
import {
  changePassword,
  getCurrentUser,
  getMe,
  registerTraveler,
  signinUser,
  signOut,
} from "../services/authService";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useUserData } from "./user.hook";

export const useUserSignin = ({ redirect }: { redirect: string | null }) => {
  const router = useRouter();
  const { setUser } = useUserData();
  return useMutation({
    mutationKey: ["traveler"],
    mutationFn: async (payload: TSignin) => await signinUser(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "User signin successfully!");
        router.push(redirect || "/");
        const user = (await getCurrentUser()) as TDecodedUser;
        setUser(user);
      } else {
        message.error(data?.message || "Failed to signin user!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to signin user!");
    },
  });
};

export const useUserRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["traveler"],
    mutationFn: async (payload: FormData) => await registerTraveler(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "User registered successfully!");
        router.push("/signin");
      } else {
        message.error(data?.message || "Failed to register user!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to register user!");
    },
  });
};

export const useChangePassword = () => {
  const router = useRouter();
  return useMutation({
    // mutationKey: [""],
    mutationFn: async (payload: TPasswordUpdate) =>
      await changePassword(payload),
    onSuccess(data) {
      if (data?.success) {
        signOut();
        message.success(data?.message || "Password updated successfully!");
        router.push("/signin");
      } else {
        message.error(data?.message || "Failed to change password!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to change password!");
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: [""],
    queryFn: async () => {
      return await getMe();
    },
  });
};
