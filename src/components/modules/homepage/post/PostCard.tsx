"use client";
import { TPost } from "@/types/post";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import PushpinOutlined from "@ant-design/icons/PushpinOutlined";
import TrophyOutlined from "@ant-design/icons/TrophyOutlined";
import { Card, Image as ImageAntD, Tooltip } from "antd";
import moment from "moment";
import Link from "next/link";
import React from "react";
import PostAction from "./PostAction";
import ViewProfileAvatar from "./ViewProfileAvatar";
import DownloadPost from "./DownloadPost";
import { useGetMe } from "@/hooks/user.hook";

const PostCard = ({ post }: { post: TPost }) => {

  const { data: user, isPending: isLoadingGetMe } = useGetMe()


  return (
<div className="">
  {/* Message for non-premium users */}
  {post.isPremium  && user?.data?.user?.role !== 'admin' && user?.data?.status !== 'premium' && (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mb-4">
      <strong>Premium Content:</strong> <Link href={'/package'} className="text-primary" >Upgrade</Link> to premium to access this content.
    </div>
  )}

  <Card
    loading={isLoadingGetMe}
    key={post?._id}
    className={`shadow dark:shadow-white ${post.isPremium && '!border-2 !border-primary'} ${post.isPremium && user?.data?.user?.role !== 'admin' && user?.data?.status !== 'premium' ? 'blur pointer-events-none' : ''}`}
  >
    <Card.Meta
      title={
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm">
          <ViewProfileAvatar post={post} />

          <div className="flex justify-center items-start md:items-end flex-col gap-2">
            <p className="flex flex-wrap gap-1 items-center text-xs text-gray-500">
              <ClockCircleOutlined />
              {moment(new Date(post.createdAt)).fromNow()}
            </p>

            {post.isPremium && <span className="text-xs text-gray-500"><TrophyOutlined className="!text-primary-500" /> Premium content</span>}
          </div>
        </div>
      }
    />
    <Card.Meta
      title={
        <Link href={`/blog/${post?._id}`} className="text-primary inline-block">
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
      <DownloadPost post={post} />
    </div>
  </Card>
</div>

  );
};

export default PostCard;
