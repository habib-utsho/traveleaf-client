import Container from "@/components/ui/Container";
import Image from "next/image";
import React from "react";
import moment from "moment";
import {
  CalendarOutlined,
  PhoneOutlined,
  PushpinOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { getTravelerById } from "@/services/authService";
import { Divider } from "antd";
import profileBanner from "@/assets/images/profile/profile_banner.png";

const TravelerDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  // Fetch the traveler data using the ID (slug from URL parameters)
  const { data: traveler } = await getTravelerById(params?.slug);

  console.log(traveler, "traveler");

  // Format the created date using moment
  const formattedDate = moment(traveler?.createdAt).format("MMMM DD, YYYY");

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <div
        className="h-[350px] w-full mb-16 shadow-lg relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${profileBanner.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {traveler?.profileImg && (
          <Image
            src={traveler.profileImg}
            alt={traveler.name}
            width={100}
            height={100}
            className="rounded-full absolute -bottom-12 left-[350px] border-4 border-primary"
          />
        )}
      </div>
      <Container>
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Traveler Name */}
          <h2 className="font-semibold text-2xl md:text-3xl">
            {traveler?.name}
          </h2>

          {/* Traveler Details */}
          <div className="flex items-center justify-between mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              {traveler?.profileImg && (
                <Image
                  src={traveler.profileImg}
                  alt={traveler.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{traveler?.name}</span>
                <div className="flex gap-1 items-center">
                  <CalendarOutlined />
                  {formattedDate}
                </div>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap items-center">
              {/* Email */}
              <div className="inline-flex items-center gap-1 text-md font-bold text-gray-700">
                <PhoneOutlined />
                <span>{traveler?.email}</span>
              </div>
            </div>
          </div>

          {/* Traveler Bio */}
          {traveler?.bio && (
            <div className="mb-8">
              <p className="text-lg text-gray-700">{traveler.bio}</p>
            </div>
          )}

          {/* Traveler Profile Image */}
          {traveler?.profileImg && (
            <div className="relative w-full h-80 mb-8">
              <Image
                src={traveler.profileImg}
                alt={traveler.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Location and Status */}
          <div className="flex items-center gap-3 justify-between text-gray-600">
            <p className="flex gap-1 items-center text-gray-600">
              <PushpinOutlined /> {traveler?.district}
            </p>
            <p className="flex gap-1 items-center">
              <ClockCircleOutlined />
              {moment().diff(moment(traveler?.dateOfBirth), "years")} years old
            </p>
          </div>

          <Divider />

          {/* Additional Details */}
          <div className="mt-10 flex items-center justify-between text-gray-600">
            <div>Status: {traveler?.status}</div>
            <div>Role: {traveler?.user?.role}</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TravelerDetailsPage;
