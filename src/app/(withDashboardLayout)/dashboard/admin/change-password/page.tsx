"use client";

import Container from "@/components/ui/Container";
import { useChangePassword } from "@/hooks/auth.hook";
import { TPasswordUpdate } from "@/types/user";
import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";

const ChangePassword = () => {
  const [changePassForm] = Form.useForm();
  const {
    mutate: changePassword,
    isPending: isLoadingChangePassword,
    isSuccess: isSuccessChangePassword,
    error,
  } = useChangePassword();

  const handleChangePassword = async (data: TPasswordUpdate) => {
    changePassword(data);
  };

  useEffect(() => {
    if (isLoadingChangePassword) {
      message.loading("Changing password...");
    }
    if (isSuccessChangePassword) {
      message.success("Password changed successfully!");
      changePassForm.resetFields();
    }
    if (error) {
      message.error(error?.message || "Failed to change password!");
    }
  }, [isLoadingChangePassword, isSuccessChangePassword, error, changePassForm]);

  return (
    <div>
      <Container className={"py-8"}>
        <Form
          form={changePassForm}
          name="passwordChangeForm"
          layout="vertical"
          onFinish={handleChangePassword}
          className="!bg-white !shadow !px-8 !py-5 !rounded-md !max-w-md md:!max-w-xl !mx-auto"
        >
          <h2 className="text-black font-semibold text-xl text-center my-4">
            Change Password
          </h2>
          <Form.Item
            label="Old password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please enter your old password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter old password here"
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="New password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please enter your new password",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password here"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-one w-full"
              size="large"
              loading={isLoadingChangePassword}
            >
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  );
};

export default ChangePassword;
