"use client";
import {
  useCreateComment,
  useDeleteComment,
  useGetAllComment,
  useUpdateComment,
} from "@/hooks/comment.hook";
import { TPost } from "@/types/post";
import {
  Button,
  List,
  Form,
  Pagination,
  Skeleton,
  Avatar,
  Modal,
  Dropdown,
  Menu,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import MyInp from "@/components/ui/Form/MyInp";
import { useGetMe } from "@/hooks/user.hook";
import { TAdmin, TTraveler } from "@/types/user";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { TComment } from "@/types/commnet";
import { TwoBarMenuIcon } from "@/components/ui/icons";
import { TResponse } from "@/types";

const Comments = ({ post }: { post: TPost }) => {
  const [pagination, setPagination] = useState({ limit: 10, page: 1 });
  const { data: commentsRes, isPending: isLoadingComments } = useGetAllComment([
    { name: "post", value: post._id },
    { name: "limit", value: pagination.limit },
    { name: "page", value: pagination.page },
  ]);
  const router = useRouter();
  const { mutate: createCommentMutate, isPending: isLoadingCreateComment } =
    useCreateComment();
  const { mutate: deleteCommentMutate, isPending: isLoadingDeleteComment } =
    useDeleteComment();
  const { mutate: updateCommentMutate, isPending: isLoadingUpdateComment } =
    useUpdateComment();
  const { data: userRes, isLoading: isLoadingUser } = useGetMe();
  const user = userRes as TResponse<TTraveler | TAdmin>;
  const myComments = commentsRes as TResponse<TComment[]>;

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingComment, setEditingComment] =
    useState<Partial<TComment> | null>(null);

  const handleCreateComment = async (values: { comment: string }) => {
    const newComment = {
      user: user.data?._id,
      comment: values.comment,
      post: post._id,
    };

    createCommentMutate(newComment, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  const handleDeleteComment = (commentId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this comment?",
      onOk: () => {
        deleteCommentMutate(commentId);
      },
    });
  };

  const handleUpdateComment = async (values: TComment) => {
    if (editingComment?._id) {
      updateCommentMutate(
        { _id: editingComment?._id, comment: values?.comment },
        {
          onSuccess: () => {
            setEditingComment(null);
          },
          onError: () => {
            editForm.resetFields();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (editingComment) {
      editForm.setFieldValue("comment", editingComment.comment);
    }
  }, [editingComment, editForm]);
  useEffect(() => {
    if (isLoadingDeleteComment) {
      message.loading("Deleting comment...");
    }
  }, [isLoadingDeleteComment]);

  const menu = (comment: TComment) => (
    <Menu>
      <Menu.Item onClick={() => setEditingComment({ ...comment })}>
        Edit
      </Menu.Item>
      <Menu.Item onClick={() => handleDeleteComment(comment._id)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="space-y-6" id="comments">
      {/* Add comment */}
      {!user?.data && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mb-4">
          <span className="text-primary">You{"'"}re not logged in</span> to
          comment
        </div>
      )}

      <Form
        className={`${
          (!user?.data || user?.data?.user?.role != "traveler") &&
          "blur pointer-events-none"
        }`}
        form={form}
        onFinish={handleCreateComment}
        layout="vertical"
      >
        <MyInp
          type="textarea"
          name={"comment"}
          label="Add your comment"
          placeholder="Add a comment..."
          rows={4}
        />
        <div className="text-right">
          <Button
            type="primary"
            loading={isLoadingCreateComment}
            htmlType="submit"
            className="bg-blue-600 hover:bg-blue-700 transition duration-200"
          >
            Add Comment
          </Button>
        </div>
      </Form>

      {isLoadingComments || isLoadingUser ? (
        <Skeleton
          active
          paragraph={{ rows: 2 }}
          className="!h-[120px] !w-full"
        />
      ) : (
        (myComments?.meta?.total ?? 0) > 0 &&
        post?.authorType === "Traveler" && (
          <>
            <List
              itemLayout="horizontal"
              dataSource={myComments?.data}
              renderItem={(comment: TComment) => (
                <List.Item
                  key={comment._id}
                  className="bg-white rounded-md shadow my-2 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start gap-3 p-4 w-full">
                    <Avatar
                      size="large"
                      src={
                        comment.user?.profileImg ||
                        "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                      }
                      className="cursor-pointer"
                      alt={comment.user?.name}
                      onClick={() =>
                        router.push(`/profile/${comment.user?._id}`)
                      }
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <p
                          className="font-semibold text-gray-800 cursor-pointer"
                          onClick={() =>
                            router.push(`/profile/${comment.user?._id}`)
                          }
                        >
                          {comment.user?.name}
                        </p>
                        <div className="flex items-center gap-1">
                          {comment.createdAt && (
                            <span className="text-gray-500 text-sm">
                              <ClockCircleOutlined />{" "}
                              {moment(new Date(comment.createdAt)).fromNow()}
                            </span>
                          )}
                          {comment.user?._id === user.data?._id && (
                            <Dropdown
                              overlay={menu(comment)}
                              trigger={["click"]}
                            >
                              <span className="rotate-90 text-lg cursor-pointer">
                                <TwoBarMenuIcon />
                              </span>
                            </Dropdown>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600">{comment.comment}</p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
            <div className="flex justify-end mt-4">
              <Pagination
                current={myComments.meta?.page}
                pageSize={pagination.limit}
                total={myComments.meta?.total}
                onChange={(page) => setPagination({ ...pagination, page })}
                showSizeChanger={false}
              />
            </div>
          </>
        )
      )}

      {/* Edit Comment Modal */}
      <Modal
        title="Edit Comment"
        open={!!editingComment?._id}
        onCancel={() => {
          setEditingComment(null);
          editForm.resetFields();
        }}
        footer={null}
      >
        <Form onFinish={handleUpdateComment} layout="vertical">
          <MyInp
            type="textarea"
            name={"comment"}
            label=""
            defaultValue={editingComment?.comment}
            placeholder="Edit your comment..."
            rows={4}
          />
          <div className="text-right">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoadingUpdateComment}
            >
              Update
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Comments;
