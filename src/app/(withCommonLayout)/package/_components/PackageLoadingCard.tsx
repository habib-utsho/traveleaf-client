import { Skeleton } from "antd";
import React from "react";

const PackageLoadingCard = () => {
  return <Skeleton paragraph={{ rows: 14 }} className="!bg-slate-700" active />;
};

export default PackageLoadingCard;
