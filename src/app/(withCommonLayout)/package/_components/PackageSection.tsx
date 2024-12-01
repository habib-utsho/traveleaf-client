import { Button, Empty, Tooltip } from "antd";
import { getAllPackages } from "@/services/package";
import { TPackage } from "@/types/package";
import { CheckCircleOutlined } from "@ant-design/icons";
import MyMotion from "@/components/ui/MyMotion";

const PackageSection = async () => {
  const packages = await getAllPackages([
    { name: "isDeleted", value: "false" },
    { name: "limit", value: "500" },
  ]);

  // Function to determine the background color based on the package name
  const getCardBackground = (packageName: string) => {
    switch (packageName) {
      case "Basic":
        return "bg-gray-100"; // Light gray for Basic package
      case "Standard":
        return "bg-blue-100"; // Light blue for Standard package
      case "Premium":
        return "bg-yellow-100"; // Light yellow for Premium package
      case "Explorer":
        return "bg-green-100"; // Light green for Explorer package
      case "Backpacker":
        return "bg-red-100"; // Light red for Backpacker package
      case "Adventurer":
        return "bg-purple-100"; // Light purple for Adventurer package
      default:
        return "bg-white"; // Default background for other packages
    }
  };

  return (
    <>
      {packages?.data?.length === 0 ? (
        <Empty description="No packages found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {packages.data.map((packageI: TPackage, ind: number) => {
            return (
              <MyMotion x={ind % 2 === 0 ? 60 : -60} key={ind}>
                <div
                  className={`flex items-center gap-5 shadow hover:shadow-xl transition-all duration-500 dark:shadow-white p-4 rounded-md border ${getCardBackground(
                    packageI.name
                  )}`}
                >
                  <div className="space-y-2">
                    <h2 className="text-lg font-bold">{packageI.name}</h2>

                    <p className="text-md text-black">
                      <span className="font-semibold text-2xl md:text-3xl">
                        {packageI.price} {packageI.currencyType}
                      </span>
                      /{packageI.durationInMonths} month(s)
                    </p>
                    <Tooltip title={packageI.shortBio} className="h-[30px]">
                      <p className="line-clamp-3">{packageI.shortBio}</p>
                    </Tooltip>
                    <div className="space-y-[8px] min-h-[175px]">
                      {packageI.benefits.map((benefit, ind) => (
                        <p
                          key={ind}
                          className="text-[12px] text-gray-500 flex items-center !gap-[6px]"
                        >
                          <CheckCircleOutlined className="!text-primary-500 !text-lg " />{" "}
                          {benefit}
                        </p>
                      ))}
                    </div>

                    <Button
                      href={`/package/${packageI._id}`}
                      type="primary"
                      size="middle"
                      className="!mt-2"
                    >
                      Get {packageI.name} plan
                    </Button>
                  </div>
                </div>
              </MyMotion>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PackageSection;
