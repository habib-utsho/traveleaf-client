import { useMutation } from "@tanstack/react-query";
import { TDecodedUser, TTraveler, TSignin } from "../types/user";
import {
  getCurrentUser,
  registerPatient,
  signinUser,
} from "../services/authService";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useUserData } from "./user.hook";

export const useUserSignin = ({ redirect }: { redirect: string | null }) => {
  const router = useRouter();
  const { setUser } = useUserData();
  return useMutation({
    mutationKey: ["signinUser"],
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
    mutationKey: ["registerPatient"],
    mutationFn: async (payload: TTraveler) => await registerPatient(payload),
    onSuccess(data) {
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
