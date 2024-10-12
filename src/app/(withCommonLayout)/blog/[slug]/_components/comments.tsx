'use client'

import { useCreateComment, useGetAllComment } from '@/hooks/comment.hook';
import { TPost } from '@/types/post';
import { Button, List, Form, Pagination, Skeleton, Avatar } from 'antd';
import React, { useState } from 'react';
import { TResponse } from '@/types';
import { TComment } from '@/types/commnet';
import MyInp from '@/components/ui/Form/MyInp';
import { useGetMe } from '@/hooks/user.hook';
import { TTraveler } from '@/types/user';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { ClockCircleOutlined } from '@ant-design/icons';

const Comments = ({ post }: { post: TPost }) => {
    const [pagination, setPagination] = useState({ limit: 10, page: 1 })
    const { data: commentsres, isPending: isLoadingComments } = useGetAllComment([{ name: 'post', value: post._id }]);

    const router = useRouter()
    const { mutate: createCommentMutate, isPending: isLoadingCreateComment } = useCreateComment();


    const { data: userRes, isLoading: isLoadingUser } = useGetMe()
    const user = userRes as TResponse<TTraveler>


    const comments = commentsres as TResponse<TComment[]>



    const [form] = Form.useForm();

    // Comment handler
    const handleCreateComment = async (values: { comment: string }) => {

        const newComment = {
            user: user.data?._id,
            comment: values.comment,
            post: post._id,
        };

        createCommentMutate(newComment, {
            onSuccess: () => {
                form.resetFields(); // Clear input field
            },
        });
    };

    return (
        <div className='space-y-6 ' id='comments'>
            <Form form={form} onFinish={handleCreateComment} layout='vertical'>
                <MyInp
                    type='textarea'
                    name={'comment'}
                    label='Add your comment'
                    placeholder="Add a comment..."
                    rows={9}
                />
                <div className='text-right'>

                    <Button
                        type="primary"
                        loading={isLoadingCreateComment}
                        htmlType="submit"
                    >
                        Add Comment
                    </Button>
                </div>
            </Form>

            {isLoadingComments ? (
                <Skeleton.Button active className='!h-[180px] !w-full' />
            ) : (comments?.meta?.total ?? 0) > 0 && post.authorType === "Traveler" && (
                <>
                    <List
                        dataSource={comments?.data}
                        renderItem={(comment: TComment) => (
                            <List.Item key={comment._id} className='bg-white rounded-md shadow my-2'>
                                <div className='space-y-3 px-4 py-2 w-full'>

                                    <div className='flex items-center gap-2 flex-wrap justify-between'>

                                        <div className='inline-flex gap-2 items-center cursor-pointer ' onClick={() => router.push(`/profile/${comment.user?._id}`)}>

                                            <Avatar
                                                size="large"
                                                src={
                                                    comment.user?.profileImg ||
                                                    "https://i.pravatar.cc/150?u=a04258a2462d826712d"
                                                }
                                                className="cursor-pointer"
                                                alt={comment.user?.name}
                                            />
                                            <p className='text-gray-600'>{comment.user?.name}</p>
                                        </div>
                                        {comment.createdAt && <span><ClockCircleOutlined />  {moment(new Date(comment.createdAt)).fromNow()} </span>}

                                    </div>
                                    <p className='text-gray-600'>{comment.comment}</p>

                                </div>
                            </List.Item>
                        )}
                    />
                    <div className='justify-end flex '>

                        <Pagination
                            current={comments.meta?.page}
                            pageSize={pagination.limit}
                            total={comments.meta?.total}
                            onChange={(page) => setPagination({ ...pagination, page })}
                            showSizeChanger={false}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Comments;
