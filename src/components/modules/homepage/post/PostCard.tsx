"use client";
import { TPost } from "@/types/post";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  PushpinOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Card, Image as ImageAntD, Tooltip } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import PostAction from "./PostAction";
import ViewProfileAvatar from "./ViewProfileAvatar";

const PostCard = ({ post }: { post: TPost }) => {


  const router = useRouter();


  return (
    <Card key={post?._id} className={`shadow dark:shadow-white  ${post.isPremium && '!border-2 !border-primary'}`}>
      <Card.Meta
        title={
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm">
            <ViewProfileAvatar post={post}/>

    <div className="flex justify-center items-start md:items-end flex-col gap-2">
    <p className="flex flex-wrap gap-1 items-center text-xs text-gray-500">
              <ClockCircleOutlined />
              {moment(new Date(post.createdAt)).fromNow()}
            </p>

            {post.isPremium && <span className="text-xs text-gray-500"><TrophyOutlined className="!text-primary-500"/> Premium content</span>}
    </div>

          </div>
        }
      />
      <Card.Meta
        title={
          <Link
            href={`/blog/${post?._id}`}
            className="text-primary inline-block"
            >
            <Tooltip title={post.title}>
              <span className="line-clamp-1">{post.title}</span>
            </Tooltip>
          </Link>
        }
        description={
          <p>
            <PushpinOutlined />
            {post.category?.name}
          </p>
        }
      />
      <div className="my-4">
        <ImageAntD
          src={post.banner}
          alt={post.title}
          width={"100%"}
          height={500}
          className="rounded-md object-cover"
        />
      </div>

      <div className="flex gap-2 justify-between items-center">

        {/* Upvote and downvote */}
        <PostAction post={post} />

        <span className="flex items-center cursor-pointer text-gray-700">
          <DownloadOutlined />
        </span>
      </div>
    </Card>
  );
};

export default PostCard;
