"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TFilterQuery } from "@/types";
import { TPackage } from "@/types/package";
import { revalidateTag } from "next/cache";

// Create a subscription package
export const createPackage = async (payload: TPackage) => {
  try {
    const response = await axiosInstance.post(`/package`, payload);
    revalidateTag("package");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to create package!"
    );
  }
};

// Get all subscription packages with optional filters
export const getAllPackages = async (query: TFilterQuery[] = []) => {
  const params = new URLSearchParams();

  query.forEach(({ name, value }) => {
    params.append(name, value);
  });

  const fetchOption = {
    next: {
      tags: ["package"],
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/package?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
// Get single package
export const getSinglePackage = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["package"],
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/package/${id}`,
    fetchOption
  );
  return response.json();
};

// Update a subscription package
export const updatePackage = async (payload: TPackage) => {
  try {
    const response = await axiosInstance.patch(
      `/package/${payload?._id}`,
      payload
    );
    revalidateTag("package");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to update package!"
    );
  }
};

// Delete a subscription package
export const deletePackage = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/package/${id}`);
    revalidateTag("package");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to delete package!"
    );
  }
};
