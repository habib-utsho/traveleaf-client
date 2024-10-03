"use client";
import { ShareIcon } from "@/components/ui/icons";
import { TPost } from "@/types/post";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Card, Image as ImageAntD, Tooltip } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }: { post: TPost }) => {
  return (
    <Card key={post?._id} className="shadow dark:shadow-white">
      <Card.Meta
        title={
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
            <div>
              <Link
                href={`/profile/${post?.author?._id}`}
                className="flex items-center gap-2 flex-wrap text-primary"
              >
                <Image
                  src={post.author?.profileImg}
                  alt={post.author?.name}
                  className="rounded-full"
                  width={30}
                  height={30}
                />
                <span>{post.author?.name}</span>
              </Link>
            </div>
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
            href={`/specialty/${post?._id}`}
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

      <div className="mt-4 flex gap-6 flex-wrap">
        <div className="inline-flex items-center gap-1 bg-gray-400 text-md font-bold rounded-3xl px-2 py-[3px] text-white">
          <span>
            <ArrowUpOutlined className="text-lg" />
          </span>
          <span>500</span>
          <span>
            <ArrowDownOutlined className="text-lg" />
          </span>
        </div>

        <span className="flex items-center gap-1">
          <CommentOutlined className="text-lg" /> 500
        </span>
        <span className="flex items-center">
          <ShareIcon />
        </span>
      </div>
    </Card>
  );
};

export default PostCard;
