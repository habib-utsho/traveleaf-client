"use client";
import Container from "@/components/ui/Container";
import Loading from "@/components/ui/Loading";
import { useGetSinglePackage } from "@/hooks/package.hook";
import { useGetAllPost } from "@/hooks/post.hook";
import { useCreateSubscription } from "@/hooks/subscription.hook";
import { useGetMe, useUserData } from "@/hooks/user.hook";
import { TResponse } from "@/types";
import { TPackage } from "@/types/package";
import { TPost } from "@/types/post";
import { TTraveler } from "@/types/user";
import { Button, Card, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const PackageDetailsPage = ({ params }: { params: { slug: string } }) => {
  const { data: packageRes, isLoading: isLoadingPackage } = useGetSinglePackage(
    params.slug
  );
  const packageData = packageRes as TResponse<TPackage>;

  const { isLoading: isLoadingBaseUser, user: baseUser } = useUserData();

  const { data: userRes, isLoading: isLoadingUser } = useGetMe();
  const user = userRes as TResponse<TTraveler>;

  const { mutate: mutateSubscription, isPending: isLoadingCreateSubscription } =
    useCreateSubscription();

  const { data: postsRes, isLoading: isLoadingPosts } = useGetAllPost([
    { name: "author", value: user?.data?._id },
    { name: "limit", value: 2000 },
  ]);
  const hasUpvotedPosts = postsRes?.data?.some(
    (post: TPost) => post.upvotedBy?.length > 0
  );

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
      },
    });
  };

  if (isLoadingPackage || isLoadingUser || isLoadingPosts) {
    return <Loading />;
  }

  const isDisabled =
    user?.data?.status === "premium" ||
    !hasUpvotedPosts ||
    !user?.data ||
    !packageData?.data ||
    baseUser?.role === "admin";

  return (
    <div className="py-8">
      <Container>
        <Card
          className="!bg-slate-800"
          title={
            <div className="flex items-center gap-2 ">
              <span className="font-semibold text-xl text-white">
                {packageData.data?.name} -
              </span>

              <p className="text-md text-gray-300">
                <span className="font-semibold text-xl">
                  {packageData.data?.price} {packageData.data?.currencyType}
                </span>
                /{packageData.data?.durationInMonths} month(s)
              </p>
            </div>
          }
          bordered={false}
        >
          <Title level={5} className="!text-gray-300">
            Package Details
          </Title>
          <p
            className="my-article"
            dangerouslySetInnerHTML={{ __html: packageData.data?.description }}
          />
          <Button
            loading={
              isLoadingCreateSubscription ||
              isLoadingPackage ||
              isLoadingPosts ||
              isLoadingUser ||
              isLoadingBaseUser
            }
            className={`mt-4 !text-gray-300  ${isDisabled ? 'opacity-40' : 'opacity-100'}`}
            type="primary"
            onClick={handleCreateSubscription}
            disabled={isDisabled}
          >
            {!user?.data
              ? "Sign In needed!"
              : baseUser?.role === "admin"
              ? "Your'e admin. Admin can't subscribe"
              : user?.data?.status === "premium"
              ? "Already Subscribed"
              : !hasUpvotedPosts
              ? "Need At Least One Upvote Post to Subscribe"
              : !packageData?.data
              ? "Package Not Available"
              : "Subscribe to Package"}
          </Button>
        </Card>
      </Container>
    </div>
  );
};

export default PackageDetailsPage;
