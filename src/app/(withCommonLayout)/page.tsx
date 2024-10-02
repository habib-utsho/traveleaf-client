import PostSection from "@/components/modules/homepage/post/PostSection";
import Container from "@/components/ui/Container";
import React from "react";

const page = async () => {
  return (
    <div className="py-8">
      <Container>
        <PostSection />
      </Container>
    </div>
  );
};

export default page;
