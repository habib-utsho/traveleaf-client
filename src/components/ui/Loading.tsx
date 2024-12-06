// import { Spin } from "antd";
import React from "react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen bg-slate-900/10 z-[999] fixed inset-0 backdrop-blur flex items-center justify-center">
      {/* <Spin size="large" /> */}

      <div className="text-center flex items-center justify-center gap-2 animate-pulse">
        <Image src={logo} height={40} width={40} alt="logo" />
        <h2>Loading..</h2>
      </div>
    </div>
  );
};

export default Loading;
