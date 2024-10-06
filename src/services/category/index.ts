"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TFilterQuery } from "@/types";
import { TCategory } from "@/types/category";
import { revalidateTag } from "next/cache";

export const getAllCategory = async (query: TFilterQuery[] = []) => {
  const params = new URLSearchParams();

  query.forEach(({ name, value }) => {
    params.append(name, value);
  });
  const fetchOption = {
    next: {
      tags: ["category"],
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category?${params.toString()}`,
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
export const updateCategory = async (payload: TCategory) => {
  try {
    const response = await axiosInstance.patch(
      `/category/${payload?._id}`,
      payload
    );
    revalidateTag("category");
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to update category!"
    );
  }
};
export const deleteCategory = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/category/${id}`);
    revalidateTag("category");
    return response.data;
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to delete category!"
    );
  }
};
