"use client";
import { Card, Skeleton } from "antd";
import React from "react";

const PostLoadingCard = () => {
  return (
    <div className="px-4 relative flex justify-between gap-2 flex-1">
      <div className="py-4 w-4/6 mx-auto space-y-2">
        <div className="space-y-2 rounded">
          <Skeleton.Button active className="!h-[550px] !w-full" />

          <div className="flex items-center gap-4">
            <Skeleton.Button active className="!h-[40px] !w-[40px] rounded mr-4" />
            <Skeleton.Button active className="!h-[40px] !w-[40px] rounded mr-4" />
            <Skeleton.Button active className="!h-[40px] !w-[40px] rounded mr-4" />
            <Skeleton.Button active className="!h-[40px] !w-[40px] rounded mr-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLoadingCard;
