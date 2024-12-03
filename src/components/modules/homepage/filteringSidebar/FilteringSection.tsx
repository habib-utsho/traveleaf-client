"use client";
import { AngleBottomIcon } from "@/components/ui/icons";
import { useGetAllCategory } from "@/hooks/category.hook";
import { TCategory } from "@/types/category";
import {
  ContactsOutlined,
  EditOutlined,
  HomeOutlined,
  LockOutlined,
  TrophyOutlined,
  UpCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Empty, Skeleton } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const FilteringSection = ({ isMobile }: { isMobile: boolean }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState(search || "");
  // const debounceSearchTerm = useDebounce(searchTerm, 500);
  const pathname = usePathname();

  const {
    data: categories,
    isPending: isLoadingCategories,
    // isLoading,
    // isError,
    // error,
  } = useGetAllCategory([{ name: "limit", value: 1000000 }]);

  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  const [isResourcesVisible, setIsResourcesVisible] = useState(true);
  const [isPolicyVisible, setIsPolicyVisible] = useState(true);

  // console.log(
  //   { categories, isLoadingCategories, isLoading, isError, error },
  //   "isLoadingCategories, isLoading, isError, error"
  // );

  // Function to update the URL query parameters
  const updateQueryParams = React.useCallback(
    (key: string, value: string | null) => {
      const current = new URLSearchParams(Array.from(searchParams.entries())); // Get current query params
      if (value) {
        current.set(key, value); // Add new param
      } else {
        current.delete(key); // Remove param if value is null
      }
      const newQuery = current.toString();
      const newUrl = newQuery ? `?${newQuery}` : "/";

      router.push(newUrl); // Update the URL with new params
    },
    [router, searchParams]
  );

  // Handle sort change
  // const handleSortChange = (value: string) => {
  //   updateQueryParams("sort", value);
  // };

  // Effect to handle the debounced search term change
  // useEffect(() => {
  //   if (debounceSearchTerm) {
  //     updateQueryParams("search", debounceSearchTerm); // Update search param in URL
  //   } else {
  //     updateQueryParams("search", null); // Remove search param if the search term is empty
  //   }
  // }, [debounceSearchTerm, updateQueryParams]);

  // Handle removing the category parameter (for "All")
  const handleRemoveCategory = () => {
    updateQueryParams("category", null); // Removes category, keeps other params intact
  };

  return (
    <div
      className={`left-0 top-[65px] bg-slate-900 border-r border-primary px-2 pt-4 overflow-y-auto pr-[3px] ${
        isMobile
          ? "block"
          : "hidden md:block w-[210px] h-screen sticky space-y-4"
      }`}
    >
      {/* Home and popular */}
      <ul className="flex flex-col space-y-1">
        {[
          { title: "Home", value: "", icon: <HomeOutlined /> },
          { title: "Popular", value: "-votes", icon: <UpCircleOutlined /> },
        ].map((elem, ind) => {
          return (
            <li key={ind}>
              <Link
                href={`/?category=${category || ""}&sort=${
                  elem.value || ""
                }&search=${search || ""}`}
                className={`${
                  !elem.value && !sort
                    ? "bg-slate-700"
                    : sort === elem.value
                    ? "bg-slate-700"
                    : "bg-transparent"
                } py-2 px-2 rounded text-sm cursor-pointer hover:bg-slate-800 flex items-center gap-[6px]`}
              >
                <span>{elem.icon}</span> {elem.title}
              </Link>
            </li>
          );
        })}
      </ul>

      <Divider className="!mt-4" />

      {/* Categories */}
      <div className="space-y-2 rounded">
        <div
          className="flex gap-1 justify-between items-center hover:bg-slate-800 transition-all duration-500 py-2 cursor-pointer px-[2px] rounded"
          onClick={() => setIsCategoryVisible(!isCategoryVisible)}
        >
          <h2 className="text-gray-300">Category</h2>
          <AngleBottomIcon
            className={`transition-all duration-500 text-gray-300 ${
              isCategoryVisible ? "rotate-0" : "rotate-180"
            } `}
          />
        </div>

        {/* "All" link removes category param but retains others */}

        <ul
          className={` flex flex-col space-y-1  overflow-y-auto transition-all duration-500 pr-1 ${
            isCategoryVisible ? "opacity-100 h-[357px]" : "opacity-0 h-[0]"
          }`}
        >
          <p
            onClick={handleRemoveCategory}
            className={`${
              !category ? "bg-slate-700" : "bg-transparent"
            } py-2 px-2 rounded text-sm cursor-pointer hover:bg-slate-800 block`}
          >
            All
          </p>

          {isLoadingCategories ? (
            <Skeleton.Button className="!h-full !w-full" active />
          ) : categories?.meta?.total === 0 ? (
            <Empty description="No categories found!" />
          ) : (
            categories?.data?.map((cat: TCategory) => (
              <li key={cat._id}>
                <Link
                  href={`/?category=${cat._id}&sort=${sort || ""}&search=${
                    search || ""
                  }`} // Preserve other params
                  className={`${
                    category === cat._id ? "bg-slate-700" : "bg-transparent"
                  } py-2 px-2 rounded text-sm cursor-pointer hover:bg-slate-800 block`}
                >
                  {cat.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>

      <Divider className="!mt-4" />

      {/* Resources */}
      <div className="space-y-2 rounded">
        <div
          className="flex gap-1 justify-between items-center hover:bg-slate-800 transition-all duration-500 py-2 cursor-pointer px-[2px] rounded"
          onClick={() => setIsResourcesVisible(!isResourcesVisible)}
        >
          <h2 className="text-gray-300">Resources</h2>
          <AngleBottomIcon
            className={`transition-all duration-500 text-gray-300 ${
              isResourcesVisible ? "rotate-0" : "rotate-180"
            } `}
          />
        </div>

        <ul
          className={` flex flex-col space-y-1  overflow-y-auto transition-all duration-500 pr-1 ${
            isResourcesVisible ? "opacity-100 h-[116px]" : "opacity-0 h-[0]"
          }`}
        >
          {[
            {
              title: "About Traveleaf",
              href: "/about",
              icon: <HomeOutlined />,
            },
            { title: "Package", href: "/package", icon: <TrophyOutlined /> },
            {
              title: "Contact Us",
              href: "/contact",
              icon: <ContactsOutlined />,
            },
          ].map((elem, ind) => (
            <li key={ind}>
              <Link
                href={elem.href}
                className={`${
                  elem.href === pathname ? "bg-slate-700" : "bg-transparent"
                } py-2 px-2 rounded text-sm cursor-pointer hover:bg-slate-800 flex items-center gap-[6px]`}
              >
                <span>{elem.icon}</span> {elem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Divider className="!mt-4" />

      {/* Policy */}
      <div className="space-y-2 rounded">
        <div
          className="flex gap-1 justify-between items-center  hover:bg-slate-800 transition-all duration-500 py-2 cursor-pointer px-[2px] rounded"
          onClick={() => setIsPolicyVisible(!isPolicyVisible)}
        >
          <h2 className="text-gray-300">Policy</h2>
          <AngleBottomIcon
            className={`transition-all duration-500 text-gray-300 ${
              isPolicyVisible ? "rotate-0" : "rotate-180"
            } `}
          />
        </div>

        <ul
          className={` flex flex-col space-y-1  overflow-y-auto transition-all duration-500 pr-1 ${
            isPolicyVisible ? "opacity-100 h-[116px]" : "opacity-0 h-[0]"
          }`}
        >
          {[
            {
              title: "Privacy Policy",
              href: "/privacy-policy",
              icon: <LockOutlined />,
            },
            {
              title: "User Agreement",
              href: "/user-agreement",
              icon: <UserOutlined />,
            },
            {
              title: "Content Policy",
              href: "/content-policy",
              icon: <EditOutlined />,
            },
          ].map((elem, ind) => (
            <li key={ind}>
              <Link
                href={elem.href}
                className={`${
                  elem.href === pathname ? "bg-slate-700" : "bg-transparent"
                } py-2 px-2 rounded text-sm cursor-pointer hover:bg-slate-800 flex items-center gap-[6px]`}
              >
                <span>{elem.icon}</span> {elem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilteringSection;
