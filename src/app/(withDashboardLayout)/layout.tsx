"use client";

import React from "react";
import Sidebar from "./dashboard/_components/Sidebar";
import DashboardNavbar from "./dashboard/_components/DashboardNavbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex justify-between relative">
        <Sidebar />
        <main className="flex-1 bg-slate-50 text-black">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default layout;
