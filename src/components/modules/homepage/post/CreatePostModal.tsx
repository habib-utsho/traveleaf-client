"use client";
import MyInp from "@/components/ui/Form/MyInp";
import { useGetAllCategory } from "@/hooks/category.hook";
import { useCreatePost, useUpdatePost } from "@/hooks/post.hook";
import { useGetMe } from "@/hooks/user.hook";
import { TCategory } from "@/types/category";
import { TPost } from "@/types/post";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload, UploadFile } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Option for editor
const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }], // Dropdown for color
  ["link", "image"],
  ["clean"], // Remove formatting button
];

// const CreatePostModal = ({ categories }: { categories: TCategory[] }) => {
const CreatePostModal = ({
  editingPost,
  setEditingPost,
  fromNavbar,
}: {
  editingPost?: TPost | null;
  setEditingPost?: React.Dispatch<TPost | null>;
  fromNavbar?: boolean;
}) => {
  // const { isLoading, user } = useUserData();
  const { data: categoriesRes, isPending: isLoadingCategory } =
    useGetAllCategory();
  const categories = categoriesRes?.data as TCategory[];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    setEditingPost ? true : false
  );
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: user, isPending: isLoading } = useGetMe();
  const [postContent, setPostContent] = useState("");
  const {
    mutate: createPostMutate,
    isPending: isPendingCreatePost,
    isSuccess,
  } = useCreatePost();
  const {
    mutate: updatePostMutate,
    isPending: isPendingUpdatePost,
    isSuccess: isSuccessUpdatePost,
  } = useUpdatePost();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmitPost = (values: TPost) => {
    if (!postContent) {
      return message.error("Content is required!");
    }
    const updatedValues = { ...values, content: postContent };

    const formData = new FormData();

    formData.append("data", JSON.stringify(updatedValues));

    // Append image file if present
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    if (editingPost) {
      updatePostMutate({ formData, _id: editingPost?._id });
    } else {
      createPostMutate(formData);
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessUpdatePost) {
      form.resetFields();
      setFileList([]);
      setIsModalOpen(false);
      setPostContent("");
      if (setEditingPost) {
        setEditingPost(null);
      }
    }
    if (isPendingCreatePost || isPendingUpdatePost) {
      message.loading("Please wait...");
    }
  }, [
    form,
    isSuccess,
    isSuccessUpdatePost,
    isPendingCreatePost,
    isPendingUpdatePost,
    setEditingPost,
  ]);

  // Editing post
  useEffect(() => {
    if (editingPost) {
      form.setFieldsValue({
        ...editingPost,
        category: editingPost.category._id,
      });
      setPostContent(editingPost.content);
      setFileList([
        { uid: "-1", name: "Image", status: "done", url: editingPost.banner },
      ]);
      setIsModalOpen(true);
    }
  }, [editingPost, form]);

  const onCancel = () => {
    setIsModalOpen(false);
    if (setEditingPost) {
      setEditingPost(null);
    }
  };

  return (
    <div className="flex-1">
      {!setEditingPost && fromNavbar ? (
        <div
          className="flex items-center gap-1 text-gray-100 font-semibold cursor-pointer"
          onClick={() =>
            user?.data?._id ? setIsModalOpen(true) : router.push("/signin")
          }
        >
          <PlusOutlined className="!text-xl" />
          <span className="hidden md:inline-block">Create</span>
        </div>
      ) : (
        <Input
          onClick={() =>
            user?.data?._id ? setIsModalOpen(true) : router.push("/signin")
          }
          placeholder={`What's on your mind${
            user?.data?.name ? `, ${user?.data?.name}` : ""
          } ?`}
          size="large"
          className="!bg-slate-800 placeholder:!text-slate-400 !text-slate-50 !border-none"
        />
      )}

      <Modal
        title={
          <div className="text-center text-2xl font-semibold">
            {editingPost ? "Update post_" : "Create New Post_"}
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={onCancel}
        loading={isLoading}
        footer={null}
        width={900}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmitPost}>
          {/* Image */}
          <Form.Item
            label="Banner Image"
            valuePropName="fileList"
            className="mb-6"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  // @ts-expect-error - URL.createObjectURL not checking type
                  onSuccess({ url: URL.createObjectURL(file) }, file);
                }, 1000);
              }}
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
              }}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <UploadOutlined />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <MyInp
            type="text"
            placeholder="Title"
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required!" }]}
          />
          <MyInp
            type="select"
            disabled={isLoadingCategory}
            options={categories?.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            placeholder="Category"
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          />

          {user?.data?.status === "premium" && (
            <MyInp
              name={"isPremium"}
              label="Is premium?"
              type="radio"
              defaultValue="false"
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
            />
          )}

          <ReactQuill
            theme="snow"
            value={postContent}
            onChange={setPostContent}
            placeholder="What's on your mind?"
            modules={{
              toolbar: toolbarOptions,
            }}
          />

          <div className="text-right">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-3/6 md:w-2/6 mt-4"
              loading={isPendingCreatePost || isPendingUpdatePost}
            >
              {editingPost ? "Update post" : "Post"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
