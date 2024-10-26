import ErrorBoundary from "@/components/ErrorBoundary";
import FilteringErr from "@/components/modules/homepage/filteringSidebar/FilteringError";
import FilteringLoading from "@/components/modules/homepage/filteringSidebar/FilteringLoading";
// import FilteringSection from "@/components/modules/homepage/filteringSidebar/FilteringSection";
import PostErrorCard from "@/components/modules/homepage/post/PostErrorCard";
import PostLoadingCard from "@/components/modules/homepage/post/PostLoadingCard";
import dynamic from "next/dynamic";
// import PostSection from "@/components/modules/homepage/post/PostSection";
import React, { Suspense } from "react";

const DynamicFilteringSection = dynamic(
  () =>
    import("@/components/modules/homepage/filteringSidebar/FilteringSection"),
  { ssr: false }
);
const DynamicPostSection = dynamic(
  () => import("@/components/modules/homepage/post/PostSection"),
  { ssr: false }
);

const Homepage = ({searchParams}: {searchParams?: { [key: string]: string }}) => {
  return (
    <div className="flex gap-2 justify-between">
      <ErrorBoundary fallback={<FilteringErr />}>
        <Suspense fallback={<FilteringLoading />}>
          <DynamicFilteringSection isMobile={false} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<PostErrorCard />}>
        <Suspense fallback={<PostLoadingCard />}>
          <DynamicPostSection searchParams={searchParams}/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Homepage;
