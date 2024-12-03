"use client";
import { Avatar, Button, Dropdown, Menu, Skeleton } from "antd";
import {
  AppstoreOutlined,
  EditOutlined,
  LockOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/services/authService";
import { protectedRoutes } from "@/constant";
import { useGetMe, useUserData } from "@/hooks/user.hook";
import { SignOutIcon, VerifiedBadgeIcon } from "../ui/icons";
import Image from "next/image";
import Link from "next/link";

const NavbarProfileDropdown = () => {
  const { isLoading, user, setUser } = useUserData();
  const { data: meData, isPending: isLoadingMeData } = useGetMe();
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
    <Menu className="!min-w-[220px]">
      <Menu.Item className="!py-3" key="profile">
        <Link
          href={`/profile/${meData?.data?._id}`}
          className="flex items-center gap-2"
        >
          {user?.profileImg && (
            <Image
              src={user?.profileImg}
              alt={user?.name}
              width={35}
              height={35}
              className="rounded-full h-[35px] w-[35px] mr-1"
            />
          )}
          {meData?.data?._id && (
            <div>
              <h2>View Profile</h2>
              {user?.status === "premium" && (
                <p className="text-primary">
                  <TrophyOutlined /> Premium User
                </p>
              )}
            </div>
          )}
        </Link>
      </Menu.Item>
      <Menu.Item className="!py-3" key="dashboard">
        <AppstoreOutlined className="!mr-1 !text-xl" />
        <a href={`/dashboard/${user?.role}`}>Dashboard</a>
      </Menu.Item>
      <Menu.Item className="!py-3" key="Edit profile">
        <EditOutlined className="!mr-1 !text-xl" />
        <a href={`/dashboard/${user?.role}/profile`}>Edit Profile</a>
      </Menu.Item>
      <Menu.Item className="!py-3" key="change-password">
        <LockOutlined className="!mr-1 !text-xl" />
        <a href={`/dashboard/${user?.role}/change-password`}>Change Password</a>
      </Menu.Item>
      <Menu.Item className="!py-3" key="signOut" danger onClick={handleSignOut}>
        <SignOutIcon className="!mr-1 !text-xl" />
        Sign out
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {isLoading || isLoadingMeData ? (
        <Skeleton.Avatar active size="large" className="relative top-3" />
      ) : user?.email ? (
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          trigger={["click"]}
          className="inline-block"
        >
          <div className="relative">
            <Avatar
              size="large"
              src={
                user?.profileImg ||
                "https://i.pravatar.cc/150?u=a04258a2462d826712d"
              }
              className="cursor-pointer"
            />
            {meData?.data?.status === "premium" && (
              <span className="h-5 w-5 rounded-full flex items-center justify-center text-primary text-xl absolute -top-2 md:top-0 right-0">
                <VerifiedBadgeIcon />
              </span>
            )}
          </div>
        </Dropdown>
      ) : (
        <Button type="primary" href={"/signin"} icon={<UserOutlined />}>
          Sign In
        </Button>
      )}
    </>
  );
};

export default NavbarProfileDropdown;
