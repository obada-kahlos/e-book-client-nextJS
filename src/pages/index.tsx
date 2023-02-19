import Head from "next/head";
import { Lora, Anton } from "@next/font/google";
import Link from "next/link";

import {
  IoAnalytics,
  IoApertureOutline,
  IoAtCircleOutline,
  IoBicycleOutline,
  IoPersonAddOutline,
  IoFolderOutline,
} from "react-icons/io5";

import { HiOutlineArrowDownTray } from "react-icons/hi2";

import SectionTitle from "@/components/section-title/section-title";

const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

export default function Home() {
  const AboutData = [
    {
      icon: <IoAnalytics />,
      title: "Title",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobisamet maxime quia est labore eos autem cum in earum blanditiis.",
      dataAos: "fade-up",
      dataAosDuration: "1000",
      dataAosOffset: "150",
    },
    {
      icon: <IoApertureOutline />,
      title: "Title",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobisamet maxime quia est labore eos autem cum in earum blanditiis.",
      dataAos: "fade-up",
      dataAosDuration: "1400",
      dataAosOffset: "150",
    },
    {
      icon: <IoAtCircleOutline />,
      title: "Title",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobisamet maxime quia est labore eos autem cum in earum blanditiis.",
      dataAos: "fade-up",
      dataAosDuration: "1600",
      dataAosOffset: "150",
    },
    {
      icon: <IoBicycleOutline />,
      title: "Title",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobisamet maxime quia est labore eos autem cum in earum blanditiis.",
      dataAos: "fade-up",
      dataAosDuration: "1200",
      dataAosOffset: "150",
    },
  ];
  const StatsData = [
    {
      icon: <HiOutlineArrowDownTray />,
      title: "Downloads",
      value: "31K",
      desc: "Jan 1st - Feb 1st",
      dataAos: "fade-up",
      dataAosDuration: "1200",
      dataAosOffset: "30",
    },
    {
      icon: <IoPersonAddOutline />,
      title: "New Users",
      value: "4,200",
      desc: "↗︎ 400 (22%)",
      dataAos: "fade-up",
      dataAosDuration: "1400",
      dataAosOffset: "30",
    },
    {
      icon: <IoFolderOutline />,
      title: "New Registers",
      value: "1,200",
      desc: "↘︎ 90 (14%)",
      dataAos: "fade-up",
      dataAosDuration: "1600",
      dataAosOffset: "30",
    },
    {
      icon: <HiOutlineArrowDownTray />,
      title: "Downloads",
      value: "31K",
      desc: "Jan 1st - Feb 1st",
      dataAos: "fade-up",
      dataAosDuration: "1800",
      dataAosOffset: "30",
    },
  ];
  return (
    <>
      <Head>
        <title>E-Book</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper md:py-[20px] py-[80px] hero min-h-screen lg:py-[0px]">
        <div className="hero-content lg:flex-row flex-col   h-screen">
          <div>
            <h1
              className={`wrraper-animation-first text-5xl font-bold lg:w-8/12`}
            >
              Best Place to Find Your Favorit Books.
            </h1>
            <p className="wrraper-animation-secound uppercase py-6">
              read 1000 books and walk 1000 miles
            </p>
            <div className="wrraper-animation-third">
              <p className="py-1 lg:w-10/12 w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                nemo totam delectus ut deleniti, accusamus illum magni, facilis
                libero dolore vero quae. Sint, impedit beatae similique
                distinctio nihil recusandae. Itaque!
              </p>
              <Link href="login">
                <button className="btn btn-primary mt-[10px]">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="flex items-stretch gap-6 wrraper-animation-forth">
            <div className="self-end mb-[60px] cursor-pointer">
              <img
                src="/images/رواية-ليطمئن-قلبي (eloualid-book.com).jpg"
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>
            <div className="self-end cursor-pointer">
              <img
                src="/images/2d8478184f3843cc96f277296fcf3966.png.jpg"
                className="max-w-sm rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="wrapper">
        <SectionTitle title="About Us." />
        <div className="grid grid-cols-12 gap-6 items-center justify-center ">
          {AboutData.map((item, key) => (
            <div
              className="
                  dark:bg-dark-bgColor bg-light-bgColor
                  hover:shadow-myShadow hover:border-none 
                  border cursor-pointer border-[rgba(255,255,255,0.4)] 
                  rounded-[30px] px-[20px] py-[40px] 
                  md:col-span-6 col-span-12 flex items-center justify-center flex-col"
              data-aos={item.dataAos}
              data-aos-duration={item.dataAosDuration}
              data-aos-offset={item.dataAosOffset}
              key={key}
            >
              <span className="text-[80px] mb-[20px]">{item.icon}</span>
              <h3
                className="text-[40px]"
                style={{
                  fontFamily: lora.style.fontFamily,
                }}
              >
                {item.title}
              </h3>
              <p className="text-center mt-[20px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className="my-[30px]">
        <div className="wrapper overflow-hidden bg-[#2A303C] rounded-2xl grid grid-cols-12 gap-4">
          {StatsData.map((item, key) => (
            <div
              key={key}
              className="lg:col-span-3 md:col-span-6 col-span-12 flex justify-center flex-col gap-2 items-center"
            >
              <div
                className="stat"
                data-aos={item.dataAos}
                data-aos-duration={item.dataAosDuration}
                data-aos-offset={item.dataAosOffset}
              >
                <div className="stat-figure text-primary text-[30px]">
                  {item.icon}
                </div>
                <div className="stat-title">{item.title}</div>
                <div className="stat-value text-primary">{item.value}</div>
                <div className="stat-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
