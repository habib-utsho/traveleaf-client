"use client";
import { Layout, Menu, Button, Drawer, Input } from "antd";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
import Link from "next/link";
import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { useGetMe } from "@/hooks/user.hook";
import FilteringSection from "../modules/homepage/filteringSidebar/FilteringSection";
import { SearchIcon } from "../ui/icons";
// import { useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllPost } from "@/hooks/post.hook";
import { TPost } from "@/types/post";
import dynamic from "next/dynamic";

const CreatePostModal = dynamic(
  () => import("../modules/homepage/post/CreatePostModal"),
  { ssr: false }
);

const { Header } = Layout;

export const Navbar = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const [pagination] = useState({ limit: 10, page: 1 });
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isFilteringDrawerVisible, setIsFilteringDrawerVisible] =
    useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: user, isPending: isLoadingUser } = useGetMe();

  // const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams?.search || "");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const { data: posts, isLoading: isLoadingPosts } = useGetAllPost([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(debounceSearchTerm
      ? [{ name: "searchTerm", value: debounceSearchTerm }]
      : []),
  ]);

  // Map navigation items from siteConfig
  const menuItems = siteConfig.navItems.map((item) => ({
    key: item.href,
    label: <Link href={item.href}>{item.label}</Link>,
  }));

  if (user?.data?._id) {
    // Assuming `user` is null when not signed in
    menuItems.push({
      key: `/profile/${user?.data?._id}`, // or the route for the profile
      label: <Link href={`/profile/${user?.data?._id}`}>My Profile</Link>,
    });
  }

  // Mobile menu items for Drawer
  const drawerMenuItems = (
    <Menu
      items={siteConfig.navMenuItems.map((item, index) => ({
        key: `${item}-${index}`,
        label: <Link href={item.href}>{item.label}</Link>,
      }))}
    />
  );

  if (user?.data?._id) {
    drawerMenuItems.props.items.push({
      key: "/profile",
      label: <Link href="/profile">My Profile</Link>,
    });
  }
  // Handle Drawer visibility
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  const showFilteringDrawer = () => {
    setIsFilteringDrawerVisible(true);
  };

  const closeFilteringDrawer = () => {
    setIsFilteringDrawerVisible(false);
  };

  // Function to update the URL query parameters
  // const updateQueryParams = React.useCallback(
  //   (key: string, value: string | null) => {
  //     const current = new URLSearchParams(Array.from(searchParams.entries())); // Get current query params
  //     if (value) {
  //       current.set(key, value); // Add new param
  //     } else {
  //       current.delete(key); // Remove param if value is null
  //     }
  //     const newQuery = current.toString();
  //     const newUrl = newQuery ? `?${newQuery}` : "/";

  //     router.push(newUrl); // Update the URL with new params
  //   },
  //   [router, searchParams]
  // );

  // Effect to handle the debounced search term change
  // useEffect(() => {
  //   if (debounceSearchTerm) {
  //     updateQueryParams("search", debounceSearchTerm); // Update search param in URL
  //   } else {
  //     updateQueryParams("search", null); // Remove search param if the search term is empty
  //   }
  // }, [debounceSearchTerm, updateQueryParams]);

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      className="!text-white  border-b border-slate-700 items-center flex justify-between gap-2 !px-4 sm:!px-6 md:!px-8 "
    >
      <div className="w-full flex justify-between items-center gap-2">
        {/* Logo */}
        <div className="logo flex items-center gap-1">
          <MenuOutlined
            onClick={showFilteringDrawer}
            className="inline-block md:!hidden "
          />
          <Link href="/" className="flex justify-start items-center gap-2">
            <Image src={logo} height={40} width={40} alt="logo" />
            <p className="font-bold text-inherit hidden sm:block !text-white">
              TraveLeaf
            </p>
          </Link>
        </div>

        {/* Large Screen Menu */}
        {/* {isLoadingUser ? (
          <Skeleton.Button className="!h-[40px] !w-[350px] !hidden md:!block" />
        ) : (
          <Menu
            mode="horizontal"
            items={menuItems}
            className="!hidden md:!flex gap-4 justify-start ml-2 !bg-primary/10 rounded-md"
            theme="light"
          />
        )} */}

        <div className="relative">
          <Input
            className="!rounded-full !bg-slate-800 placeholder:!text-slate-400 !text-white !border-none focus:!border-primary transition-all duration-300 !w-[220px] sm:!w-[300px] md:!w-[350px] lg:!w-[450px] !pl-8"
            size="large"
            placeholder="Search Traveleaf"
            // prefix={<SearchIcon className="text-gray-300 text-lg" />}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-2 top-1/2 -translate-y-[10px]">
            <SearchIcon className="text-gray-300 text-lg" />
          </span>

          {!debounceSearchTerm ? (
            ""
          ) : (
            <div className="w-[400px] bg-slate-900 px-2  rounded shadow absolute top-[95%] left-0">
              {isLoadingPosts ? (
                <h2 className="text-center">
                  Search for{" "}
                  <strong className="text-primary">{debounceSearchTerm}</strong>
                </h2>
              ) : posts?.meta?.total === 0 ? (
                <h2 className="text-center">No searching match!</h2>
              ) : (
                <Menu
                  mode="vertical"
                  theme="dark"
                  items={posts?.data?.map((post: TPost) => ({
                    key: post._id,
                    label: (
                      <Link
                        href={`/blog/${post._id}`}
                        onClick={() => setSearchTerm("")}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={post.banner}
                          height={40}
                          width={40}
                          alt={post.title}
                        />
                        <h2 className="truncate">{post.title}</h2>
                      </Link>
                    ),
                  }))}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Side Content for Large Screens */}
        <div className="navbar-right-content flex gap-2 md:gap-4 items-center">
          <CreatePostModal fromNavbar={true} />
          <div className="hidden md:flex items-center gap-4">
            <NavbarProfileDropdown />
          </div>
          {/* Mobile Menu Button */}
          <Button
            icon={<MenuOutlined />}
            className="md:!hidden"
            onClick={showDrawer}
          />
        </div>

        {/* Drawer for Mobile Menu */}
        <Drawer
          title={
            <Link href="/" className="flex items-center gap-2">
              <Image src={logo} height={30} width={30} alt="logo" />
              <p className="font-bold text-inherit">TraveLeaf</p>
            </Link>
          }
          placement="right"
          onClose={closeDrawer}
          open={isDrawerVisible}
        >
          {drawerMenuItems}
          <div className="mt-4">
            <NavbarProfileDropdown />
          </div>
        </Drawer>

        {/* Drawer for mobile filter  */}
        <Drawer
          placement="left"
          onClose={closeFilteringDrawer}
          open={isFilteringDrawerVisible}
        >
          <FilteringSection isMobile={isFilteringDrawerVisible} />
        </Drawer>
      </div>
    </Header>
  );
};
