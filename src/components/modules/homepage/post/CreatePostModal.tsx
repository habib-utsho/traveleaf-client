"use client";
import MyInp from "@/components/ui/Form/MyInp";
import { useCreatePost } from "@/hooks/post.hook";
import useUserData from "@/hooks/user.hook";
import { TCategory } from "@/types/category";
import { TPost } from "@/types/post";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";

const CreatePostModal = ({ categories }: { categories: TCategory[] }) => {
  const { isLoading, user } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {
    mutate: createPost,
    isPending: isPendingCreatePost,
    isSuccess,
  } = useCreatePost();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmitPost = (values: TPost) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(values));

    // Append image file if present
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      formData.append("file", fileList[0].originFileObj);
    }

    createPost(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setIsModalOpen(false);
    }
  }, [form, isSuccess]);

  return (
    <div className="flex-1">
      <Input
        onClick={() => setIsModalOpen(true)}
        placeholder={`What's on your mind? ${user?.role}`}
        size="large"
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        loading={isLoading}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmitPost}>
          {/* Image */}
          <Form.Item
            label="Image"
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
            options={categories?.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            placeholder="Category"
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          />
          <MyInp
            type="textarea"
            placeholder="What's on your mind ?"
            label="Content"
            name={"content"}
            rules={[{ required: true, message: "Content is required!" }]}
          />

          <div className="text-right">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-3/6 md:w-2/6"
              loading={isPendingCreatePost}
            >
              Post
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
