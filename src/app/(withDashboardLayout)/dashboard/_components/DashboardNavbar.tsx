import { useUserData } from "@/hooks/user.hook";
import { Button, Dropdown, Menu, Avatar, Skeleton } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { signOut } from "@/services/authService";
import { protectedRoutes } from "@/constant";
import { usePathname, useRouter } from "next/navigation";

const DashboardNavbar = () => {
  const { user, setUser, isLoading } = useUserData();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
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
      <Menu.Item
        key="profile"
        icon={<UserOutlined />}
        onClick={() => router.push(`/dashboard/${user.role}/profile`)}
      >
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-whit py-2 flex justify-between items-center shadow sticky top-0 left-0 z-50 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* <Image src="/path/to/logo.png" alt="Logo" className="h-8 w-8" /> */}
      </div>

      {/* User Information */}
      <div className="flex items-center gap-4">
        {isLoading ? (
          <Skeleton.Avatar active size="large" className="pr-[95px]" />
        ) : user ? (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-gray-700 font-semibold text-[14px]">
                {user.name}
              </span>

              <Avatar
                size="large"
                src={
                  user?.profileImg ||
                  "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                }
                className="cursor-pointer"
              />
            </div>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={handleLogout}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardNavbar;
