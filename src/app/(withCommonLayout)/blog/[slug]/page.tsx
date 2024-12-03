import Container from "@/components/ui/Container";
import { getSinglePost } from "@/services/post";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { TrophyOutlined } from "@ant-design/icons";
import PostAction from "@/components/modules/homepage/post/PostAction";
import { TPost } from "@/types/post";
import { TResponse } from "@/types";
import Comments from "./_components/comments";
import ViewProfileAvatar from "@/components/modules/homepage/post/ViewProfileAvatar";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import PushpinOutlined from "@ant-design/icons/PushpinOutlined";
import { Divider } from "antd";
import PostMenu from "@/components/modules/homepage/post/PostMenu";

const BlogDetailsPage = async ({ params }: { params: { slug: string } }) => {
  // Fetch the post using the slug from the URL parameters
  const { data: post } = (await getSinglePost(
    params?.slug
  )) as TResponse<TPost>;

  // Format the post date using moment
  const formattedDate = moment(post?.createdAt).format("MMMM DD, YYYY");

  return (
    <div className="py-8 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="bg-slate-900 p-4 rounded-xl">
            {/* Title */}
            <h2 className="font-semibold text-2xl md:text-3xl">{post.title}</h2>

            {/* Author & Engagement Details */}
            <div className="flex items-center justify-between mb-8 text-gray-300 mt-6">

              <div className="flex flex-col gap-[8px]">
                <ViewProfileAvatar post={post} />
                <div className="flex gap-1 items-center text-sm text-gray-300">
                  <CalendarOutlined />
                  {formattedDate}
                </div>
              </div>
              <div className="flex items-start md:items-end justify-center flex-col flex-wrap gap-1">
                <PostMenu post={post} />
                {post.isPremium && (
                  <span className="text-sm text-gray-300">
                    <TrophyOutlined className="!text-primary-500" /> Premium
                    content
                  </span>
                )}
                <PostAction post={post} />
              </div>
            </div>

            {/* Post Banner */}
            {post?.banner && (
              <div className="relative w-full h-80 mb-8">
                <Image
                  src={post.banner}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
            )}

            <div className="flex items-center gap-3 justify-between text-gray-300">
              {/* Post Category */}
              <p className="flex gap-1 items-center text-gray-300">
                <PushpinOutlined /> {post?.category?.name}
              </p>

              {/* Post Date and Time */}
              <p className="flex gap-1 items-center">
                <ClockCircleOutlined />
                {moment(new Date(post.createdAt)).fromNow()}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div
            className="prose prose-lg prose-gray max-w-none leading-relaxed my-article"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />

          <Divider />

          {/* Footer Section */}
          <div className="mt-10 flex items-center justify-between text-gray-300">
            <div>
              {post.upvotedBy?.length} upvotes | {post?.downvotedBy?.length}{" "}
              downvotes
            </div>
          </div>

          <Divider />

          {/* Comments */}
          {post?._id && post.authorType === "Traveler" && (
            <Comments post={post} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogDetailsPage;
