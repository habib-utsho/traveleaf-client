'use client'
import { useGetAllCategory } from "@/hooks/category.hook";
import useDebounce from "@/hooks/useDebounce";
import { TCategory } from "@/types/category";
import { Empty, Input, Select, Skeleton } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const { Search } = Input;
const { Option } = Select;

const FilteringSection = ({ isMobile }: { isMobile: boolean }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || ""); 
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const { data: categories, isPending: isLoadingCategories } = useGetAllCategory();

  // Function to update the URL query parameters
  const updateQueryParams = React.useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // Get current query params
    if (value) {
      current.set(key, value); // Add new param
    } else {
      current.delete(key); // Remove param if value is null
    }
    const newQuery = current.toString();
    const newUrl = newQuery ? `?${newQuery}` : "/";

    router.push(newUrl); // Update the URL with new params
  }, [router, searchParams]);

  // Handle sort change
  const handleSortChange = (value: string) => {
    updateQueryParams("sort", value);
  };

  // Effect to handle the debounced search term change
  useEffect(() => {
    if (debounceSearchTerm) {
      updateQueryParams("search", debounceSearchTerm); // Update search param in URL
    } else {
      updateQueryParams("search", null); // Remove search param if the search term is empty
    }
  }, [debounceSearchTerm, updateQueryParams]);

  // Handle removing the category parameter (for "All")
  const handleRemoveCategory = () => {
    updateQueryParams("category", null); // Removes category, keeps other params intact
  };

  return (
    <div
      className={`left-0 top-[65px] bg-white border-r border-primary px-2 pt-4 ${
        isMobile ? "block" : "hidden md:block w-[200px] h-screen sticky space-y-4"
      }`}
    >
      <Search
        placeholder="Search post"
        value={searchTerm}
        allowClear
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      <Select
        defaultValue={sort || "-votes"}
        className="w-full"
        onChange={handleSortChange}
      >
        <Option value="-votes">Sort by Highest Upvotes</Option>
        <Option value="votes">Sort by Lowest Upvotes</Option>
      </Select>

      <div className="space-y-2 border rounded p-1">
        <h2 className="font-semibold text-md">Category</h2>

        {/* "All" link removes category param but retains others */}
        <p
          onClick={handleRemoveCategory}
          className={`${
            !category ? "bg-primary-100" : "bg-white"
          } py-1 px-2 rounded text-sm cursor-pointer hover:bg-primary-100 block`}
        >
          All
        </p>

        <ul className="flex flex-col space-y-1 h-[280px] overflow-y-auto">
          {isLoadingCategories ? (
            <Skeleton.Button className="!h-full !w-full" active />
          ) : categories?.meta?.total === 0 ? (
            <Empty description="No categories found!" />
          ) : (
            categories?.data?.map((cat: TCategory) => (
              <li key={cat._id}>
                <Link
                  href={`/?category=${cat._id}&sort=${sort || ""}&search=${search || ""}`} // Preserve other params
                  className={`${
                    category === cat._id ? "bg-primary-100" : "bg-white"
                  } py-1 px-2 rounded text-sm cursor-pointer hover:bg-primary-100 block`}
                >
                  {cat.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilteringSection;
