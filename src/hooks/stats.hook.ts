import { getAdminStats, getUserStats } from "@/services/stats.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAdminStats = () => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      return await getAdminStats();
    },
  });
};
export const useGetUserStats = () => {
  // const router = useRouter();
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      return await getUserStats();
    },
  });
};
