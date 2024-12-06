import Container from "@/components/ui/Container";
import React, { Suspense } from "react";
import PackageSection from "./_components/PackageSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import PackageErrorCard from "./_components/PackageErrorCard";
import Loading from "@/components/ui/Loading";

const PackagePage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-4 md:py-6">
      <Container>
        <h2 className="text-3xl md:text-4xl xl:text-6xl mb-6 md:mb-8 text-center">
          Pricing_
        </h2>
        <ErrorBoundary fallback={<PackageErrorCard />}>
          <Suspense fallback={<Loading />}>
            <PackageSection />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </div>
  );
};

export default PackagePage;
