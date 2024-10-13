"use client";

import React, { Suspense } from "react";
import signBG from "@/assets/images/about/6345959.jpg";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Keep this
import { Button, Divider, Form, FormProps, Table } from "antd";
import { useUserSignin } from "@/hooks/auth.hook";
import { TSignin } from "@/types/user";
import Container from "@/components/ui/Container";
import MyInp from "@/components/ui/Form/MyInp";
import { LockOutlined } from "@ant-design/icons";

const columns = [
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "password",
    title: "Password",
    dataIndex: "password",
  },
  {
    key: "role",
    title: "Role",
    dataIndex: "role",
  },
];

const SigninPage = () => {
  const searchParams = useSearchParams(); // Keep this hook
  const redirect = searchParams.get("redirect"); // Get the "redirect" param
  const [form] = Form.useForm();

  const { mutate: handleSignin, isPending } = useUserSignin({ redirect });

  const onSubmit: FormProps<TSignin>["onFinish"] = (payload: TSignin) => {
    handleSignin(payload);
  };

  const signinData = [
    {
      email: "admin@gmail.com",
      password: "1234@@aA",
      role: "admin",
    },
    {
      email: "utsho926@gmail.com",
      password: "1234@@aA",
      role: "traveler",
    },
  ];

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signBG.src})` }}
    >
      <Container className="w-full md:w-4/6 xl:w-3/6 mx-auto">
        <Form
          form={form}
          name="signinForm"
          onFinish={onSubmit}
          layout="vertical"
        >
          <div className="shadow  block xl:flex flex-row my-5 md:my-32">
            <div className="w-full xl:w-3/6 bg-slate-50 px-8 py-14 rounded xl:rounded-none xl:rounded-l">
              <div className="mb-8 space-y-1">
                <h2 className="text-primary font-semibold">
                  Hello and welcome{" "}
                </h2>
                <p className="text-gray-700 text-sm">
                  Access Your Personalized Healthcare Services
                </p>
              </div>

              <div className="space-y-4">
                <MyInp
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: "Email is required" }]}
                />
                <MyInp
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  label="Password"
                  prefix={<LockOutlined />}
                  rules={[{ required: true, message: "Password is required" }]}
                />

                <Button
                  loading={isPending}
                  htmlType="submit"
                  type="primary"
                  block
                  size="middle"
                  className="text-white w-full"
                >
                  Signin
                </Button>

                <p className="text-slate-700">
                  New here?{" "}
                  <Link href={"/signup"}>
                    <span className="text-primary text-[14px] font-semibold">
                      Signup
                    </span>
                  </Link>
                </p>

                <Divider />
                <div className="w-full my-shadow-1 rounded">
                  <Table
                    columns={columns}
                    dataSource={signinData}
                    pagination={false}
                    size="large"
                    onRow={(record) => ({
                      onClick: () => {
                        form.setFieldsValue({
                          email: record.email,
                          password: record.password,
                        });
                      },
                      className: "cursor-pointer",
                    })}
                    scroll={{ x: 240 }}
                  />
                </div>
              </div>
            </div>

            {/* Signin right */}
            <div className="bg-slate-800 bg-opacity-60 hidden xl:flex items-center justify-center text-white rounded-r flex-1 p-5">
              <div className="space-y-4">
                <h2 className="my-subtitle">
                  Welcome to <span className="text-secondary">TraveLeaf</span>
                </h2>
                <p className="text-slate-400">Login to access your account</p>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
};

// Wrapping with Suspense
const SigninPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SigninPage />
    </Suspense>
  );
};

export default SigninPageWrapper;
