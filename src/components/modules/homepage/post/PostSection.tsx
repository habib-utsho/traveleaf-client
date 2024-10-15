import { getAllPost } from "@/services/post";
import { TPost } from "@/types/post";
import { Empty } from "antd";
import React from "react";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

type TProps = {
  pagination?: { limit: number; page: number };
  category?: string | null;
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string };
}
const PostSection = async ({ pagination, category, params, searchParams }: TProps) => {
  const posts = await getAllPost([
    { name: "isDeleted", value: false },
    ...(searchParams?.category ? [{ name: "category", value: searchParams.category }] : []),

  ]);




  return (
    <div className="w-full md:w-3/6 mx-auto">
      <div className="px-4 py-4 relative flex flex-col gap-8 flex-1">
        <CreatePost />

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
