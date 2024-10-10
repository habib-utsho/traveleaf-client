"use client";
import { TPost } from "@/types/post";
import { Card, Image, message } from "antd";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import { DownloadIcon } from "@/components/ui/icons";

const DownloadPost = ({ post }: { post: TPost }) => {
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
    <div>
      <span
        className="flex items-center cursor-pointer text-gray-700 text-xl"
        onClick={() => handlePrint()}
      >
        <DownloadIcon />
      </span>
      {/* Printable content */}
      <div ref={printContentRef}>
        <Card id="printContent" className="p-6">
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
          {"bio" in post.author ? (
            <div className="mt-8 pt-4 border-t border-gray-300">
              <h3 className="font-bold text-lg text-gray-800">
                About the Author
              </h3>
              <p className="text-md text-gray-600">{post.author.bio}</p>
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
    </div>
  );
};

export default DownloadPost;
