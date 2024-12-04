"use client";
import React from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import Image from "next/image";
import DownloadOnAppStore from "@/assets/images/footer/app_store.png";
import aamarPay from "@/assets/images/footer/aamarpay_footer.png";
import Container from "../ui/Container";
import {
  AreaChartOutlined,
  ArrowRightOutlined,
  DiscordFilled,
  FacebookFilled,
  GithubFilled,
  LinkedinFilled,
  MailFilled,
  PhoneFilled,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";

const Footer = () => {
  const footerLink = [
    { link: "about", text: "About us" },
    { link: "services", text: "Services" },
    { link: "appointment", text: "Appointment" },
    { link: "blogs", text: "Blogs" },
    { link: "contact-us", text: "FAQ" },
    { link: "terms", text: "Terms of use" },
    { link: "popular", text: "Popular" },
    { link: "adventure", text: "Adventure" },
    { link: "familty", text: "Familty Tour" },
  ];
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="bg-primary/20 pt-6">
      {/* Footer top */}
      <Container className="grid gap-10 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 py-20">
        {/* Contact info */}
        <div className="space-y-4">
          <Link
            href={"/"}
            className="font-bold text-xl flex gap-3 items-center"
          >
            <Image height={40} width={40} src={logo} alt="DocEye"></Image>{" "}
            <span className="flex">
              Trave<span className="text-secondary">Leaf</span>
            </span>
          </Link>
          <p className="flex items-center gap-3">
            <span className="inline-block p-3 bg-background rounded-full">
              <PhoneFilled />
            </span>{" "}
            0170678-5160
          </p>
          <p className="flex items-center gap-3">
            <span className="inline-block p-3 bg-background rounded-full">
              <MailFilled />
            </span>{" "}
            utsho926@gmail.com
          </p>
          <p className="flex items-center gap-3">
            <span className="inline-block p-3 bg-background rounded-full">
              <AreaChartOutlined />
            </span>{" "}
            25/fa/3 Satarkul, Badda, Dhaka, Bangladesh
          </p>
          <div className="flex gap-3">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <FacebookFilled />
            </span>
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <GithubFilled />
            </span>
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <DiscordFilled />
            </span>
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-500 text-slate-50 cursor-pointer hover:scale-110 transition">
              <LinkedinFilled />
            </span>
          </div>
        </div>

        {/* Useful link */}
        <div className="space-y-4">
          {footerLink.slice(0, 4).map((fl, ind) => {
            return (
              <Link
                key={ind}
                href={`/${fl.link}`}
                className="font-semibold text-md flex gap-3 items-center hover:text-secondary transition group"
              >
                {" "}
                <span className="group-hover:translate-x-2 transition text-secondary">
                  <ArrowRightOutlined />
                </span>
                {fl.text}
              </Link>
            );
          })}
        </div>
        <div className="space-y-4">
          {footerLink.slice(4).map((fl, ind) => {
            return (
              <Link
                key={ind}
                href={`/${fl.link}`}
                className="font-semibold text-md flex gap-3 items-center hover:text-secondary transition group"
              >
                {" "}
                <span className="group-hover:translate-x-2 transition text-secondary">
                  <ArrowRightOutlined />
                </span>
                {fl.text}
              </Link>
            );
          })}
        </div>

        {/* Download our app */}
        <div className="space-y-4">
          <h2 className="my-subtitle">Download our app</h2>
          <figure className="space-y-4 flex flex-col justify-center">
            <Image
              src={DownloadOnAppStore}
              alt="DownloadOnGooglePlay"
              height={55}
              width={130}
              className="cursor-pointer"
            ></Image>
          </figure>
        </div>
      </Container>
      {/* Footer bottom */}
      <div className="bg-primary/30 py-2 text-center">
        <Container className="flex justify-between items-center flex-wrap ">
          <p className="text-foreground text-opacity-70 font-semibold">
            {" "}
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-secondary">TraveLeaf</span>. All rights
            reserved.
          </p>
          <Link href="https://aamarpay.com">
            <Image
              src={aamarPay}
              className="w-[380px] h-auto rounded-lg bg-gray-500"
              alt="Aamar pay"
            />
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
