'use client'
import { Result } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const FailedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-md">
        <Result
          className="my-shadow-1 bg-white rounded-md"
          icon={
            <WarningOutlined style={{ color: "#FFA500", fontSize: "65px" }} />
          }
          title="Your payment has been failed!"
          subTitle="Sorry, your payment has been failed. Please try again."
  
        />
      </div>
    </div>
  );
};

export default FailedPage;
