import ErrorBoundary from "@/components/ErrorBoundary";
import FilteringErr from "@/components/modules/homepage/filteringSidebar/FilteringError";
import FilteringLoading from "@/components/modules/homepage/filteringSidebar/FilteringLoading";
import FilteringSection from "@/components/modules/homepage/filteringSidebar/FilteringSection";
import PostErrorCard from "@/components/modules/homepage/post/PostErrorCard";
import PostLoadingCard from "@/components/modules/homepage/post/PostLoadingCard";
import PostSection from "@/components/modules/homepage/post/PostSection";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <div className="flex gap-2 justify-between">
      <ErrorBoundary fallback={<FilteringErr />}>
        <Suspense fallback={<FilteringLoading />}>
          <FilteringSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<PostErrorCard />}>
        <Suspense fallback={<PostLoadingCard />}>
          <PostSection />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default page;
