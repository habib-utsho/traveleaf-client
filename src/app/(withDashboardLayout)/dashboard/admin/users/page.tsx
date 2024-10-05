"use client";
import { Button, Empty, Input, Popconfirm, Skeleton, Table } from "antd";

import { DeleteFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDeleteTraveler, useGetAllTraveler } from "@/hooks/user.hook";
import { TFilterQuery } from "@/types";
import { TTraveler } from "@/types/user";
import Image from "next/image";

const { Search } = Input;
const User = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TFilterQuery[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  // const query = useMemo(() => {
  //   return [
  //     { name: "limit", value: pagination.limit },
  //     { name: "page", value: pagination.page },
  //     ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
  //     ...params,
  //   ];
  // }, [pagination, searchTerm, params]);
  const { data: users, isPending: isLoadingUser } = useGetAllTraveler([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);
  const { mutate: deleteTraveler, isPending: isLoadingDeleteTraveler } =
    useDeleteTraveler();
  // const [deleteUser] = useDeleteUserMutation();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );
  const columns = [
    {
      title: "Name",
      render: (_: TTraveler, record: TTraveler) => {
        return (
          <div className="flex items-center gap-1">
            {record.profileImg && (
              <Image
                src={record.profileImg}
                alt={record.name}
                width={40}
                height={40}
              />
            )}
            <p>{record.name}</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Total posts",
      dataIndex: "postsCount",
    },
    {
      title: "Followers",
      dataIndex: "followers",
      render: (followers: TTraveler[]) => {
        return followers.length;
      },
    },
    {
      title: "Following",
      dataIndex: "following",
      render: (following: TTraveler[]) => {
        return following.length;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      render: (_: TTraveler, record: TTraveler) => {
        return (
          <div className="flex gap-2">
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                icon={<DeleteFilled />}
                loading={isLoadingDeleteId === record._id}
              ></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const handleDeleteUser = async (id: string) => {
    setIsLoadingDeleteId(id);
    deleteTraveler(id);
  };

  useEffect(() => {
    if (isLoadingDeleteTraveler) {
      setIsLoadingDeleteId(null);
    }
  }, [isLoadingDeleteTraveler]);

  return (
    <div className="p-6 h-[4000px]">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl text-black">User</h2>
        <Search
          placeholder="Search user"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingUser ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : users?.meta?.total === 0 ? (
        <Empty description="No user found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={users?.data}
          scroll={{ x: 800 }}
          loading={isLoadingUser}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: users?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}
    </div>
  );
};

export default User;
