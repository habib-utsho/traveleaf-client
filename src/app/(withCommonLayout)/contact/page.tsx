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
import MyMotion from "@/components/ui/MyMotion";

const ContactUs = () => {
  const [form] = Form.useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const onFinish = (values: any) => {
    message.success("Thanks for contact with us!");
    form.resetFields();
  };

  return (
    <div className="pt-8 pb-3">
      <MyMotion y={70}>
        <div className="max-w-5xl mx-4 lg:mx-auto p-6 border border-slate-800 bg-slate-800 rounded-md ">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            <p className="text-gray-300 mt-2">
              We{"'"}d love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-between">
            <div className="space-y-2">
              <h2 className="text-primary font-semibold">Get in Touch</h2>
              <p className="text-gray-300">
                Please fill out the quick form and we{"'"}ll be in touch with
                lighting speed.
              </p>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="bg-slate-900 !py-2 !px-4 rounded-md"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-between gap-4 flex-wrap">
                  {/* Name Input */}
                  <MyInp
                    inpClassName="!border-none !bg-slate-800 placeholder:!text-slate-300 !text-white"
                    name="name"
                    type="text"
                    label={<span className="text-white">Name</span>}
                    placeholder="Enter your name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                    size="large"
                  />

                  {/* Email Input */}
                  <MyInp
                    inpClassName="!border-none !bg-slate-800 placeholder:!text-slate-300 !text-white"
                    name="email"
                    label={<span className="text-white">Email</span>}
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
                    inpClassName="!border-none !bg-slate-800 placeholder:!text-slate-300 !text-white"
                    name="subject"
                    placeholder="Enter the subject"
                    label={<span className="text-white">Subject</span>}
                    rules={[
                      { required: true, message: "Please enter a subject" },
                    ]}
                    size="large"
                    type="text"
                  />
                  {/* Phone */}
                  <MyInp
                    inpClassName="!border-none !bg-slate-800 placeholder:!text-slate-300 !text-white"
                    name="phone"
                    label={<span className="text-white">Phone</span>}
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
                  inpClassName="!border-none !bg-slate-800 placeholder:!text-slate-300 !text-white"
                  name="message"
                  label={<span className="text-white">Message</span>}
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
                <p className="text-xl font-semibold text-white">
                  Get in Touch With Us
                </p>
              </div>

              <p>
                If you have any questions, concerns, or need assistance, we{"'"}
                re here to help. Reach out to us anytime, and we{"'"}ll ensure
                you get the support you need.
              </p>

              <div className="space-y-2">
                <div className="text-gray-300 mt-2 flex gap-4 items-center ">
                  <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                    <PhoneOutlined />
                  </span>

                  <div>
                    <h2 className="font-semibold">Have any question?</h2>
                    <p className="text-[14px]">+880170678-5160</p>
                  </div>
                </div>
                <div className="text-gray-300 mt-2 flex gap-4 items-center ">
                  <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                    <MailOutlined />
                  </span>

                  <div>
                    <h2 className="font-semibold">Write email</h2>
                    <p className="text-[14px]">utsho926@gmail.com</p>
                  </div>
                </div>
                <div className="text-gray-300 mt-2 flex gap-4 items-center ">
                  <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                    <LocationIcon />
                  </span>

                  <div>
                    <h2 className="font-semibold">Visit anytime</h2>
                    <p className="text-[14px]">North Badda, Dhaka</p>
                  </div>
                </div>
                <div className="text-gray-300 mt-2 flex gap-4 items-center">
                  <span className="h-16 w-16 text-xl bg-primary flex items-center justify-center !text-white rounded">
                    <ClockCircleOutlined />
                  </span>

                  <div>
                    <h2 className="font-semibold">Working Hours</h2>
                    <p className="text-[14px]">Sat-Thu: 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyMotion>
    </div>
  );
};

export default ContactUs;
