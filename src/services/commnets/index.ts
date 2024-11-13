"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TFilterQuery } from "@/types";
import { TComment, TCreateComment } from "@/types/commnet";
import { revalidateTag } from "next/cache";

export const createCommnet = async (payload: TCreateComment) => {
  try {
    const response = await axiosInstance.post(`/comment`, payload);

    revalidateTag("comment");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to create comment!"
    );
  }
};

export const getAllComment = async (query: TFilterQuery[] | undefined) => {
  const fetchOption = {
    next: {
      tags: ["comment"],
    },
  };

  const params = new URLSearchParams();

  if (query) {
    query.forEach((element: TFilterQuery) => {
      params.append(element.name, element.value);
    });
  }

  // console.log(query, "query from comment service");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment?${params.toString()}`,
    fetchOption
  );
  return response.json();
};

export const getSingleComment = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["comment"],
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${id}`,
    fetchOption
  );
  return response.json();
};

export const deleteComment = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/comment/${id}`);
    revalidateTag("comment");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to delete comment!"
    );
  }
};
export const updateComment = async (payload: Partial<TComment>) => {
  try {
    const response = await axiosInstance.patch(
      `/comment/${payload._id}`,
      payload
    );
    revalidateTag("comment");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to update comment!"
    );
  }
};
