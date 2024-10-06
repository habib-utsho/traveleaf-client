"use client";
import Container from "@/components/ui/Container";
import React from "react";

const error = () => {
  return (
    <div className="py-8">
      <Container>
        <p className="text-red-500">
          Something went wrong. Please try again later.
        </p>
      </Container>
    </div>
  );
};

export default error;
