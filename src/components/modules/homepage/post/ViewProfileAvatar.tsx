'use client'
import { VerifiedBadgeIcon } from '@/components/ui/icons';
import { TPost } from '@/types/post';
import { TrophyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ViewProfileAvatar = ({ post }: { post: TPost }) => {
    const router = useRouter()

    return (
        <div>
            <Tooltip
                title={
                    post?.authorType === "Traveler"
                        ? "Click to view profile"
                        : post?.authorType === "Admin"
                            ? "Admin - No profile view available"
                            : ""
                }
            >
                <div
                    onClick={() =>
                        post?.authorType === "Traveler" &&
                        router.push(`/profile/${post?.author?._id}`)
                    }
                    className={`flex items-center gap-2 flex-wrap text-primary ${post?.authorType === "Admin" ? "" : "cursor-pointer"
                        }`}
                >
                    <div className='h-[40px] w-[40px]'>

                    <Image
                        src={post.author?.profileImg}
                        alt={post.author?.name}
                        className="rounded-full h-full w-full"
                        width={30}
                        height={30}
                        />
                        </div>
                    <div className="flex gap-[2px] flex-col p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
                        <span className="font-semibold text-primary flex items-center gap-1">
                            {post.author?.name}           {post?.author?.user?.status === 'premium' && <span className="h-5 w-5 rounded-full flex items-center justify-center  text-primary text-xl">
                                <VerifiedBadgeIcon />
                            </span>}
                        </span>
                        {post.authorType === "Admin" && (
                            <span className="flex gap-1 items-center font-semibold text-warning">
                                <TrophyOutlined />
                                {post.authorType}
                            </span>
                        )}
                    </div>
                </div>
            </Tooltip>
        </div>
    );
};

export default ViewProfileAvatar;