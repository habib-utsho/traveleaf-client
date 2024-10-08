"use server";
import axiosInstance from "@/lib/axiosInstance";
import { TFilterQuery } from "@/types";
import { TSubscription } from "@/types/subscription";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createSubscription = async (payload: TSubscription) => {
  try {
    const response = await axiosInstance.post(`/subscription`, payload);
    revalidateTag("subscription");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(
      e.response?.data?.message || e.message || "Failed to subscribe!"
    );
  }
};

export const getAllSubscription = async (query: TFilterQuery[] = []) => {
  const params = new URLSearchParams();
  const accessToken = cookies().get("TLaccessToken")?.value;

  query.forEach(({ name, value }) => {
    params.append(name, value);
  });
  const fetchOption = {
    next: {
      tags: ["subscription"],
    },
    headers: {
      Authorization: ` ${accessToken ? `Bearer ${accessToken}` : undefined}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/subscription?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
