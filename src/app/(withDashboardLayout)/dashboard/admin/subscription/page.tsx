"use client";
import { Empty, Input, Skeleton, Table } from "antd";
import { useState } from "react";
import { TFilterQuery } from "@/types";
import Image from "next/image";
import { useGetAllSubscription } from "@/hooks/subscription.hook";
import { TPackage } from "@/types/package";
import moment from "moment";
import { TSubscription } from "@/types/subscription";

const { Search } = Input;

const Subscription = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TFilterQuery[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { data: subscriptions, isPending: isLoadingSubscriptions } =
    useGetAllSubscription([
      { name: "limit", value: pagination.limit },
      { name: "page", value: pagination.page },
      ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
      ...params,
    ]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "user",
      render: (user: { name: string; profileImg: string }) => (
        <div className="flex items-center gap-2">
          {user.profileImg && (
            <Image
              src={user.profileImg}
              alt={user.name}
              width={40}
              height={40}
            />
          )}
          <p>{user.name}</p>
        </div>
      ),
    },
    {
      title: "Package",
      dataIndex: "package",
      render: (packageData: TPackage) => packageData.name,
    },
    {
      title: "Amount",
      dataIndex: "package",
      render: (packageData: TPackage) => packageData.price,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate: string) => moment(new Date(startDate)).format("LL"),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate: string) => moment(new Date(endDate)).format("LL"),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive: boolean) => (isActive ? "Active" : "Inactive"),
    },
  ];

  return (
    <div className="p-6 h-[4000px]">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl text-black">
          Subscriptions
        </h2>
        <Search
          placeholder="Search subscription"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingSubscriptions ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : subscriptions?.meta?.total === 0 ? (
        <Empty description="No subscriptions found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={subscriptions?.data}
          scroll={{ x: 800 }}
          loading={isLoadingSubscriptions}
          rowClassName={(record: TSubscription) =>
            !record.isActive ? "opacity-50 pointer-events-none" : ""
          }
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: subscriptions?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}
    </div>
  );
};

export default Subscription;
