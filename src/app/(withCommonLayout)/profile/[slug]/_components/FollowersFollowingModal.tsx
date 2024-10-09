"use client";
import { TTraveler } from "@/types/user";
import { Button, Divider, Modal, Avatar } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type TProps = {
  traveler: TTraveler;
  isFollowers?: boolean;
  isFollowing?: boolean;
};

const FollowersFollowingModal = ({
  traveler,
  isFollowers,
  isFollowing,
}: TProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <Button
        type="link"
        className=" !text-primary cursor-pointer !px-0"
        onClick={() => setModalVisible(true)}
      >
        {isFollowers
          ? `${traveler.followers?.length} followers`
          : `${traveler.following?.length} following`}
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
          <h2 className="text-xl font-semibold">
            {isFollowers ? "Followers" : "Following"}
          </h2>
          <Divider className="!my-1" />

          {/* Followers Section */}
          {isFollowers && (
            <div>
              {traveler?.followers?.length === 0 ? (
                <div className="h-[50px] flex items-center justify-center font-bold">
                  No followers
                </div>
              ) : (
                <div className="max-h-[170px] overflow-y-auto">
                  {traveler?.followers?.map((follower, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => router.push(`/profile/${follower?._id}`)}
                    >
                      <Avatar src={follower.profileImg} size="large" />
                      <span>{follower.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Following Section */}
          {isFollowing && (
            <div>
              {traveler?.following?.length === 0 ? (
                <div className="h-[50px] flex items-center justify-center font-bold">
                  No following
                </div>
              ) : (
                <div className="max-h-[170px] overflow-y-scroll w-full">
                  {traveler?.following?.map((followed, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => router.push(`/profile/${followed?._id}`)}
                    >
                      <Avatar src={followed.profileImg} size="large" />
                      <span>{followed.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default FollowersFollowingModal;
