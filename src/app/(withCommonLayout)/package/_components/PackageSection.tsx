import { Empty, Tooltip } from "antd";
import Link from "next/link";
import { getAllPackages } from "@/services/package";
import { TPackage } from "@/types/package";

const PackageSection = async () => {
  const packages = await getAllPackages([
    { name: "isDeleted", value: "false" },
  ]);

  return (
    <>
      {packages?.data?.length === 0 ? (
        <Empty description="No packages found" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {packages.data.map((packageI: TPackage) => {
            return (
              <Link
                key={packageI._id} // Use a key prop to uniquely identify each element
                href={`/package/${packageI._id}`}
                className="flex items-center gap-5 shadow hover:shadow-xl transition-all duration-500 dark:shadow-white p-4 rounded-md border "
              >
                <div className="space-y-2">
                  <h2 className="text-lg font-bold">{packageI.name}</h2>
                  <Tooltip title={packageI.description}>
                    <p className="line-clamp-3">{packageI.description}</p>
                  </Tooltip>
                  <p className="text-sm text-gray-500">
                    Price: {packageI.price} {packageI.currencyType} /{" "}
                    {packageI.durationInMonths} month(s)
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PackageSection;
