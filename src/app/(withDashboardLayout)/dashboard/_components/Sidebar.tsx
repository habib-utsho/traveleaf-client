import { Layout, Menu } from "antd";
import React from "react";
import { MailFilled } from "@ant-design/icons";
import { role } from "@/constant/user.constant";
import { useUserData } from "@/hooks/user.hook";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLoading from "./SidebarLoading";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { user, isLoading } = useUserData();
  const pathname = usePathname();

  const sidebarItems =
    user?.role === role.ADMIN
      ? [
          { key: "/dashboard/admin", label: "Dashboard" },
          { key: "/dashboard/admin/users", label: "Users" },
          { key: "/dashboard/admin/categories", label: "Categories" },
          { key: "/dashboard/admin/posts", label: "Posts" },
          { key: "/dashboard/admin/subscription", label: "Subscription" },
        ]
      : user?.role === role.TRAVELER
      ? [
          { key: "/dashboard/traveler", label: "Dashboard" },
          { key: "/dashboard/traveler/categories", label: "Categories" },
          { key: "/dashboard/traveler/traveler/posts", label: "Posts" },
          { key: "/dashboard/traveler/traveler/profile", label: "Profile" },
          {
            key: "/dashboard/traveler/traveler/subscription",
            label: "Subscription",
          },
        ]
      : [];

  if (isLoading) {
    return <SidebarLoading />;
  }

  return (
    <Sider
      collapsible
      breakpoint="lg"
      className="!h-screen !sticky !top-0 !overflow-y-auto"
    >
      <div className="demo-logo-vertical" />
      <div className="text-center p-4">
        <Image
          src={logo}
          alt="TraveLeaf"
          className="h-[120px] w-[120px] mx-auto"
        />
      </div>

      {/* {user?.profileImg && (
        <div className="mb-6 space-y-2 mt-4 mx-3 text-center">
          <Image
            height={100}
            width={100}
            src={user.profileImg}
            alt={user || "User Image"}
            className="w-full rounded-full"
          />
        </div>
      )} */}

      <div className="mb-6 mx-3 text-gray-500">
        <h2>
          <MailFilled /> {user?.email}
        </h2>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={sidebarItems.map(({ key, label }) => ({
          key,
          label: <Link href={key}>{label}</Link>,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
