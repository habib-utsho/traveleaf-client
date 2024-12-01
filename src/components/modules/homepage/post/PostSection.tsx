import { getAllPost } from "@/services/post";
import { Empty } from "antd";
import React from "react";
import CreatePost from "./CreatePost";
import InfinitePost from "./InfinitePost";

type TProps = {
  pagination?: { limit: number; page: number };
  category?: string | null;
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string };
};

const PostSection = async ({ searchParams }: TProps) => {
  // Use the appropriate sorting value based on the sort parameter

  // Prepare the filters based on search params
  const filters = [
    { name: "isDeleted", value: false },
    ...(searchParams?.category
      ? [{ name: "category", value: searchParams.category }]
      : []),
    ...(searchParams?.search
      ? [{ name: "searchTerm", value: searchParams.search }]
      : []),
    ...(searchParams?.sort
      ? [{ name: "sort", value: searchParams?.sort }]
      : []), // Always include sort
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
            <InfinitePost filters={filters} initialPostsRes={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostSection;
