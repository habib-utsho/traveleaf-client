"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TFilterQuery } from "@/types";
import { revalidateTag } from "next/cache";

export const createPost = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/post`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("post");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to create post!"
    );
  }
};

export const getAllPost = async (query: TFilterQuery[] | undefined) => {
  const fetchOption = {
    next: {
      tags: ["post"],
    },
  };
  const params = new URLSearchParams();

  if (query) {
    query.forEach((element: TFilterQuery) => {
      params.append(element.name, element.value);
    });
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
export const getSinglePost = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["post"],
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/${id}`,
    fetchOption
  );
  return response.json();
};

export const deletePost = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/post/${id}`);
    revalidateTag("post");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to delete post!"
    );
  }
};
