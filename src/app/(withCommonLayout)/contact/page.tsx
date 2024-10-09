"use client";
import React from "react";
import { Form, Button, message } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import MyInp from "@/components/ui/Form/MyInp";

const ContactUs = () => {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const onFinish = (values: any) => {
    message.success("Thanks for contact with us!");
    form.resetFields();
  };

  return (
    <div className="py-4">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">We{"'"}d love to hear from you!</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          {/* Name Input */}
          <MyInp
            name="name"
            type="text"
            label="Name"
            placeholder="Enter your name"
            rules={[{ required: true, message: "Please enter your name" }]}
            size="large"
          />

          {/* Email Input */}
          <MyInp
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            rules={[
              { type: "email", message: "Please enter a valid email" },
              { required: true, message: "Please enter your email" },
            ]}
            size="large"
          />

          {/* Subject Input */}
          <MyInp
            name="subject"
            label="Subject"
            placeholder="Enter the subject"
            rules={[{ required: true, message: "Please enter a subject" }]}
            size="large"
            type="text"
          />

          {/* Message Input */}
          <MyInp
            name="message"
            label="Message"
            placeholder="Enter your message"
            rules={[{ required: true, message: "Please enter your message" }]}
            size="large"
            rows={4}
            type="textarea"
          />

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Send Message
            </Button>
          </Form.Item>
        </Form>

        {/* Contact Information */}
        <div className="mt-12 ">
          <h3 className="text-xl font-semibold text-gray-800">
            Contact Information
          </h3>
          <p className="text-gray-600 mt-2">
            <MailOutlined /> Email: utsho926@example.com
          </p>
          <p className="text-gray-600 mt-2">
            <PhoneOutlined /> Phone: +8801706785160
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
