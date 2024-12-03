"use client";
import { Avatar } from "antd";
import React from "react";
// import CreatePostModal from "./CreatePostModal";
import { useUserData } from "@/hooks/user.hook";
import dynamic from "next/dynamic";

const CreatePostModal = dynamic(() => import("./CreatePostModal"), {
  ssr: false,
});

const CreatePost = () => {
  const { user } = useUserData();
  return (
    <div className="mx-auto w-full ">
      <div className="flex items-center gap-1 border border-slate-800 bg-transparent rounded p-4">
        <Avatar
          size="large"
          src={
            user?.profileImg ||
            "https://i.pravatar.cc/150?u=a04258a2462d826712d"
          }
          className="cursor-pointer "
        />
        <CreatePostModal />
      </div>
    </div>
  );
};

export default CreatePost;
