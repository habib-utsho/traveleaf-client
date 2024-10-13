import { Result } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const Cancelled = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-slate-50">
      <div className="w-full max-w-md">
        <Result
          className="my-shadow-1 bg-white rounded-md"
          icon={
            <CloseCircleFilled style={{ color: "#FF0000", fontSize: "65px" }} />
          }
          title="Payment Cancelled"
          subTitle="Your has been cancelled. If this was unintentional, please contact our support team."
       
        />
      </div>
    </div>
  );
};

export default Cancelled;
