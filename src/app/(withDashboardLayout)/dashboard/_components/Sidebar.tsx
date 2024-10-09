import { Layout, Menu } from "antd";
import React, { useState } from "react";
import {
  MailFilled,
  UserOutlined,
  DashboardOutlined,
  FileTextOutlined,
  SettingOutlined,
  EditOutlined,
  KeyOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { role } from "@/constant/user.constant";
import { useUserData } from "@/hooks/user.hook";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SidebarLoading from "./SidebarLoading";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { user, isLoading } = useUserData();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false); // State to track sidebar collapse

  // Sidebar items with profile submenu
  const sidebarItems =
    user?.role === role.ADMIN
      ? [
          {
            key: "/dashboard/admin",
            label: "Dashboard",
            icon: <DashboardOutlined />,
          },
          {
            key: "/dashboard/admin/users",
            label: "Users",
            icon: <UserOutlined />,
          },
          {
            key: "/dashboard/admin/categories",
            label: "Categories",
            icon: <FileTextOutlined />,
          },
          {
            key: "/dashboard/admin/posts",
            label: "Posts",
            icon: <FileTextOutlined />,
          },
          {
            key: "/dashboard/admin/package",
            label: "Packages",
            icon: <TrophyOutlined />,
          },
          {
            key: "/dashboard/admin/subscription",
            label: "Subscription",
            icon: <SettingOutlined />,
          },
          {
            key: "/dashboard/admin/profile",
            label: "Profile",
            icon: <UserOutlined />,
            children: [
              {
                key: "/dashboard/admin/profile",
                label: "Edit Profile",
                icon: <EditOutlined />,
              },
              {
                key: "/dashboard/admin/change-password",
                label: "Change Password",
                icon: <KeyOutlined />,
              },
            ],
          },
        ]
      : user?.role === role.TRAVELER
      ? [
          {
            key: "/dashboard/traveler",
            label: "Dashboard",
            icon: <DashboardOutlined />,
          },
          {
            key: "/dashboard/traveler/categories",
            label: "Categories",
            icon: <FileTextOutlined />,
          },
          {
            key: "/dashboard/traveler/posts",
            label: "Posts",
            icon: <FileTextOutlined />,
          },
          {
            key: "/dashboard/traveler/subscription",
            label: "Subscription",
            icon: <SettingOutlined />,
          },
          {
            key: "/dashboard/traveler/profile",
            label: "Profile",
            icon: <UserOutlined />,
            children: [
              {
                key: "/dashboard/traveler/profile",
                label: "Edit Profile",
                icon: <EditOutlined />,
              },
              {
                key: "/dashboard/traveler/change-password",
                label: "Change Password",
                icon: <KeyOutlined />,
              },
            ],
          },
        ]
      : [];

  if (isLoading) {
    return <SidebarLoading />;
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="!h-screen !sticky !top-0 !overflow-y-auto"
    >
      <div className="demo-logo-vertical" />
      <div className="text-center p-4">
        <Image
          src={logo}
          alt="TraveLeaf"
          className={`${
            collapsed ? "!h-[40px] !w-[40px]" : "h-[120px]  w-[120px]"
          }  mx-auto cursor-pointer`}
          onClick={() => router.push("/")}
        />
      </div>

      {!collapsed && (
        <div className="mb-6 mx-3 text-gray-500">
          <h2>
            <MailFilled /> {user?.email}
          </h2>
        </div>
      )}

      <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
        {sidebarItems.map(({ key, label, icon, children }) =>
          children ? (
            <Menu.SubMenu
              key={key}
              icon={collapsed ? icon : icon}
              title={collapsed ? icon : label}
            >
              {children.map((child) => (
                <Menu.Item key={child.key} icon={child.icon}>
                  <Link href={child.key}>
                    {collapsed ? child.icon : child.label}
                  </Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item key={key} icon={icon}>
              <Link href={key}>{collapsed ? icon : label}</Link>
            </Menu.Item>
          )
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
