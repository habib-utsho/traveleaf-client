import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">{children}</main>
      <Footer />
    </>
  );
};

export default layout;
