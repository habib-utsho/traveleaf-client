'use client'
import { useGetMe } from '@/hooks/user.hook';
import { TTraveler } from '@/types/user';
import { EditOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';


const EditProfile = ({ traveler, className }: { traveler: TTraveler, className?: string }) => {
    const { data:user, isPending } = useGetMe();


    // Check if traveler and user IDs match
    const canEdit = traveler._id === user?.data?._id;

    if (isPending || !canEdit || user?.data?.user?.role === 'admin') return null
    return (
            <Link href={`/dashboard/traveler/profile`} className={` !text-primary h-8 w-8 bg-gray-500 rounded-full inline-flex items-center justify-center ${className}`}>
                    <EditOutlined className='!text-xl'/>
            </Link>
    );
};

export default EditProfile;
