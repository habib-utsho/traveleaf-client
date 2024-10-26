
'use client'

import CreatePostModal from './CreatePostModal';
import { TPost } from '@/types/post';
import { EllipsisHorizontalIcon, } from "@/components/ui/icons";
import { useDeletePost } from "@/hooks/post.hook";
import { useEffect, useState } from "react";
import { Dropdown, Menu, Modal, message } from "antd";
import { useGetMe } from '@/hooks/user.hook';

const PostMenu = ({ post }: { post: TPost }) => {
    const { mutate: deletePostMutate, isPending: isLoaidngDeletePost } = useDeletePost()
    const { data: user, isPending: isLoadingGetMe } = useGetMe()



    const [editingPost, setEditingPost] = useState<TPost | null>(null)
    const postMenu = (post: TPost) => (
        <Menu>
            <Menu.Item onClick={() => setEditingPost({ ...post })}>
                Edit
            </Menu.Item>
            <Menu.Item onClick={() => handleDeletePost(post?._id)}>
                Delete
            </Menu.Item>
        </Menu>
    );


    useEffect(() => {
        if (isLoaidngDeletePost) {
            message.loading('Deleting post...')
        }
    }, [isLoaidngDeletePost])


    const handleDeletePost = (postId: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this post?',
            onOk: () => {
                deletePostMutate(postId);
            },
        });
    };

    // Check if traveler and user IDs match
    const canEdit = post.author?._id === user?.data?._id;

    if(!canEdit || isLoadingGetMe) return null;

    return (
        <>

            <Dropdown overlay={postMenu(post)} trigger={['click']}>
                <span className='text-lg cursor-pointer'>
                    <EllipsisHorizontalIcon className="text-xl text-primary cursor-pointer" />
                </span>
            </Dropdown>
            {/* update post */}
            {editingPost && <CreatePostModal editingPost={editingPost} setEditingPost={setEditingPost} />}
        </>
    );


};

export default PostMenu;