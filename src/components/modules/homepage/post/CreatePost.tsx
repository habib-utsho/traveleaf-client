import { Avatar } from "antd";
import React from "react";
import CreatePostModal from "./CreatePostModal";
import { TCategory } from "@/types/category";

const CreatePost = ({ categories }: { categories: TCategory[] }) => {
  return (
    <div className="mx-auto w-full ">
      <div className="flex items-center gap-1 border bg-slate-100 rounded p-4">
        <Avatar
          size="large"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          className="cursor-pointer"
        />
        <CreatePostModal categories={categories} />
      </div>
    </div>
  );
};

export default CreatePost;
