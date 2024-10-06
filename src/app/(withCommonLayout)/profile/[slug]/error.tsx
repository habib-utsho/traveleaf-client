"use client";
import Container from "@/components/ui/Container";
import { WarningOutlined } from "@ant-design/icons";
import React from "react";

const error = () => {
  return (
    <div className="py-8">
      <Container className="bg-gray-50 rounded flex items-center justify-center h-[200px]">
        <p className="text-red-500">
          <WarningOutlined /> Something went wrong. Please try again later.
        </p>
      </Container>
    </div>
  );
};

export default error;
