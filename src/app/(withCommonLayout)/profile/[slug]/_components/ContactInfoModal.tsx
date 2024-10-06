"use client";
import { LocationIcon } from "@/components/ui/icons";
import { TAdmin, TTraveler } from "@/types/user";
import {
  CalendarOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Button, Divider, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";

type TProps = {
  travelerAdmin: TTraveler | TAdmin;
};
const ContactInfoModal = ({ travelerAdmin }: TProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <Button
        type="link"
        className="!text-primary"
        onClick={() => setModalVisible(true)}
      >
        Contact Info
      </Button>
      <Modal
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        className="p-4 rounded text-left"
        footer={null}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{travelerAdmin.name}</h2>
          <Divider className="!my-1" />
          <div className=" flex items-center gap-5">
            <PhoneOutlined className="text-2xl" />
            <div className="flex flex-col gap-[1px]">
              <h2 className="font-semibold">Phone</h2>
              <span>{travelerAdmin?.phone}</span>
            </div>
          </div>
          <div className=" flex items-center gap-5">
            <MailOutlined className="text-2xl" />
            <div className="flex flex-col gap-[1px]">
              <h2 className="font-semibold">Email</h2>
              <span>{travelerAdmin?.user?.email}</span>
            </div>
          </div>
          <div className=" flex items-center gap-5">
            <LocationIcon className="text-2xl" />
            <div className="flex flex-col gap-[1px]">
              <h2 className="font-semibold">Address</h2>
              <span>{travelerAdmin?.district}, Bangladesh</span>
            </div>
          </div>
          <div className=" flex items-center gap-5">
            <CalendarOutlined className="text-2xl" />
            <div className="flex flex-col gap-[1px]">
              <h2 className="font-semibold">Birthday</h2>
              <span>
                {moment(travelerAdmin?.dateOfBirth).format("MMM-DD-YY")}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactInfoModal;
