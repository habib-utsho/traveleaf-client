import Container from "@/components/ui/Container";
import Image from "next/image";
import React from "react";
import moment from "moment";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import { getTravelerById } from "@/services/authService";
import { Divider, Empty } from "antd";
import profileBanner from "@/assets/images/profile/profile_banner.jpg";
import { LocationIcon, VerifiedBadgeIcon } from "@/components/ui/icons";
import { TTraveler } from "@/types/user";
import ContactInfoModal from "./_components/ContactInfoModal";
import { getAllPost } from "@/services/post";
import { TPost } from "@/types/post";
import { TResponse } from "@/types";
import PostCard from "@/components/modules/homepage/post/PostCard";
import FollowUnfollow from "./_components/FollowUnfollow";
import FollowersFollowingModal from "./_components/FollowersFollowingModal";
import EditProfile from "./_components/EditProfile";

const TravelerDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  // Fetch the traveler data using the ID (slug from URL parameters)
  const travelerRes = await getTravelerById(params?.slug);
  const postRes = await getAllPost([{ name: "author", value: params?.slug }]);

  const traveler = travelerRes as TResponse<TTraveler>;
  const posts = postRes as TResponse<TPost[]>;

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

      </div>
      <Container>

        <div className="max-w-4xl mx-auto space-y-4 relative">
          {traveler?.data?.profileImg && (
            <div className="absolute -top-[140px] left-0 h-[120px] w-[120px]">
              <div className="relative">

                <Image
                  src={traveler.data?.profileImg}
                  alt={traveler.data?.name}
                  width={100}
                  height={100}
                  className="rounded-full h-full w-full  border-4 border-primary"
                />
                {traveler?.data && <EditProfile traveler={traveler?.data} className="absolute bottom-0 right-0 text-xl" />}
              </div>
            </div>
          )}
          <div className="space-y-1">
            <div className="flex justify-between gap-4 flex-wrap">
              {/* Traveler Name */}
              <h2 className="font-semibold text-2xl md:text-3xl flex gap-1 items-center">
                {traveler?.data?.name}
                {traveler?.data?.user?.status === "premium" && (
                  <VerifiedBadgeIcon className="text-primary" />
                )}

              </h2>
              <p className="flex gap-1 items-center">
                <ClockCircleOutlined />
                {moment().diff(
                  moment(traveler?.data?.dateOfBirth),
                  "years"
                )}{" "}
                years old
              </p>
            </div>

            {/* Address  */}
            <div className="flex items-center gap-[2px] flex-wrap">
              <p className="flex items-center gap-1">
                <LocationIcon /> {traveler.data?.district}, Bangladesh
              </p>
              <ContactInfoModal travelerAdmin={traveler?.data} />
            </div>
            {/* BIo */}
            <p className="text-gray-500">{traveler?.data?.bio}</p>
            <p className="text-gray-500">
              Total posts: {traveler?.data?.postsCount}
            </p>

            {/* Followers and following */}
            {/* <p className=" text-primary cursor-pointer">
                {traveler.data?.followers?.length} Followers
              </p>
              <p className=" text-primary cursor-pointer">
                {traveler.data?.following?.length} Following
              </p> */}
            <div className="flex gap-4 items-center flex-wrap font-semibold text-sm">
              <FollowersFollowingModal traveler={traveler?.data} isFollowers />
              <FollowersFollowingModal traveler={traveler?.data} isFollowing />
            </div>

            {/* Action to follow and unfollow */}
            {<FollowUnfollow traveler={traveler?.data} />}
          </div>

          <Divider className="!my-14" />

          {/* Posts */}
          <div className="">
            {posts?.meta?.total === 0 ? (
              <Empty description="No post found" />
            ) : (
              <div className="space-y-8 gap-5">
                {posts.data?.map((post: TPost) => {
                  return <PostCard key={post?._id} post={post} />;
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TravelerDetailsPage;
