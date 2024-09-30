"use client";
import React from "react";
import signBG from "@/assets/images/auth/signBg.jpg";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button, Form, FormProps } from "antd";
import { useUserSignin } from "@/hooks/auth.hook";
import { TSignin } from "@/types/user";
import Container from "@/components/ui/Container";
import MyInp from "@/components/ui/Form/MyInp";
import { LockOutlined } from "@ant-design/icons";

// Need to change password
const SigninPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [form] = Form.useForm();

  const {
    mutate: handleSignin,
    isPending,
    isSuccess,
    data,
    error,
  } = useUserSignin({ redirect });

  const onSubmit: FormProps<TSignin>["onFinish"] = (payload: TSignin) => {
    handleSignin(payload);
  };

  const defaultValues = {
    email: "utsho926@gmail.com",
    password: "1234@@aA",
  };

  return (
    <div
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-slate-800 bg-blend-overlay my-28 md:my-0"
      style={{ backgroundImage: `url(${signBG.src})` }}
    >
      <Container className="w-full xl:w-3/6 mx-auto">
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
                />
                <MyInp
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  label="Password"
                  prefix={<LockOutlined />}
                />

                <Button
                  loading={isPending}
                  htmlType="submit"
                  color="primary"
                  className="text-white"
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
                <div className="flex gap-3 items-center">
                  <hr className="h-px w-full bg-slate-500" />
                  <span className="text-slate-500">or</span>
                  <hr className="h-px w-full bg-slate-500" />
                </div>
              </div>
            </div>

            {/* signin right */}
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

export default SigninPage;
