"use client";
import Container from "@/components/ui/Container";
import Loading from "@/components/ui/Loading";
import React from "react";

const SinglePostLoading = () => {
  return (
    <div className="py-6">
      <Container>
        <Loading />
      </Container>
    </div>
  );
};

export default SinglePostLoading;
