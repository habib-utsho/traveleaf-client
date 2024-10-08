"use server";

import { cookies } from "next/headers";

export const getAdminStats = async () => {
  const accessToken = cookies().get("TLaccessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["stats"],
    },
    headers: {
      Authorization: ` ${accessToken ? `Bearer ${accessToken}` : undefined}`,
    },
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stats/admin`,
    fetchOption
  );
  return response.json();
};
export const getUserStats = async () => {
  const accessToken = cookies().get("TLaccessToken")?.value;
  const fetchOption = {
    next: {
      tags: ["stats"],
    },
    headers: {
      Authorization: ` ${accessToken ? `Bearer ${accessToken}` : undefined}`,
    },
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stats/user`,
    fetchOption
  );
  return response.json();
};
