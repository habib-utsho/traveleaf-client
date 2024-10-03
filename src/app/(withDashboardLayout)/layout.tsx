"use client";

import React from "react";
import Sidebar from "./dashboard/_components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex justify-between relative">
        <Sidebar />
        <main className="flex-1">
          <h2 className="bg-primary-200 py-2">Dashboard navbar</h2>
          {children}
        </main>
      </div>
    </>
  );
};

export default layout;
