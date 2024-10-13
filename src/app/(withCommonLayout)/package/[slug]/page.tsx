'use client';
import Container from '@/components/ui/Container';
import Loading from '@/components/ui/Loading';
import { useGetSinglePackage } from '@/hooks/package.hook';
import { useGetAllPost } from '@/hooks/post.hook';
import { useCreateSubscription } from '@/hooks/subscription.hook';
import { useGetMe } from '@/hooks/user.hook';
import { TResponse } from '@/types';
import { TPackage } from '@/types/package';
import { TPost } from '@/types/post';
import { TTraveler } from '@/types/user';
import { Empty, Button, Card, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const PackageDetailsPage = ({ params }: { params: { slug: string } }) => {
    const { data: packageRes, isLoading: isLoadingPackage } = useGetSinglePackage(params.slug);
    const packageData = packageRes as TResponse<TPackage>;

    const { data: userRes, isLoading: isLoadingUser } = useGetMe();
    const user = userRes as TResponse<TTraveler>;

    const { mutate: mutateSubscription, isPending: isLoadingCreateSubscription } = useCreateSubscription();

    const { data: postsRes, isLoading: isLoadingPosts } = useGetAllPost([{ name: 'author', value: user?.data?._id }, { name: 'limit', value: 2000 }]);
    const hasUpvotedPosts = postsRes?.data?.some((post: TPost) => post.upvotedBy.length > 0);



    const handleCreateSubscription = () => {
        const subscriptionPayload = {
            user: user.data?._id,
            package: params.slug,
        };

        mutateSubscription(subscriptionPayload, {
            onSuccess: (data) => {
                if (data?.data?.payment_url) {
                    window.location.href = data.data?.payment_url; // Fixed from `window.href` to `window.location.href`
                }
            }
        });
    };

    if (isLoadingPackage || isLoadingUser || isLoadingPosts) {
        return <Loading />;
    }

    if (!packageData || !user?.data) {
        return <Empty description="Package or user data not found." />;
    }

    if (!(postsRes?.meta?.total > 0)) {
        return (
            <div className='h-[350px] flex items-center justify-center'>
                <Empty description="You have no upvoted posts to subscribe to this package." />
            </div>
        );
    }

    if (!hasUpvotedPosts) {
        return <div className='h-[350px] flex items-center justify-center'>

            <Empty description="You have no upvoted posts." />;
        </div>
    }

    return (
        <div className='py-8'>
            <Container>
                <Card title={packageData.data?.name} bordered={false}>
                    <Title level={5}>Package Details</Title>
                    <Paragraph>{packageData.data?.description}</Paragraph>
                    <Paragraph>
                        <strong>Price:</strong> ${packageData.data?.price} {packageData.data?.currencyType}<span className='text-sm'>/{packageData.data?.durationInMonths}</span>
                    </Paragraph>
                    <Button
                        loading={isLoadingCreateSubscription}
                        type="primary"
                        onClick={handleCreateSubscription}
                    >
                        Subscribe to Package
                    </Button>
                </Card>
            </Container>
        </div>
    );
};

export default PackageDetailsPage;
