"use client";
import { Layout, Menu, Button, Drawer, Skeleton } from "antd";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import NavbarProfileDropdown from "./NavbarProfileDropdown";
import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useGetMe } from "@/hooks/user.hook";
import FilteringSection from "../modules/homepage/filteringSidebar/FilteringSection";

const { Header } = Layout;

export const Navbar = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isFilteringDrawerVisible, setIsFilteringDrawerVisible] = useState(false);
  const { data: user, isPending: isLoadingUser } = useGetMe()

  // Map navigation items from siteConfig
  const menuItems = siteConfig.navItems.map((item) => ({
    key: item.href,
    label: <Link href={item.href}>{item.label}</Link>,
  }));

  if (user?.data?._id) { // Assuming `user` is null when not signed in
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
        label: <Link href={item.href}>{item.label}</Link>
      }))}
    />
  );

  if (user?.data?._id) {

    drawerMenuItems.props.items.push({
      key: '/profile',
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

  return (
    <Header
      style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}
      className="!text-black !bg-white border-b"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="logo flex items-center gap-1">
          <MenuOutlined onClick={showFilteringDrawer} className="inline-block md:!hidden " />
          <Link href="/" className="flex justify-start items-center gap-2">
            <Image src={logo} height={40} width={40} alt="logo" />
            <p className="font-bold text-inherit">TraveLeaf</p>
          </Link>
        </div>

        {/* Large Screen Menu */}
        {isLoadingUser ? <Skeleton.Button className="!h-[40px] !w-[350px] !hidden md:!block" /> : <Menu
          mode="horizontal"
          items={menuItems}
          className="!hidden md:!flex gap-4 justify-start ml-2 !bg-primary/10 rounded-md"
          theme="light"
        />}

        {/* Right Side Content for Large Screens */}
        <div className="navbar-right-content hidden md:flex items-center gap-4">
          <NavbarProfileDropdown />
        </div>

        {/* Mobile Menu Button */}
        <Button
          icon={<MenuOutlined />}
          className="md:!hidden"
          onClick={showDrawer}
        />

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
