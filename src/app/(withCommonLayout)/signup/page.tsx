"use client";
import React from "react";
import signBG from "@/assets/images/auth/signBg.jpg";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { useUserRegister } from "@/hooks/auth.hook";
import { Button, Form, FormProps } from "antd";
import MyInp from "@/components/ui/Form/MyInp";
import { districts, genders } from "@/constant/user.constant";
import { TSignin, TTraveler } from "@/types/user";

// Need to change password
const SignupPage = () => {
  const { mutate: handleRegisterUser, isPending } = useUserRegister();
  const [form] = Form.useForm();

  const onSubmit: FormProps<TSignin>["onFinish"] = async (
    payload: TTraveler
  ) => {
    const updatedValues = {
      ...payload,
      dateOfBirth: new Date(payload?.dateOfBirth),
    };

    handleRegisterUser(updatedValues);
  };

  const defaultValues = {
    name: "Habib Utsho",
    email: "utsho926@gmail.com",
    phone: "01706785160",
    dateOfBirth: "2000-05-05",
    gender: "Male",
    district: "Dhaka",
    bloodGroup: "AB-",
    password: "1234@@aA",
  };

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
              <h2 className="text-primary font-semibold">
                Register your account
              </h2>
              <p className="text-gray-700 text-sm">
                Join Us to Unlock a World of Healthcare Opportunities
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  label="Name"
                />
                <MyInp
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  label="Email"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <MyInp
                  placeholder="Enter your phone"
                  type="text"
                  name="phone"
                  label="Phone"
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
                />
                <MyInp
                  placeholder="Date of birth"
                  type="date"
                  name="dateOfBirth"
                  label="Date of Birth"
                />
              </div>

              <Button
                loading={isPending}
                htmlType="submit"
                color="primary"
                className="text-white"
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
