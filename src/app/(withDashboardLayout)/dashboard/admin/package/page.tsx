"use client";
import { Button, Empty, Input, Popconfirm, Skeleton, Table } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDeleteCategory, useGetAllCategory } from "@/hooks/category.hook";
import { TFilterQuery } from "@/types";
import { TCategory } from "@/types/category";
import CategoriesModal from "./_components/CategoryModal";

const { Search } = Input;

const CategoryManagement = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TFilterQuery[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [editingCategory, setEditingCategory] =
    useState<Partial<TCategory> | null>(null);

  // Fetch categories
  const { data: categories, isPending: isLoadingCategories } =
    useGetAllCategory([
      { name: "limit", value: pagination.limit },
      { name: "page", value: pagination.page },
      ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
      ...params,
    ]);

  // Delete category mutation
  const { mutate: deleteCategory, isPending: isLoadingDeleteCategory } =
    useDeleteCategory();

  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  // Columns for category table
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Actions",
      render: (_: TCategory, record: TCategory) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingCategory(record);
                setModalVisible(true);
              }}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the category"
              description="Are you sure to delete this category?"
              onConfirm={() => handleDeleteCategory(record._id)}
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
  const handleDeleteCategory = async (id: string) => {
    setIsLoadingDeleteId(id);
    deleteCategory(id);
  };

  useEffect(() => {
    if (!isLoadingDeleteCategory) {
      setIsLoadingDeleteId(null);
    }
  }, [isLoadingDeleteCategory]);

  return (
    <div className="p-6">
      <div className="flex gap-4 justify-between mb-8">
        <h2 className="font-bold text-xl md:text-2xl text-black">
          Category Management
        </h2>

        <Search
          placeholder="Search category"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Add category
        </Button>
      </div>

      {isLoadingCategories ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : categories?.meta?.total === 0 ? (
        <Empty description="No categories found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={categories?.data}
          scroll={{ x: 800 }}
          loading={isLoadingCategories}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: categories?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}

      {/* Create services modal*/}
      <CategoriesModal
        open={modalVisible}
        setModalVisible={setModalVisible}
        setEditingCategory={setEditingCategory}
        editingCategory={editingCategory}
      />
    </div>
  );
};

export default CategoryManagement;
