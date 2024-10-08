import { Skeleton } from "antd";
import Link from "next/link";
import React from "react";

const SidebarLoading = () => {
  return (
    <div className="h-screen bg-slate-800 w-[200px] fixed top-0 left-0 !z-[5000]">
      <Link href={"/"} className="text-lg text-center pt-4 pb-2 block">
        TraveLeaf
      </Link>
      {
        <ul className="rounded my2 px-2">
          {[1, 2, 3, 4, 5, 6, 7].map((elem) => {
            return (
              <li
                key={elem}
                className="bg-slate-800  transition-all duration-500 text-black  border-y border-slate-700 text-sm "
              >
                <Skeleton.Button
                  active
                  className={"block py-2 !w-full rounded-md"}
                />
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};

export default SidebarLoading;
