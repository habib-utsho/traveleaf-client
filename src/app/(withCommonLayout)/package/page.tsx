import Container from "@/components/ui/Container";
import React, { Suspense } from "react";
import PackageSection from "./_components/PackageSection";
import PackageLoadingCard from "./_components/PackageLoadingCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import PackageErrorCard from "./_components/PackageErrorCard";

const HealthPlansPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-4 md:py-6">
      <Container>
        <h2 className="text-3xl md:text-4xl xl:text-6xl mb-6 md:mb-8 text-center">
          Pricing_
        </h2>
        <ErrorBoundary fallback={<PackageErrorCard />}>
          <Suspense fallback={<PackageLoadingCard />}>
            <PackageSection />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </div>
  );
};

export default HealthPlansPage;
