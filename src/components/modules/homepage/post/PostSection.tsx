import { getPost } from "@/services/post";
import { TPost } from "@/types/post";
import { Empty } from "antd";
import React from "react";
import PostCard from "./PostCard";

const PostSection = async () => {
  const posts = await getPost();

  return (
    <>
      {posts?.data?.length === 0 ? (
        <Empty description="No post found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {posts.data?.map((post: TPost) => {
            return <PostCard key={post?._id} post={post} />;
          })}
        </div>
      )}
    </>
  );
};

export default PostSection;
