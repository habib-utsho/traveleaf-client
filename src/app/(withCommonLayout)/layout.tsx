import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/navbar";
import React from "react";

const Layout = ({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string };
}) => {
  return (
    <>
      <Navbar searchParams={searchParams} />
      <main
        className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
