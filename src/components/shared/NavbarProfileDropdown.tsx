"use client";
import { Avatar, Button, Dropdown, Menu, Skeleton } from "antd";
import { HeartFilled } from "@ant-design/icons";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/services/authService";
import { protectedRoutes } from "@/constant";
import { siteConfig } from "@/config/site";
import { useGetMe, useUserData } from "@/hooks/user.hook";
import { VerifiedBadgeIcon } from "../ui/icons";

const NavbarProfileDropdown = () => {
  const { isLoading, user, setUser } = useUserData();
  const { data:meData, isPending:isLoadingMeData } = useGetMe();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    signOut();
    setUser(null);

    const isMatchProtectedRoute = protectedRoutes?.some((route) => {
      const partial = route?.split("/")?.[1];
      return pathname.match(partial);
    });

    if (isMatchProtectedRoute) {
      router.push(`/signin?redirect=${pathname}`);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="dashboard">
        <a href={`/dashboard/${user?.role}`}>Dashboard</a>
      </Menu.Item>
      <Menu.Item key="profile">
        <a href={`/dashboard//${user?.role}/profile`}>Profile</a>
      </Menu.Item>
      <Menu.Item key="change-password">
        <a href={`/dashboard/${user?.role}/change-password`}>Change Password</a>
      </Menu.Item>
      <Menu.Item key="signOut" danger onClick={handleSignOut}>
        Sign out
      </Menu.Item>
    </Menu>
  );


  return (
    <>
      {isLoading || isLoadingMeData ? (
        <Skeleton.Avatar active size="large" className="relative top-3" />
      ) : user?.email ? (
        <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
         <div className="relative">
         <Avatar
            size="large"
            src={
              user?.profileImg ||
              "https://i.pravatar.cc/150?u=a04258a2462d826712d"
            }
            className="cursor-pointer"
          />
          {meData?.data?.status === 'premium' && <span className="h-5 w-5 rounded-full flex items-center justify-center bg-primary bg-opacity-20 text-primary absolute top-0 right-0">
            <VerifiedBadgeIcon /> 
          </span>}
         </div>
        </Dropdown>
      ) : (
        <Button
          type="primary"
          href={siteConfig.links.sponsor}
          icon={<HeartFilled />}
        >
          Sign In
        </Button>
      )}
    </>
  );
};

export default NavbarProfileDropdown;
