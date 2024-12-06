import { Button, Empty, Tooltip } from "antd";
import { getAllPackages } from "@/services/package";
import { TPackage } from "@/types/package";
import {
  CompassOutlined,
  CrownOutlined,
  FireOutlined,
  RocketOutlined,
  SmileOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import MyMotion from "@/components/ui/MyMotion";
import { CheckIcon } from "@/components/ui/icons";

const PackageSection = async () => {
  const packages = await getAllPackages([
    { name: "isDeleted", value: "false" },
    { name: "limit", value: "500" },
  ]);

  // Function to determine the background color based on the package name
  const getCardColorOrBackground = (
    packageName: string,
    mode: "bg" | "color" = "bg"
  ) => {
    const baseClass = mode === "bg" ? "bg-" : "text-";

    switch (packageName) {
      case "Basic":
        return `${baseClass}gray-100`; // Light gray for Basic package
      case "Standard":
        return `${baseClass}blue-100`; // Light blue for Standard package
      case "Premium":
        return `${baseClass}yellow-100`; // Light yellow for Premium package
      case "Explorer":
        return `${baseClass}green-100`; // Light green for Explorer package
      case "Backpacker":
        return `${baseClass}red-100`; // Light red for Backpacker package
      case "Adventurer":
        return `${baseClass}purple-100`; // Light purple for Adventurer package
      default:
        return `${baseClass}white`; // Default color for other packages
    }
  };

  const getCardIcon = (packageName: string) => {
    switch (packageName) {
      case "Basic":
        return <SmileOutlined className="text-xl !text-gray-500" />; // Icon for Basic package
      case "Standard":
        return <RocketOutlined className="text-xl !text-blue-500" />; // Icon for Standard package
      case "Premium":
        return <TrophyOutlined className="text-xl !text-yellow-500" />; // Icon for Premium package
      case "Explorer":
        return <CompassOutlined className="text-xl !text-green-500" />; // Icon for Explorer package
      case "Backpacker":
        return <FireOutlined className="text-xl !text-red-500" />; // Icon for Backpacker package
      case "Adventurer":
        return <CrownOutlined className="text-xl !text-purple-500" />; // Icon for Adventurer package
      default:
        return <SmileOutlined className="text-xl !text-gray-500" />; // Default icon
    }
  };

  return (
    <>
      {packages?.data?.length === 0 ? (
        <Empty description="No packages found" />
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {packages.data.map((packageI: TPackage, ind: number) => {
            console.log(
              getCardColorOrBackground(packageI.name, "color"),
              'getCardColorOrBackground(packageI.name, "color")'
            );
            return (
              <MyMotion x={ind % 2 === 0 ? 60 : -60} key={ind}>
                <div
                  className={`flex flex-wrap md:flex-nowrap items-center gap-5 shadow hover:shadow-xl transition-all duration-500  rounded-md border border-slate-700 
                  }`}
                >
                  <div className="space-y-2 w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px] p-8">
                    <h2 className={`text-lg font-bold flex gap-2 items-center`}>
                      {packageI.name} {getCardIcon(packageI.name)}
                    </h2>
                    <Tooltip title={packageI.shortBio}>
                      <p className="text-gray-400">{packageI.shortBio}</p>
                    </Tooltip>
                  </div>
                  <div className=" space-y-2 border-t md:border-l border-slate-700 p-8 flex flex-wrap lg:flex-nowrap gap-6  items-center justify-between flex-1">
                    <div className="min-h-[175px] w-[300px] sm:w-[350px] md:w-[400px] flex items-start justify-center flex-col gap-2">
                      {packageI.benefits.map((benefit, ind) => (
                        <p
                          key={ind}
                          className="text-[14px] text-gray-400 flex items-center !gap-[6px]"
                        >
                          <span className="h-4 w-4 flex items-center bg-secondary rounded-full">
                            <CheckIcon style={{ color: "black" }} />{" "}
                          </span>
                          {benefit}
                        </p>
                      ))}
                    </div>

                    <p className="text-md text-white">
                      <span className="font-semibold text-xl sm:text-2xl md:text-3xl">
                        {packageI.price} {packageI.currencyType}
                      </span>
                      /{packageI.durationInMonths} month(s)
                    </p>

                    <Button
                      href={`/package/${packageI._id}`}
                      type="primary"
                      size="large"
                      className="!mt-2 !bg-transparent !border-secondary !p-6 hover:!bg-secondary hover:!border-secondary hover:!text-white transition-all duration-500"
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
