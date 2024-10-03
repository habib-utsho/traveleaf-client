"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TCategory } from "@/types/category";
import delay from "@/utils/delay";
import { revalidateTag } from "next/cache";

export const getCategory = async () => {
  const fetchOption = {
    next: {
      tags: ["category"],
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
    fetchOption
  );
  return response.json();
};

export const createCategory = async (payload: TCategory) => {
  try {
    const response = await axiosInstance.post(`/category`, payload);
    revalidateTag("category");
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to create category!"
    );
  }
};
