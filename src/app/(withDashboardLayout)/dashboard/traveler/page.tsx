"use client";
import { useGetUserStats } from "@/hooks/stats.hook";
import { Tabs, Row, Col, Card, Skeleton, Typography } from "antd";
import {
  FileOutlined,
  TrophyOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import React from "react";
import { useUserData } from "@/hooks/user.hook";
import moment from "moment";

const { Title } = Typography;
const { TabPane } = Tabs;

const TravelerHomePage = () => {
  const { data, isPending } = useGetUserStats();
  const user = useUserData();

  const {
    currentSubscription,
    totalPost,
    totalPremiumPost,
    totalFollowers,
    totalFollowing
  } = data?.data || {};



  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <Title level={2}>Hi, {user?.user?.name || "Traveler"}, Welcome back 👋</Title>
      </div>
      {isPending ? (
        <Skeleton paragraph={{ rows: 14 }} />
      ) : (
        <Tabs defaultActiveKey="1" className="space-y-4">
          <TabPane tab="Overview" key="1">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                  title="Active Subscription"
                  bordered={false}
                  extra={<TrophyOutlined />}
                  className="h-full"
                >
                  {
                    currentSubscription ?
                    <div className="text-sm flex flex-col gap-[1px]"><span className=" font-semibold">{currentSubscription?.package.name}</span>  <span>{currentSubscription?.package?.durationInMonths} months subscription </span>
                    <span>Till {moment(currentSubscription?.endDate).format("DD MMM YYYY")}</span>
                    </div>
                    : <div className="text-sm font-semibold">No Running Subscription</div>
                  }
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                className="h-full"
                  title="Total Posts"
                  bordered={false}
                  extra={<FileOutlined />}
                >
                  <div className="text-2xl font-bold">{totalPost}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                className="h-full"
                  title="Total premium Packages"
                  bordered={false}
                  extra={<TrophyOutlined />}
                >
                  <div className="text-2xl font-bold">{totalPremiumPost}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                className="h-full"
                  title="Total Followers"
                  bordered={false}
                  extra={<UsergroupAddOutlined />}
                >
                  <div className="text-2xl font-bold">{totalFollowers}</div>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={6}>
                <Card
                className="h-full"
                  title="Total Following"
                  bordered={false}
                  extra={<UsergroupAddOutlined />}
                >
                  <div className="text-2xl font-bold">{totalFollowing}</div>
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

export default TravelerHomePage;
