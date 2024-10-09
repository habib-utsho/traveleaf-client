"use client";
import {
  useFollowTraveler,
  useGetMe,
  useUnfollowTraveler,
} from "@/hooks/user.hook";
import { TTraveler } from "@/types/user";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";

const FollowUnfollow = ({ traveler }: { traveler: TTraveler }) => {
  const { mutate: followTraveler, isPending: isPendingFollow } =
    useFollowTraveler();
  const { mutate: unfollowTraveler, isPending: isPendingUnfollow } =
    useUnfollowTraveler();
  const { data, isLoading } = useGetMe();

  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // Check if the user is already following the traveler
  useEffect(() => {
    if (data?.data) {
      setIsFollowing(data.data.following?.includes(traveler._id));
    }
  }, [data, traveler._id]);

  const handleFollow = () => {
    followTraveler(traveler._id, {
      onSuccess: (data) => {
        message.success(data?.message || "Successfully followed the traveler!");
        setIsFollowing(true);
      },
      onError: (e) => {
        message.error(
          e?.message || "Failed to follow the traveler. Please try again."
        );
      },
    });
  };

  const handleUnfollow = () => {
    unfollowTraveler(traveler._id, {
      onSuccess: (data) => {
        message.success(
          data?.message || "Successfully unfollowed the traveler!"
        );
        setIsFollowing(false);
      },
      onError: (e) => {
        message.error(
          e?.message || "Failed to unfollow the traveler. Please try again."
        );
      },
    });
  };

  return (
    <div className="space-y-2">
      {/* <div className="flex gap-4 items-center flex-wrap font-semibold text-sm">
        <p className=" text-primary cursor-pointer">
          {traveler?.followers?.length} Followers
        </p>
        <p className=" text-primary cursor-pointer">
          {traveler?.following?.length} Following
        </p>
      </div> */}
      {isFollowing ? (
        <Button
          type="primary"
          danger
          icon={<MinusCircleOutlined />}
          loading={isLoading || isPendingUnfollow}
          onClick={handleUnfollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          loading={isLoading || isPendingFollow}
          onClick={handleFollow}
          className="!rounded-3xl"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowUnfollow;
