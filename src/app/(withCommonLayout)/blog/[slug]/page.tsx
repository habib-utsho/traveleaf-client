import Container from "@/components/ui/Container";
import { getSinglePost } from "@/services/post";
import Image from "next/image";
import React from "react";
import moment from "moment";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import PostAction from "@/components/modules/homepage/post/PostAction";
import { TPost } from "@/types/post";
import { TResponse } from "@/types";
import Comments from "./_components/comments";

const BlogDetailsPage = async ({ params }: { params: { slug: string } }) => {
  // Fetch the post using the slug from the URL parameters
  const { data: post } = await getSinglePost(params?.slug) as TResponse<TPost>;

  // Format the post date using moment
  const formattedDate = moment(post?.createdAt).format("MMMM DD, YYYY");

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Title */}
          <h2 className="font-semibold text-2xl md:text-3xl">{post.title}</h2>

          {/* Author & Engagement Details */}
          <div className="flex items-center justify-between mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              {post?.author?.profileImg && (
                <Image
                  src={post.author.profileImg}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{post?.author?.name}</span>
                <div className="flex gap-1 items-center">
                  <CalendarOutlined />
                  {formattedDate}
                </div>
              </div>
            </div>

          <PostAction post={post}/>
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

          <div className="flex items-center gap-3 justify-between text-gray-600">
            {/* Post Category */}
            <p className="flex gap-1 items-center text-gray-600">
              <PushpinOutlined /> {post?.category?.name}
            </p>

            {/* Post Date and Time */}
            <p className="flex gap-1 items-center">
              <ClockCircleOutlined />
              {moment(new Date(post.createdAt)).fromNow()}
            </p>
          </div>

          {/* Post Content */}
          <div
            className="prose prose-lg prose-gray max-w-none leading-relaxed my-article"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />

          <Divider />

          {/* Footer Section */}
          <div className="mt-10 flex items-center justify-between text-gray-600">
            <div>
              {post.upvotedBy?.length} upvotes | {post?.downvotedBy?.length} downvotes
            </div>
          </div>

        <Divider/>


        {/* Comments */}
        {post?._id && <Comments post={post}/>}



        </div>
      </Container>
    </div>
  );
};

export default BlogDetailsPage;
