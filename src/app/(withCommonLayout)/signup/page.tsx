"use client";
import React, { useEffect, useState } from "react";
import signBG from "@/assets/images/about/6346166.jpg";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useUserRegister } from "@/hooks/auth.hook";
import { Button, Form, message, Upload, UploadFile } from "antd";
import MyInp from "@/components/ui/Form/MyInp";
import { districts, genders } from "@/constant/user.constant";
import { TTraveler } from "@/types/user";
import { LockOutlined, UploadOutlined } from "@ant-design/icons";

// Need to change password
const SignupPage = () => {
  const {
    mutate: handleRegisterUser,
    isPending,
    isSuccess,
  } = useUserRegister();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onSubmit = async (payload: TTraveler) => {
    // console.log(
    //   { ...payload, dateOfBirth: new Date(payload?.dateOfBirth) },
    //   "payload"
    // );

    const formData = new FormData();
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth),
    };

    formData.append("data", JSON.stringify({ ...updatedValues }));

    if (fileList.length > 0 && fileList[0]?.originFileObj) {
      if (fileList[0]?.originFileObj) {
        formData.append("file", fileList[0].originFileObj as Blob);
      }
    }

    handleRegisterUser(formData);
  };

  useEffect(() => {
    if (isPending) {
      message.loading("Please wait...");
    }
    if (isSuccess) {
      form.resetFields();
      setFileList([]);
    }
  }, [isPending, isSuccess, form]);

  // const defaultValues = {
  //   name: "Habib Utsho",
  //   email: "utsho926@gmail.com",
  //   phone: "01706785160",
  //   dateOfBirth: "2000-05-05",
  //   gender: "Male",
  //   district: "Dhaka",
  //   bloodGroup: "AB-",
  //   password: "1234@@aA",
  // };

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signBG.src})` }}
    >
      <Container className="w-full xl:w-3/6 mx-auto">
        <Form
          name="signupForm"
          form={form}
          onFinish={onSubmit}
          layout="vertical"
        >
          <div className="shadow  my-5 md:my-32 rounded-md bg-white py-14 px-8">
            <div className="mb-8 space-y-1">
              <h2 className="text-primary font-semibold text-xl">
                Register your account
              </h2>
              <p className="text-gray-500 text-sm">
                Create your account to get started
              </p>
            </div>

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
                onChange={({
                  fileList: newFileList,
                }: {
                  fileList: UploadFile[];
                }) => setFileList(newFileList)}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    if (onSuccess) {
                      onSuccess(
                        { url: URL.createObjectURL(file as Blob) },
                        file
                      );
                    }
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

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: "Name is required" }]}
                />
                <MyInp
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: "Email is required" }]}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  placeholder="Enter your phone"
                  type="text"
                  name="phone"
                  label="Phone"
                  rules={[{ required: true, message: "Phone is required" }]}
                />
                <MyInp
                  type="select"
                  name="gender"
                  label="Gender"
                  placeholder="Select Gender"
                  options={genders?.map((gender) => ({
                    label: gender,
                    value: gender,
                  }))}
                  rules={[{ required: true, message: "Select a gender" }]}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  type="select"
                  name="district"
                  label="District"
                  placeholder="Select District"
                  options={districts?.map((district) => ({
                    label: district,
                    value: district,
                  }))}
                  rules={[{ required: true, message: "Select a district" }]}
                />
                <MyInp
                  placeholder="Date of birth"
                  type="date"
                  name="dateOfBirth"
                  label="Date of Birth"
                  rules={[
                    { required: true, message: "Date of birth is required" },
                  ]}
                />
                <MyInp
                  placeholder="Password"
                  type="password"
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Password is required" }]}
                  prefix={<LockOutlined className="text-gray-400" />}
                />
              </div>

              <MyInp
                type="textarea"
                name={"bio"}
                label="Bio"
                placeholder="Enter your bio"
                rules={[{ required: true, message: "Bio is required" }]}
              />

              <Button
                loading={isPending}
                htmlType="submit"
                type="primary"
                className="text-white !mt-8 mx-auto w-full"
                size="middle"
              >
                Signup
              </Button>

              <p className="text-slate-700">
                Already have an account?{" "}
                <Link href={"/signin"}>
                  <button className="text-primary cursor-pointer font-bold">
                    Signin
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SignupPage;
