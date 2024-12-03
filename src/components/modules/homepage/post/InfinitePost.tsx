"use client";
import React, { useCallback, useEffect, useState } from "react";
import PostCard from "./PostCard";
import { TPost } from "@/types/post";
import { TFilterQuery, TResponse } from "@/types";
import { getAllPost } from "@/services/post";
import { useInView } from "react-intersection-observer";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

interface TInfinitePostProps {
  initialPostsRes: TResponse<TPost[]>;
  filters: TFilterQuery[];
}

const InfinitePost = ({ initialPostsRes, filters }: TInfinitePostProps) => {
  const [posts, setPosts] = useState<TPost[]>(initialPostsRes?.data);
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(10);

  const { ref, inView } = useInView();

  const loadMorePosts = useCallback(async () => {
    const postRes = await getAllPost([
      ...filters,
      { name: "limit", value: limit },
      { name: "page", value: page },
    ]);
    setPosts((posts) => [...posts, ...postRes?.data]);
    setLimit((limit) => limit + 10);
    setPage((page) => page + 1);
  }, [filters, limit, page]);

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView, loadMorePosts]);

  useEffect(() => {
    setPosts(initialPostsRes?.data);
  }, [initialPostsRes]);

  return (
    <div>
      <div className="space-y-8 gap-5">
        {posts?.map((post: TPost) => {
          return <PostCard key={post._id} post={post} />;
        })}
        {/* {posts?.length<h2></h2>} */}
        {posts?.length === initialPostsRes?.meta?.total && (
          <h2 className="text-center font-semibold text-primary-500">
            You reached all posts
          </h2>
        )}
        {posts?.length !== initialPostsRes?.meta?.total && (
          <div
            ref={ref}
            className="text-center flex items-center justify-center gap-2 animate-pulse"
          >
            {" "}
            <Image src={logo} height={40} width={40} alt="logo" />
            <h2>Loading..</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfinitePost;
