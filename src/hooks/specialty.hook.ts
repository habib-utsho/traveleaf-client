import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSpecialty } from "../services/specialty";
import { message } from "antd";

export const useCreateSpecialty = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["specialty"],
    mutationFn: async (payload: FormData) => await createSpecialty(payload),
    async onSuccess(data) {
      if (data?.success) {
        message.success(data?.message || "Specialty created successfully!");
        router.push("/specialty");
      } else {
        message.error(data?.message || "Failed to create specialty!");
      }
    },
    onError(error) {
      message.error(error?.message || "Failed to create specialty!");
    },
  });
};
