"use server";
import { TFilterQuery } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const getAllTraveler = async (query: TFilterQuery[] = []) => {
  const params = new URLSearchParams();

  query.forEach(({ name, value }) => {
    params.append(name, value);
  });

  const accessToken = cookies().get("TLaccessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["traveler"],
    },
    headers: {
      Authorization: ` ${accessToken ? `Bearer ${accessToken}` : undefined}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/traveler?${params.toString()}`,
    fetchOption
  );
  return response.json();
};
const deleteTraveler = async (id: string) => {
  const accessToken = cookies().get("TLaccessToken")?.value;
  const fetchOption = {
    method: "DELETE",
    headers: {
      Authorization: ` ${accessToken ? `Bearer ${accessToken}` : undefined}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/traveler/${id}`,
    fetchOption
  );
  revalidateTag("traveler");
  return response.json();
};

export { getAllTraveler, deleteTraveler };
