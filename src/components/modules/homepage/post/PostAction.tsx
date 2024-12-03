"use client";
import { ShareIcon } from "@/components/ui/icons";
import { useGetAllComment } from "@/hooks/comment.hook";
import { useDownvotedPost, useUpvotePost } from "@/hooks/post.hook";
import { useGetMe } from "@/hooks/user.hook";
import { TResponse } from "@/types";
import { TComment } from "@/types/commnet";
import { TPost } from "@/types/post";
import { TTraveler } from "@/types/user";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu, message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { PiArrowDownFill, PiArrowUpFill } from "react-icons/pi";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const PostAction = ({ post }: { post: TPost }) => {
  const { mutate: upvotePostMutate, isPending: isLoadingUpvote } =
    useUpvotePost();
  const { mutate: downvotePostMutate, isPending: isLoadingDownvote } =
    useDownvotedPost();
  const { data: userRes, isLoading: isLoadingUser } = useGetMe();
  const { data: commentsRes, isPending: isLoadingComments } = useGetAllComment([
    { name: "post", value: post._id },
  ]);
  const router = useRouter();

  const user = userRes as TResponse<TTraveler>;
  const comments = commentsRes as TResponse<TComment[]>;

  const handleUpvote = (postId: string) => {
    if (!user?.data) {
      message.error("You've to signin first!");
      router.push("/signin");
      return;
    }
    upvotePostMutate(postId);
  };
  const handleDownvote = (postId: string) => {
    if (!user?.data) {
      message.error("You've to signin first!");
      router.push("/signin");
      return;
    }
    downvotePostMutate(postId);
  };

  const shareUrl = `https://traveleaf.vercel.app/blog/${post._id}`;

  const shareMenu = (
    <Menu>
      <div className="Demo__some-network">
        <FacebookShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        <div>
          <FacebookShareCount
            url={shareUrl}
            className="Demo__some-network__share-count"
          >
            {(count) => count}
          </FacebookShareCount>
        </div>
      </div>

      <div className="Demo__some-network">
        <FacebookMessengerShareButton
          url={shareUrl}
          appId="521270401588372"
          className="Demo__some-network__share-button"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div className="Demo__some-network">
        <TwitterShareButton
          url={shareUrl}
          title={post.title}
          className="Demo__some-network__share-button"
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          url={shareUrl}
          title={post.title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          url={shareUrl}
          title={post.title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </Menu>
  );

  // console.log({
  //   isLoadingComments,
  //   isLoadingUser,
  //   isLoadingDownvote,
  //   isLoadingUpvote,
  //   post,
  //   user,
  //   comments,
  // });

  // console.log({ isLoadingComments, isLoadingUser });
  if (isLoadingComments || isLoadingUser)
    return <Skeleton.Button active className="!h-[30px] !w-[180px]" />;

  const isAlreadyUpvote = post.upvotedBy.find(
    (upvoteUser) => upvoteUser?._id === user?.data?._id
  );
  const isAlreadyDownvote = post.downvotedBy.find(
    (downvotedUser) => downvotedUser?._id === user?.data?._id
  );

  return (
    <div className="flex gap-4 flex-wrap">
      {(post.authorType === "Traveler" || !isLoadingUser) && (
        <div
          className={`inline-flex items-center gap-2 ${
            isAlreadyUpvote
              ? "bg-primary"
              : isAlreadyDownvote
              ? "bg-danger/30"
              : "bg-gray-800"
          }  text-md font-bold rounded-3xl px-2 py-[3px] text-white cursor-default`}
        >
          <span
            className={`cursor-pointer ${
              isLoadingUpvote && "pointer-events-none opacity-70"
            } ${isAlreadyUpvote ? "text-white" : "text-gray-200"}`}
            onClick={() => handleUpvote(post._id)}
          >
            {isAlreadyUpvote ? (
              <PiArrowUpFill className="!text-lg" />
            ) : (
              <ArrowUpOutlined className="!text-lg" />
            )}
          </span>
          <span>{post.votes}</span>
          <span
            className={`cursor-pointer ${
              isLoadingDownvote && "pointer-events-none opacity-70"
            } ${isAlreadyDownvote ? "text-white" : "text-gray-200"}`}
            onClick={() => handleDownvote(post._id)}
          >
            {isAlreadyDownvote ? (
              <PiArrowDownFill className="!text-lg" />
            ) : (
              <ArrowDownOutlined className="!text-lg" />
            )}
          </span>
        </div>
      )}

      {post.authorType === "Traveler" && (
        <span
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => router.push(`/blog/${post._id}#comments`)}
        >
          <CommentOutlined className="text-lg !text-white" />{" "}
          {comments?.data?.length || 0}
        </span>
      )}

      <Dropdown overlay={shareMenu} trigger={["click"]} className="">
        <span className="flex items-center cursor-pointer !text-sm mt-1 ">
          <ShareIcon fill="white" />
        </span>
      </Dropdown>
    </div>
  );
};

export default PostAction;
