"use client";
import { Button, Empty, Popconfirm, Skeleton, Table } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDeletePackage, useGetAllPackage } from "@/hooks/package.hook";
import { TFilterQuery } from "@/types";
import { TPackage } from "@/types/package";
import PackageModal from "./_components/PackageModal";

const PackageManagement = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params, setParams] = useState<TFilterQuery[]>([]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingPackage, setEditingPackage] =
    useState<Partial<TPackage> | null>(null);

  // Fetch packages
  const { data: packages, isPending: isLoadingPackages } = useGetAllPackage([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...params,
  ]);

  // Delete package mutation
  const { mutate: deletePackage, isPending: isLoadingDeletePackage } =
    useDeletePackage();

  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  // Columns for package table
  const columns = [
    {
      title: "Package Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number, record: TPackage) =>
        `${price} ${record.currencyType}`,
    },
    {
      title: "Duration (Months)",
      dataIndex: "durationInMonths",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true, // This will show "..." for long descriptions
    },
    {
      title: "Actions",
      render: (_: TPackage, record: TPackage) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingPackage(record);
                setModalVisible(true);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the package"
              description="Are you sure to delete this package?"
              onConfirm={() => handleDeletePackage(record._id)}
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

  // Delete handler
  const handleDeletePackage = async (id: string) => {
    setIsLoadingDeleteId(id);
    deletePackage(id);
  };

  useEffect(() => {
    if (!isLoadingDeletePackage) {
      setIsLoadingDeleteId(null);
    }
  }, [isLoadingDeletePackage]);

  return (
    <div className="p-6">
      <div className="flex gap-4 justify-between mb-8">
        <h2 className="font-bold text-xl md:text-2xl text-black">
          Package Management
        </h2>

        {packages?.meta?.total < 3 ? (
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Add Package
          </Button>
        ) : (
          ""
        )}
      </div>

      {isLoadingPackages ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : packages?.meta?.total === 0 ? (
        <Empty description="No packages found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={packages?.data}
          scroll={{ x: 800 }}
          loading={isLoadingPackages}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: packages?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Package modal */}
      <PackageModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        setEditingPackage={setEditingPackage}
        editingPackage={editingPackage}
      />
    </div>
  );
};

export default PackageManagement;
