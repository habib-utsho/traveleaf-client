"use client";
import { TPost } from "@/types/post";
import { Card, Image, Tooltip } from "antd";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: TPost }) => {
  return (
    <Card
      key={post?._id}
      hoverable
      cover={
        <Image
          src={post.banner}
          alt={post.title}
          width={250}
          height={250}
          className="max-w-full !mx-auto h-auto rounded-md"
        />
      }
      className="shadow dark:shadow-white"
    >
      <Card.Meta
        title={
          <Link href={`/specialty/${post?._id}`}>
            <Tooltip title={post.title}>
              <span className="line-clamp-1">{post.title}</span>
            </Tooltip>
          </Link>
        }
        description={post.category?.name}
      />
    </Card>
  );
};

export default PostCard;
