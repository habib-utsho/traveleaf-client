import { getAllPost } from "@/services/post";
import { TPost } from "@/types/post";
import { Empty } from "antd";
import React from "react";
import PostCard from "./PostCard";
import { getAllCategory } from "@/services/category";
import CreatePost from "./CreatePost";

const PostSection = async () => {
  const posts = await getAllPost(undefined);
  const categories = await getAllCategory();

  return (
    <div className="w-3/6 mx-auto">
      <div className="px-4 py-4 relative flex flex-col gap-8 flex-1">
        <CreatePost categories={categories?.data} />

        <div className="">
          {posts?.data?.length === 0 ? (
            <Empty description="No post found" />
          ) : (
            <div className="space-y-8 gap-5">
              {posts.data?.map((post: TPost) => {
                return <PostCard key={post?._id} post={post} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSection;
