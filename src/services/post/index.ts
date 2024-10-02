"use server";

import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";

export const getPost = async () => {
  const fetchOption = {
    next: {
      tags: ["post"],
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post`,
    fetchOption
  );
  return response.json();
};

export const createPost = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/post`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    revalidateTag("post");
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to create post!"
    );
  }
};
