"use client";
import MyInp from "@/components/ui/Form/MyInp";
import { useCreatePost } from "@/hooks/post.hook";
import { useGetMe, useUserData } from "@/hooks/user.hook";
import { TCategory } from "@/types/category";
import { TPost } from "@/types/post";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Radio, Upload, UploadFile } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePostModal = ({ categories }: { categories: TCategory[] }) => {
  // const { isLoading, user } = useUserData();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: user, isPending: isLoading } = useGetMe()
  const [postContent, setPostContent] = useState("");
  const {
    mutate: createPost,
    isPending: isPendingCreatePost,
    isSuccess,
  } = useCreatePost();
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

    createPost(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setFileList([]);
      setIsModalOpen(false);
      setPostContent("");
    }
    if (isPendingCreatePost) {
      message.loading("Please wait...");
    }
  }, [form, isSuccess, isPendingCreatePost]);

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }], // Dropdown for color
    ["link", "image"],
    ["clean"], // Remove formatting button
  ];


  return (
    <div className="flex-1">
      <Input
        onClick={() => (user?.data?._id ? setIsModalOpen(true) : router.push("/signin"))}
        placeholder={`What's on your mind${user?.data?.name ? `, ${user?.data?.name}` : ""} ?`}
        size="large"
      />
      <Modal
        title={
          <div className="text-center text-2xl font-semibold">
            Create New Post_
          </div>
        }
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
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
            options={categories?.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
            placeholder="Category"
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          />

{user?.data?.status === 'premium' && <MyInp name={'isPremium'} label="Is premium?" type="radio" defaultValue="false" options={[{label: "True", value: true}, {label: "False", value:false}]}/> }

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
