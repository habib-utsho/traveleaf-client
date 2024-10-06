import { getAllCategory } from "@/services/category";
import React from "react";

const FilteringSection = async () => {
  const category = await getAllCategory();

  return (
    <div className="h-screen sticky left-0 top-[65px]  bg-white border-r border-primary w-[200px] px-2 pt-4">
      <div className="space-y-2 border rounded p-1">
        <h2 className="font-semibold text-md">Category</h2>
        <ul className="flex flex-col space-y-1 h-[250px] overflow-y-auto">
          {category?.data?.map((cat: any) => {
            return (
              <li
                className="bg-primary-50 py-1 px-2 rounded text-sm"
                key={cat._id}
              >
                {cat.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilteringSection;
