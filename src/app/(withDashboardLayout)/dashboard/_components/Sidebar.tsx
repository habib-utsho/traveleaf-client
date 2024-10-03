import { Layout, Menu } from "antd";
import React from "react";
import { MailFilled } from "@ant-design/icons";
import useUserData from "@/hooks/user.hook";
import { role } from "@/constant/user.constant";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const { user } = useUserData();

  let sidebarItems: { key: string; label: string }[] = [];
  if (user?.role === role.ADMIN) {
    sidebarItems = [
      {
        key: "/admin/dashboard",
        label: "Dashboard",
      },
      {
        key: "/admin/users",
        label: "Users",
      },
      {
        key: "/admin/categories",
        label: "Categories",
      },
      {
        key: "/admin/posts",
        label: "Posts",
      },
      {
        key: "/admin/subscription",
        label: "Subscription",
      },
    ];
  }
  if (user?.role === role.TRAVELER) {
    sidebarItems = [
      {
        key: "/traveler/dashboard",
        label: "Dashboard",
      },
      {
        key: "/categories",
        label: "Categories",
      },
      {
        key: "/traveler/posts",
        label: "Posts",
      },
      {
        key: "/traveler/profile",
        label: "Profile",
      },
      {
        key: "/traveler/subscription",
        label: "Subscription",
      },
    ];
  }

  return (
    <Sider
      collapsible
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="!h-screen !sticky !top-0"
    >
      <div className="demo-logo-vertical" />
      <div className="mb-6 space-y-2 mt-4 mx-3">
        {/* {user?.profileImg && (
          <Image
            height={200}
            width={200}
            src={user.profileImg}
            alt={user.name || "User Image"}
            className="w-full rounded-md h-[150px]"
          />
        )} */}
        <h2 className="text-gray">
          <MailFilled /> {user?.email}
        </h2>
      </div>

      <Menu
        // onClick={({ key }) => {
        //   key ? navigate(key) : navigate("/dashboard");
        // }}
        theme="dark"
        // defaultSelectedKeys={["Dashboard"]}
        mode="inline"
        items={sidebarItems.map(({ key, label }) => ({
          key,
          label,
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
