'use client'
import { ShareIcon } from '@/components/ui/icons';
import { useGetAllComment } from '@/hooks/comment.hook';
import { useDownvotedPost, useUpvotePost } from '@/hooks/post.hook';
import { useGetMe } from '@/hooks/user.hook';
import { TResponse } from '@/types';
import { TComment } from '@/types/commnet';
import { TPost } from '@/types/post';
import { TTraveler } from '@/types/user';
import { ArrowDownOutlined, ArrowUpOutlined, CommentOutlined } from '@ant-design/icons';
import { message, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const PostAction = ({ post }: { post: TPost }) => {
    const { mutate: upvotePostMutate, isPending: isLoadingUpvote } = useUpvotePost()
    const { mutate: downvotePostMutate, isPending: isLoadingDownvote } = useDownvotedPost()
    const { data: userRes, isLoading: isLoadingUser } = useGetMe()
    const { data: commentsRes, isPending: isLoadingComments } = useGetAllComment([{ name: 'post', value: post._id }])
    const router = useRouter()

    const user = userRes as TResponse<TTraveler>
    const comments = commentsRes as TResponse<TComment[]>

    const handleUpvote = (postId: string) => {

        if (!user) {
            message.error("You've to signin first!")
            router.push('/signin')
            return
        }
        upvotePostMutate(postId)
    }
    const handleDownvote = (postId: string) => {
        if (!user) {
            message.error("You've to signin first!")
            router.push('/signin')
            return
        }
        downvotePostMutate(postId)
    }



    if (isLoadingComments || isLoadingUser) return <Skeleton.Button active className='!h-[30px] !w-[180px]' />

    return (
        <div className="flex gap-6 flex-wrap">
            {(post.authorType === "Traveler" || !isLoadingUser) && <div className="inline-flex items-center gap-2 bg-gray-100 text-md font-bold rounded-3xl px-2 py-[3px] text-gray-600 cursor-default">
                <span className={`cursor-pointer ${isLoadingUpvote && 'pointer-events-none'} ${post.upvotedBy.find(upvoteUser => upvoteUser?._id === user?.data?._id) ? 'text-primary' : 'text-gray-600'}`} onClick={() => handleUpvote(post._id)}>
                    <ArrowUpOutlined className="text-lg" />
                </span>
                <span>{post.votes}</span>
                <span className={`cursor-pointer ${isLoadingDownvote && 'pointer-events-none'} ${post.downvotedBy.find(downvotedUser => downvotedUser?._id === user?.data?._id) ? 'text-primary' : 'text-gray-600'}`} onClick={() => handleDownvote(post._id)}>
                    <ArrowDownOutlined className="text-lg" />
                </span>
            </div>}

            <span className="flex items-center gap-1 cursor-pointer" onClick={() => router.push(`/blog/${post._id}#comments`)}>
                <CommentOutlined className="text-lg" /> {comments?.data?.length || 0}
            </span>
            <span className="flex items-center cursor-pointer">
                <ShareIcon />
            </span>
        </div>
    );
};

export default PostAction;