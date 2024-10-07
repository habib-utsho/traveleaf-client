"use client";
import { useState, useEffect } from "react";
import { Button, Form, message, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetAdminById,
  useUpdateAdmin,
  useUserData,
} from "@/hooks/user.hook";
import { TUser } from "@/types/user";
import Container from "@/components/ui/Container";
import MyInp from "@/components/ui/Form/MyInp";
import { districts } from "@/constant/user.constant";
import { useGetMe } from "@/hooks/auth.hook";

const ProfilePage = () => {
  const [updateProfileForm] = Form.useForm();
  const { user, setUser, isLoading } = useUserData();

  const { _id } = user || {};

  const {
    mutate: updateAdmin,
    isPending: isPendingUpdateAdmin,
    error: updateAdminErr,
    isSuccess: isSuccessUpdateAdmin,
  } = useUpdateAdmin();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: admin, isPending:isLoadingAdmin } = useGetMe();
  const { name, phone, email, district, profileImg } = admin?.data || {};

  console.log(isLoading, "isLoading");
  console.log(user, "user");
  console.log(admin, "admin");

  useEffect(() => {
    updateProfileForm.setFieldsValue({
      name,
      email,
      phone,
      district,
      profileImg,
    });

    if (profileImg) {
      setFileList([
        {
          uid: "-1", // Unique identifier for the file
          name: "profile_image", // You can replace this with an actual file name
          status: "done", // Set the status to "done" as the image is already uploaded
          url: profileImg,
        },
      ]);
    }
  }, [name, phone, district, updateProfileForm, email, profileImg]);

  const handleUpdateProfile = async (values: TUser) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(values));
    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      // formData.append("file", fileList[0].originFileObj);
      formData.append("image", fileList[0].originFileObj);
    }

    updateAdmin({ _id, formData });
  };

  useEffect(() => {
    if (isPendingUpdateAdmin) {
      message.loading("Updating profile...");
    }
    if (isSuccessUpdateAdmin) {
      message.success("Profile updated successfully");
    }
    if (updateAdminErr) {
      message.error(updateAdminErr?.message);
    }
  }, [isPendingUpdateAdmin, isSuccessUpdateAdmin, updateAdminErr]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container className="py-8 ">
        <Form
          form={updateProfileForm}
          name="update-profile"
          onFinish={handleUpdateProfile}
          layout="vertical"
          className="!bg-white !shadow !px-8 !py-5 !rounded-md !max-w-md md:!max-w-xl !mx-auto"
        >
          <h2 className="text-black font-semibold text-xl text-center my-4">
            Update Profile
          </h2>

          {/* Profile Image Upload */}
          <Form.Item
            label="Profile Image"
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
                  // @ts-expect-error: TypeScript does not recognize the custom request method
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

          {/* Name */}
          <MyInp
            type="text"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
            ]}
            placeholder="Enter name here"
          />

          {/* Email */}
          <MyInp
            placeholder=""
            type="email"
            label="Email"
            name="email"
            disabled
          />

          {/* Phone */}
          <MyInp
            type="text"
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number",
              },
            ]}
            placeholder="Enter phone number here"
          />

          {/* District */}
          <MyInp
            type="select"
            name="district"
            label="District"
            placeholder="Select District"
            options={districts?.map((district) => ({
              label: district,
              value: district,
            }))}
          />

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              block
              size="large"
              htmlType="submit"
              loading={isPendingUpdateAdmin}
            >
              Update profile
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
};

export default ProfilePage;
