"use client";
import { Skeleton } from "antd";
import React from "react";

const FilteringLoading = () => {
  return (
    <div className="h-screen sticky left-0 top-0  border-r border-primary w-[200px] px-2 pt-4">
      <Skeleton.Button className="!w-full !h-full !bg-red-500" active />
    </div>
  );
};

export default FilteringLoading;
