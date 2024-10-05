import Container from "@/components/ui/Container";
import {
  CameraOutlined,
  CarOutlined,
  CompassOutlined,
  GlobalOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import React from "react";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import cardBg1 from "@/assets/images/about/6345959.jpg";
import cardBg2 from "@/assets/images/about/6346166.jpg";

const AboutUsPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-4 md:py-6">
      <Container>
        <div className="py-4 space-y-8">
          <h2 className="font-semibold text-xl md:text-2xl text-center w-4/6 md:w-3/6 mx-auto">
            TraveLeaf helps you plan your travel and provides guidance for your
            destination_
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border rounded p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <CompassOutlined className="text-5xl text-primary-1" />
                <h3 className="text-2xl font-bold">Adventure Awaits</h3>
              </div>
              <p className="text-xl text-paragraph">
                Discover thrilling adventures at every corner of the world, from
                hiking mountains to diving into oceans.
              </p>
            </div>

            <div className="border rounded p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <GlobalOutlined className="text-5xl text-primary-1" />
                <h3 className="text-2xl font-bold">Explore the World</h3>
              </div>
              <p className="text-xl text-paragraph">
                Travel to the most exotic destinations and immerse yourself in
                different cultures and experiences.
              </p>
            </div>

            <div className="border rounded p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <CameraOutlined className="text-5xl text-primary-1" />
                <h3 className="text-2xl font-bold">Capture Moments</h3>
              </div>
              <p className="text-xl text-paragraph">
                Create lasting memories with each snapshot, capturing the beauty
                and essence of your journey.
              </p>
            </div>

            <div className="border rounded p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <RocketOutlined className="text-5xl text-primary-1" />
                <h3 className="text-2xl font-bold">Fly High</h3>
              </div>
              <p className="text-xl text-paragraph">
                Experience the convenience and comfort of modern air travel,
                making your journey smooth and unforgettable.
              </p>
            </div>

            <div className="border rounded p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <CarOutlined className="text-5xl text-primary-1" />
                <h3 className="text-2xl font-bold">Road Trips</h3>
              </div>
              <p className="text-xl text-paragraph">
                Hit the road and explore new landscapes with the freedom of road
                trips, creating stories along the way.
              </p>
            </div>

            <div className="border rounded p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <MdOutlineDirectionsBoat className="text-5xl text-primary-1" />
                <h3 className="text-2xl font-bold">Sail the Seas</h3>
              </div>
              <p className="text-xl text-paragraph">
                Set sail on a grand voyage across the seas, discovering hidden
                gems and coastal beauty along the way.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Left Side: One Div */}
          <div
            className="bg-center bg-cover p-8 text-white flex flex-col justify-center items-start space-y-4 bg-blend-overlay bg-slate-800 rounded-md"
            style={{ backgroundImage: `url(${cardBg2.src})` }}
          >
            <RocketOutlined className="text-6xl text-white" />
            <h3 className="text-2xl md:text-3xl font-semibold">
              Explore New Horizons
            </h3>
            <p className="text-lg">
              Uncover amazing destinations and discover new adventures that
              await you.
            </p>
          </div>

          {/* Right Side: Two Divs */}
          <div className="space-y-8">
            {/* First Div on Right */}
            <div
              className="bg-top bg-cover p-8 text-white flex flex-col justify-center items-start space-y-4 bg-blend-overlay bg-slate-800 rounded-md"
              style={{ backgroundImage: `url(${cardBg1.src})` }}
            >
              <CompassOutlined className="text-5xl text-white" />
              <h3 className="text-2xl md:text-3xl font-semibold">
                Discover Hidden Gems
              </h3>
              <p className="text-lg">
                Find secret spots and breathtaking views that few know about.
              </p>
            </div>

            {/* Second Div on Right */}
            <div
              className="bg-bottom bg-cover p-8 text-white flex flex-col justify-center items-start space-y-4 bg-blend-overlay bg-slate-800 rounded-md"
              style={{ backgroundImage: `url(${cardBg2.src})` }}
            >
              <CarOutlined className="text-5xl text-white" />
              <h3 className="text-2xl md:text-3xl font-semibold">
                Adventure Awaits
              </h3>
              <p className="text-md">
                Embark on thrilling journeys and embrace the spirit of
                exploration.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsPage;
