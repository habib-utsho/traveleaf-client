"use client";
import { ShareIcon } from "@/components/ui/icons";
import { TPost } from "@/types/post";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DownloadOutlined,
  PushpinOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Card, Image as ImageAntD, message, Tooltip } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PostCard = ({ post }: { post: TPost }) => {
  const router = useRouter();

  // Type the ref correctly to HTMLDivElement or null
  const printContentRef = useRef<HTMLDivElement | null>(null);

  // Set up the print handler using the correct content reference
  const handlePrint = useReactToPrint({
    content: () => {
      // Check if the printContentRef is set correctly
      if (printContentRef.current) {
        return printContentRef.current;
      } else {
        message.error("printContentRef is null. Unable to print.");
        return null;
      }
    },
    documentTitle: `post-${post?._id}`, // Optional: Document title during print
    removeAfterPrint: false, // Optional: Keep content after printing
  });

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
        <span
          className="flex items-center cursor-pointer text-gray-700"
          onClick={() => handlePrint()}
        >
          <DownloadOutlined />
        </span>
      </div>

      {/* Printable content */}
      <Card ref={printContentRef} id="printContent" className="p-6">
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <Image
              src={post.author.profileImg}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {post.author.name}
              </p>
              <p className="text-sm text-gray-500">
                {moment(new Date(post.createdAt)).format("MMMM Do, YYYY")}
              </p>
              <p className="text-md text-blue-600">
                Category: {post.category.name}
              </p>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="my-6">
          <Image
            src={post.banner}
            alt={post.title}
            width={800}
            height={400}
            className="w-full rounded-lg object-cover"
          />
        </div>

        {/* Post Content */}
        <div
          className="text-md text-justify leading-8 text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Footer Section */}
        <div className="mt-8 pt-4 border-t border-gray-300">
          <h3 className="font-bold text-lg text-gray-800">About the Author</h3>
          <p className="text-md text-gray-600">{post.author.bio}</p>
        </div>
      </Card>
    </Card>
  );
};

export default PostCard;
