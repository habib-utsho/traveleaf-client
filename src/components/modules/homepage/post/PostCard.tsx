"use client";
import { ShareIcon } from "@/components/ui/icons";
import { TPost } from "@/types/post";
import ArrowDownOutlined from "@ant-design/icons/ArrowDownOutlined";
import ArrowUpOutlined from "@ant-design/icons/ArrowUpOutlined";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import CommentOutlined from "@ant-design/icons/CommentOutlined";
import PushpinOutlined from "@ant-design/icons/PushpinOutlined";
import TrophyOutlined from "@ant-design/icons/TrophyOutlined";
import { Card, Image as ImageAntD, Tooltip } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import DownloadPost from "./DownloadPost";

const PostCard = ({ post }: { post: TPost }) => {
  const router = useRouter();

  return (
    <Card key={post?._id} className="shadow dark:shadow-white">
      <Card.Meta
        title={
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <Tooltip
              title={
                post?.authorType === "Traveler"
                  ? "Click to view profile"
                  : post?.authorType === "Admin"
                  ? "Admin - No profile view available"
                  : ""
              }
            >
              <div
                onClick={() =>
                  post?.authorType === "Traveler" &&
                  router.push(`/profile/${post?.author?._id}`)
                }
                className={`flex items-center gap-2 flex-wrap text-primary ${
                  post?.authorType === "Admin" ? "" : "cursor-pointer"
                }`}
              >
                <Image
                  src={post.author?.profileImg}
                  alt={post.author?.name}
                  className="rounded-full"
                  width={30}
                  height={30}
                />
                <div className="flex gap-[2px] flex-col p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition duration-200">
                  <span className="font-semibold text-primary">
                    {post.author?.name}
                  </span>
                  {post.authorType === "Admin" && (
                    <span className="flex gap-1 items-center font-semibold text-warning">
                      <TrophyOutlined />
                      {post.authorType}
                    </span>
                  )}
                </div>
              </div>
            </Tooltip>

            <p className="flex flex-wrap gap-1 items-center">
              <ClockCircleOutlined />
              {moment(new Date(post.createdAt)).fromNow()}
            </p>
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
        <div className="flex gap-6 flex-wrap">
          <div className="inline-flex items-center gap-1 bg-gray-400 text-md font-bold rounded-3xl px-2 py-[3px] text-white cursor-pointer">
            <span>
              <ArrowUpOutlined className="text-lg" />
            </span>
            <span>500</span>
            <span>
              <ArrowDownOutlined className="text-lg" />
            </span>
          </div>

          <span className="flex items-center gap-1 cursor-pointer">
            <CommentOutlined className="text-lg" /> 500
          </span>
          <span className="flex items-center cursor-pointer">
            <ShareIcon />
          </span>
        </div>

        <DownloadPost post={post} />
      </div>
    </Card>
  );
};

export default PostCard;
