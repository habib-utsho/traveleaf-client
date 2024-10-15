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
};

const PostSection = async ({ searchParams }: TProps) => {
  // Use the appropriate sorting value based on the sort parameter
  const sortValue = searchParams?.sort === 'votes' ? 'votes' : '-votes'; // Handle both cases

  // Prepare the filters based on search params
  const filters = [
    { name: "isDeleted", value: false },
    ...(searchParams?.category ? [{ name: "category", value: searchParams.category }] : []),
    ...(searchParams?.search ? [{ name: "searchTerm", value: searchParams.search }] : []),
    { name: "sort", value: sortValue }, // Always include sort
  ];

  // Fetch posts based on filters
  const posts = await getAllPost(filters);

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
