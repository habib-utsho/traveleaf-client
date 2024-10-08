"use client";
import { useGetAdminStats } from "@/hooks/stats.hook";
import { Tabs, Row, Col, Card, Skeleton, Typography } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  FolderOutlined,
  TagsOutlined,
  FileOutlined,
} from "@ant-design/icons";
import React from "react";
import { useUserData } from "@/hooks/user.hook";

const { Title } = Typography;
const { TabPane } = Tabs;

const AdminHomePage = () => {
  const { data, isPending } = useGetAdminStats();
  const user = useUserData();

  const {
    totalUsers,
    totalPost,
    totalPackage,
    totalCategory,
    totalSubscription,
  } = data?.data || {};

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <Title level={2}>Hi, {user?.name || "Admin"}, Welcome back 👋</Title>
      </div>
      {isPending ? (
        <Skeleton paragraph={{ rows: 14 }} />
      ) : (
        <Tabs defaultActiveKey="1" className="space-y-4">
          <TabPane tab="Overview" key="1">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  title="Total Users"
                  bordered={false}
                  extra={<UserOutlined />}
                >
                  <div className="text-2xl font-bold">{totalUsers}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  title="Total Posts"
                  bordered={false}
                  extra={<FileOutlined />}
                >
                  <div className="text-2xl font-bold">{totalPost}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  title="Total Packages"
                  bordered={false}
                  extra={<AppstoreOutlined />}
                >
                  <div className="text-2xl font-bold">{totalPackage}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  title="Total Categories"
                  bordered={false}
                  extra={<TagsOutlined />}
                >
                  <div className="text-2xl font-bold">{totalCategory}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  title="Total Subscriptions"
                  bordered={false}
                  extra={<FolderOutlined />}
                >
                  <div className="text-2xl font-bold">{totalSubscription}</div>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Analytics" key="2" disabled>
            {/* You can add Analytics content here */}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default AdminHomePage;
