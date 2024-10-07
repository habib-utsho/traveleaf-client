"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TPasswordUpdate, TSignin } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const registerTraveler = async (payload: FormData) => {
  try {
    const response = await axiosInstance.post(`/user/create-traveler`, payload);
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || e.message);
  }
};

const signinUser = async (payload: TSignin) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, payload);
    if (response.data?.success) {
      cookies().set("TLaccessToken", response?.data?.data?.accessToken);
      cookies().set("TLrefreshToken", response?.data?.data?.refreshToken);
    }
    return response.data;
  } catch (e: any) {
    console.error(e.response?.data?.message || e.message, "error");
    throw new Error(e.response?.data?.message || e.message);
  }
};

const signOut = () => {
  cookies().delete("TLaccessToken");
  cookies().delete("TLrefreshToken");
};

const changePassword = async (payload: TPasswordUpdate) => {
  try {
    const response = await axiosInstance.patch(
      `/auth/change-password`,
      payload
    );
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || e.message);
  }
};

const getCurrentUser = async () => {
  const accessToken = cookies().get("TLaccessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      ...decodedToken,
    };
  }
  return decodedToken;
};

const getMe = async () => {
  try {
    const response = await axiosInstance.get(`/user/me`);
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || e.message);
  }
};

const getTravelerById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/traveler/${id}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || e.message);
  }
};
const getAdminById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/admin/${id}`);
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.message || e.message);
  }
};

export {
  registerTraveler,
  signinUser,
  getCurrentUser,
  getTravelerById,
  getAdminById,
  signOut,
  changePassword,
  getMe,
};
