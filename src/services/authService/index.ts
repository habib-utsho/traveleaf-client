"use server";

import axiosInstance from "@/lib/axiosInstance";
import { TSignin, TTraveler } from "@/types/user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const registerTraveler = async (payload: TTraveler) => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  // Append image file if present
  //   if (fileList.length > 0 && fileList[0]?.originFileObj) {
  //     console.log(fileList[0].originFileObj, "fileList[0].originFileObj");
  //     formData.append("file", fileList[0].originFileObj);
  //   }
  try {
    const response = await axiosInstance.post(
      `/user/create-traveler`,
      formData
    );
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

const getCurrentUser = async () => {
  const accessToken = cookies().get("TLaccessToken")?.value;
  let decodedToken = null;
  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      _id: decodedToken?._id,
      email: decodedToken?.email,
      role: decodedToken?.role,
    };
  }
  return decodedToken;
};

export {
  registerTraveler as registerPatient,
  signinUser,
  getCurrentUser,
  signOut,
};
