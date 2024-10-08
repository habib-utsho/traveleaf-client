"use client";
import { Button, Empty, Input, Popconfirm, Skeleton, Table } from "antd";
import { DeleteFilled, TrophyOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TFilterQuery } from "@/types";
import { TPost } from "@/types/post";
import Image from "next/image";
import { useDeletePost, useGetAllPost } from "@/hooks/post.hook";
import { TAdmin, TTraveler } from "@/types/user";
import { TCategory } from "@/types/category";

const { Search } = Input;

const Post = () => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const [params, setParams] = useState<TFilterQuery[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const { data: posts, isPending: isLoadingPosts } = useGetAllPost([
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
    ...(searchTerm ? [{ name: "searchTerm", value: searchTerm }] : []),
    ...params,
  ]);

  const { mutate: deletePost, isPending: isLoadingDeletePost } =
    useDeletePost();
  const [isLoadingDeleteId, setIsLoadingDeleteId] = useState<string | null>(
    null
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (title: string, record: TPost) => {
        return (
          <div className="flex items-center gap-2">
            {record.banner && (
              <Image src={record.banner} alt={title} width={40} height={40} />
            )}
            <p>{title}</p>
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category: TCategory) => {
        return category.name;
      },
    },
    {
      title: "Author",
      dataIndex: "author",
      render: (author: TAdmin | TTraveler) => {
        return author.name;
      },
    },
    {
      title: "Upvotes",
      dataIndex: "upvotes",
    },
    {
      title: "Downvotes",
      dataIndex: "downvotes",
    },
    {
      title: "Status",
      dataIndex: "isPremium",
      render: (isPremium: boolean) =>
        isPremium ? (
          <span className="font-semibold">
            {" "}
            <TrophyOutlined /> Premium
          </span>
        ) : (
          "Free"
        ),
    },
    {
      title: "Actions",
      render: (_: TPost, record: TPost) => {
        return (
          <div className="flex gap-2">
            <Popconfirm
              title="Delete the post"
              description="Are you sure to delete this post?"
              onConfirm={() => handleDeletePost(record._id)}
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

  const handleDeletePost = async (id: string) => {
    setIsLoadingDeleteId(id);
    deletePost(id);
  };

  useEffect(() => {
    if (!isLoadingDeletePost) {
      setIsLoadingDeleteId(null);
    }
  }, [isLoadingDeletePost]);

  return (
    <div className="p-6 h-[4000px]">
      <div className="flex flex-wrap gap-4 justify-between mb-4">
        <h2 className="font-bold text-xl md:text-2xl text-black">Posts</h2>
        <Search
          placeholder="Search post"
          onSearch={(value) => setSearchTerm(value)}
          size="large"
          allowClear
          enterButton
          className="w-full max-w-full md:max-w-[280px] lg:max-w-[420px] "
        />
      </div>

      {isLoadingPosts ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : posts?.meta?.total === 0 ? (
        <Empty description="No posts found!" />
      ) : (
        <Table
          columns={columns}
          dataSource={posts?.data}
          scroll={{ x: 800 }}
          loading={isLoadingPosts}
          rowClassName={(record) =>
            record.isDeleted ? "opacity-50 pointer-events-none" : ""
          }
          pagination={{
            position: ["bottomCenter"],
            current: pagination.page,
            pageSize: pagination.limit,
            total: posts?.meta?.total,
            onChange: (page, pageSize) => {
              setPagination({ page, limit: pageSize });
            },
          }}
        />
      )}
    </div>
  );
};

export default Post;
