'use client'
import { useGetAllCategory } from "@/hooks/category.hook";
import { TCategory } from "@/types/category";
import { Empty, Input, Select, Skeleton } from "antd";
import React from "react";

const { Search } = Input;
const { Option } = Select;

const FilteringSection = ({ isMobile }: { isMobile: boolean }) => {
  const { data: categories, isPending: isLoadingCategories } = useGetAllCategory();


  return (
    <div className={`left-0 top-[65px] bg-white border-r border-primary px-2 pt-4  ${isMobile ? "block" : 'hidden md:block w-[200px] h-screen sticky space-y-4'} `}>
      <Search
        placeholder="Search category"
      // onSearch={value => setSearchTerm(value)}
      // onChange={e => setSearchTerm(e.target.value)}
      />

<Select
  defaultValue="default"
  className="w-full"
  // onChange={value => setSortOption(value)} 
>
  <Option value="default">Default</Option>
  <Option value="highest">Sort by Highest Upvotes</Option>
  <Option value="lowest">Sort by Lowest Upvotes</Option>
</Select>


      <div className="space-y-2 border rounded p-1">
        <h2 className="font-semibold text-md">Category</h2>
        <ul className="flex flex-col space-y-1 h-[250px] overflow-y-auto">
          {isLoadingCategories ? <Skeleton.Button className="!h-full !w-full" active /> : categories?.meta?.total === 0 ? <Empty description="No categories found!" /> : categories?.data?.map((cat: TCategory) => (
            <li
              className="bg-primary-50 py-1 px-2 rounded text-sm cursor-pointer hover:bg-primary-100"
              key={cat._id}
            >
              {cat.name}
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  );
};

export default FilteringSection;
