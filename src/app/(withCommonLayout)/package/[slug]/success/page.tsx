'use client';
import { Result } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("subscriptionId"); // Get the subscriptionId from the search params


  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-md">
        <Result
          className="my-shadow-1 bg-white rounded-md"
          icon={
            <CheckCircleFilled style={{ color: "#32CD32", fontSize: "65px" }} />
          }
          title="Your order has been placed successfully!"
          subTitle={`Thank you for subscribing. You're now a premium member. Subscription ID: ${
            subscriptionId || "N/A"
          }`}
        />
      </div>
    </div>
  );
};

export default SuccessPage;
