"use client";
import React from "react";
import { Form, Button, message } from "antd";
import {
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import MyInp from "@/components/ui/Form/MyInp";
import { LocationIcon } from "@/components/ui/icons";

const ContactUs = () => {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const onFinish = (values: any) => {
    message.success("Thanks for contact with us!");
    form.resetFields();
  };

  return (
    <div className="pt-8 pb-3">
      <div className="max-w-5xl mx-4 lg:mx-auto p-6 bg-white border rounded-md ">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">We{"'"}d love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-between">
          <div className="space-y-2">
            <h2 className="text-primary font-semibold">Get in Touch</h2>
            <p className="text-gray-700">
              Please fill out the quick form and we{"'"}ll be in touch with
              lighting speed.
            </p>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className=""
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4 flex-wrap">
                {/* Name Input */}
                <MyInp
                  name="name"
                  type="text"
                  label="Name"
                  placeholder="Enter your name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4 flex-wrap">
                {/* Subject Input */}
                <MyInp
                  name="subject"
                  label="Subject"
                  placeholder="Enter the subject"
                  rules={[
                    { required: true, message: "Please enter a subject" },
                  ]}
                  size="large"
                  type="text"
                />
                {/* Phone */}
                <MyInp
                  name="phone"
                  label="Phone"
                  placeholder="Enter your contact no"
                  rules={[
                    { required: true, message: "Please enter your phone" },
                  ]}
                  size="large"
                  type="text"
                />
              </div>

              {/* Message Input */}
              <MyInp
                name="message"
                label="Message"
                placeholder="Enter your message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
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
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="space-y-[2px]">
              <h2 className="text-primary font-semibold">Need any help?</h2>
              <p className="text-xl font-semibold text-gray-800">
                Get in Touch With Us
              </p>
            </div>

            <p>
              If you have any questions, concerns, or need assistance, we{"'"}re
              here to help. Reach out to us anytime, and we{"'"}ll ensure you
              get the support you need.
            </p>

            <div className="space-y-2">
              <div className="text-gray-600 mt-2 flex gap-4 items-center ">
                <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                  <PhoneOutlined />
                </span>

                <div>
                  <h2 className="font-semibold">Have any question?</h2>
                  <p>+880170678-5160</p>
                </div>
              </div>
              <div className="text-gray-600 mt-2 flex gap-4 items-center ">
                <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                  <MailOutlined />
                </span>

                <div>
                  <h2 className="font-semibold">Write email</h2>
                  <p>utsho926@gmail.com</p>
                </div>
              </div>
              <div className="text-gray-600 mt-2 flex gap-4 items-center ">
                <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                  <LocationIcon />
                </span>

                <div>
                  <h2 className="font-semibold">Visit anytime</h2>
                  <p>North Badda, Dhaka</p>
                </div>
              </div>
              <div className="text-gray-600 mt-2 flex gap-4 items-center">
                <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                  <ClockCircleOutlined />
                </span>

                <div>
                  <h2 className="font-semibold">Working Hours</h2>
                  <p>Sat-Thu: 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
