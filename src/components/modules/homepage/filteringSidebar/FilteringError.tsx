import { AlertFilled } from "@ant-design/icons";
import React from "react";

const FilteringErr = () => {
  return (
    <div className="h-screen flex items-center justify-center text-danger flex-col sticky left-0 top-0  bg-white border-r border-primary w-[200px] px-2 pt-4">
      <AlertFilled />
      Something went wrong!
    </div>
  );
};

export default FilteringErr;
