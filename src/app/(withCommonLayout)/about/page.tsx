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
import Image from "next/image";
import MyMotion from "@/components/ui/MyMotion";

const teamMembers = [
  {
    name: "Ahashan Habib Utsho",
    position: "Founder & CEO",
    description:
      "Passionate traveler and entrepreneur with a love for exploration.",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQF0XUMaevRy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689594587619?e=1734566400&v=beta&t=k3g6afyEASsVQHWrTOdsMrWUtNX-6bl4XzRzx_bjBn8", // Update with actual image paths
  },
  {
    name: "Bob Smith",
    position: "Travel Advisor",
    description: "Expert in travel itineraries and customer experience.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&s",
  },
  {
    name: "Charlie Brown",
    position: "Marketing Specialist",
    description: "Creative marketer with a knack for storytelling.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Dana White",
    position: "Operations Manager",
    description: "Ensures smooth operations and logistics for all travels.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtJ7kfkEwGL8gKqJiIFN_BPJZSobTmbnZ56DsrqbDSJKnbQ2JEIgnw4MZ2VK27781BHYg&usqp=CAU",
  },
];
const AboutUsPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] py-4 md:py-6">
      <Container>
        <div className="py-4 space-y-8">
          <h2 className="font-semibold text-xl md:text-2xl text-center w-4/6 md:w-3/6 mx-auto">
            TraveLeaf helps you plan your travel and provides guidance for your
            destination_
          </h2>
          <MyMotion y={50}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="border rounded p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <CompassOutlined className="text-5xl text-primary-1" />
                  <h3 className="text-2xl font-bold">Adventure Awaits</h3>
                </div>
                <p className="text-xl text-paragraph">
                  Discover thrilling adventures at every corner of the world,
                  from hiking mountains to diving into oceans.
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
                  Create lasting memories with each snapshot, capturing the
                  beauty and essence of your journey.
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
                  Hit the road and explore new landscapes with the freedom of
                  road trips, creating stories along the way.
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
          </MyMotion>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          {/* Left Side: One Div */}
          <MyMotion x={-80} className="!h-full">
            <div
              className="h-full bg-center bg-cover p-8 text-white flex flex-col justify-center items-start space-y-4 bg-blend-overlay bg-slate-800 rounded-md"
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
          </MyMotion>

          {/* Right Side: Two Divs */}
          <div className="space-y-8">
            {/* First Div on Right */}
            <MyMotion x={80}>
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
            </MyMotion>

            {/* Second Div on Right */}
            <MyMotion x={-80}>
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
            </MyMotion>
          </div>
        </div>

        {/* Team section */}
        <div className="my-12">
          <h2 className="font-semibold text-xl md:text-2xl text-center mb-6">
            Meet Our Team_
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <MyMotion x={index % 2 === 0 ? 60 : -60} key={index}>
                <div className="border rounded p-6 text-center space-y-4">
                  <div className="!w-24 !h-24 overflow-hidden rounded-full mx-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      height={100}
                      width={100}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-md text-gray-600">{member.position}</p>
                  <p className="text-sm text-paragraph">{member.description}</p>
                </div>
              </MyMotion>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsPage;
