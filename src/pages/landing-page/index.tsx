import { useEffect, useState } from "react";
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
import ContactUs from "@/components/contact-us/contact-us";
import { useRouter } from "next/router";

const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

const LandingPage = () => {
  const router = useRouter();
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (getToken !== null) {
      setToken(getToken);
    }
  }, [router]);

  if (token) {
    router.push("/main-page");
  }
  // token ?  : router.push("/");

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
      dataAosDuration: "1600",
      dataAosOffset: "180",
    },
    {
      icon: <IoBicycleOutline />,
      title: "Title",
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobisamet maxime quia est labore eos autem cum in earum blanditiis.",
      dataAos: "fade-up",
      dataAosDuration: "2000",
      dataAosOffset: "200",
    },
  ];
  const StatsData = [
    {
      icon: <HiOutlineArrowDownTray />,
      title: "Downloads",
      value: "31K",
      dataAos: "fade-up",
      dataAosDuration: "1200",
      dataAosOffset: "70",
    },
    {
      icon: <IoPersonAddOutline />,
      title: "New Users",
      value: "4,200",
      dataAos: "fade-up",
      dataAosDuration: "1400",
      dataAosOffset: "70",
    },
    {
      icon: <IoFolderOutline />,
      title: "New Registers",
      value: "1,200",
      dataAos: "fade-up",
      dataAosDuration: "1600",
      dataAosOffset: "70",
    },
    {
      icon: <HiOutlineArrowDownTray />,
      title: "Downloads",
      value: "31K",
      dataAos: "fade-up",
      dataAosDuration: "1800",
      dataAosOffset: "70",
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
      <div className="wrapper md:py-[30px] py-[10px]">
        <div className="md:py-[20px] hero min-h-[85vh] lg:py-[0px]">
          <div className="hero-content lg:flex-row flex-col">
            <div className="md:text-left text-center">
              <h1
                className={`wrraper-animation-first md:text-5xl text-4xl font-bold lg:w-8/12`}>
                Best Place to Find Your Favorit
                <span className="text-bothColor"> Books.</span>
              </h1>
              <p className="wrraper-animation-secound uppercase py-6">
                read 1000 books and walk 1000 miles
              </p>
              <div className="wrraper-animation-third">
                <p className="py-1 lg:w-10/12 break-words">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  nemo totam delectus ut deleniti, accusamus illum magni,
                  facilis libero dolore vero quae. Sint, impedit beatae
                  similique distinctio nihil recusandae. Itaque!
                </p>
                <Link href="login">
                  <button className="btn md:w-10/12 w-6/12 btn-primary mt-[10px]">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex items-stretch gap-6 wrraper-animation-forth">
              <div className="self-end mb-[60px] cursor-pointer">
                <img
                  alt={"image"}
                  src="/images/book-one.jpg"
                  className="max-w-sm rounded-lg shadow-2xl"
                />
              </div>
              <div className="self-end cursor-pointer lg:block hidden">
                <img
                  alt={"image"}
                  src="/images/2d8478184f3843cc96f277296fcf3966.png.jpg"
                  className="max-w-sm rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>

      <div className="wrapper">
        <SectionTitle title="Steps To Get Your Book" />
        <div className="timeline">
          <div className="container-time mb-[20px] relative w-6/12 px-[20px] py-[10px] left">
            <div
              data-aos={"fade-up-right"}
              data-aos-duration={"1200"}
              data-aos-offset={"180"}>
              <h3 className="text-[30px] text-bothColor"> .1 Register</h3>
              <p className="text-[18px] md:w-12/12 my-[12px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio magnam quaerat saepe impedit dolore?
              </p>
              <div>
                <img
                  src="/images/signin.svg"
                  alt=""
                  className="md:w-[400px] w-full mt-[20px]"
                />
              </div>
            </div>
          </div>
          <div className="container-time mb-[20px] relative w-6/12 px-[20px] py-[10px] md:ml-[30px] right">
            <div
              className=""
              data-aos={"fade-up-left"}
              data-aos-duration={"1200"}
              data-aos-offset={"180"}>
              <h3 className="text-[30px] text-bothColor">.2 Fined Your Book</h3>
              <p className="text-[18px] md:w-12/12 my-[12px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio magnam quaerat saepe impedit dolore?
              </p>
              <div className="">
                <img
                  src="/images/fiend-your-book.svg"
                  alt=""
                  className="md:w-[400px] w-full mt-[20px]"
                />
              </div>
            </div>
          </div>
          <div className="container-time mb-[20px] relative w-6/12 px-[20px] py-[10px] left">
            <div
              data-aos={"fade-up-right"}
              data-aos-duration={"1200"}
              data-aos-offset={"180"}>
              <h3 className="text-[30px] text-bothColor"> .3 Add Too Cart</h3>
              <p className="text-[18px] md:w-12/12 my-[12px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio magnam quaerat saepe impedit dolore?
              </p>
              <div>
                <img
                  src="/images/cart.svg"
                  alt=""
                  className="md:w-[400px] w-full mt-[20px]"
                />
              </div>
            </div>
          </div>
          <div className="container-time mb-[20px] relative w-6/12 px-[20px] py-[10px] md:ml-[30px] right">
            <div
              className=""
              data-aos={"fade-up-left"}
              data-aos-duration={"1200"}
              data-aos-offset={"180"}>
              <h3 className="text-[30px] text-bothColor">.4 CheckOut</h3>
              <p className="md:w-[400px] w-full mt-[20px]">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Distinctio magnam quaerat saepe impedit dolore?
              </p>
              <div className="">
                <img
                  src="/images/checkout.svg"
                  alt=""
                  className="md:w-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>

      {/* <div className="wrapper">
        <SectionTitle title="What do we offer" />
        <div className="grid grid-cols-12 gap-6 ">
          {AboutData.map((item, key) => (
            <div
              className="dark:bg-dark-bgColor bg-light-bgColor
                  border dark:border-[rgba(255,255,255,0.4)] border-[rgba(0,0,0,0.6)]
                  rounded-[30px] px-[20px] py-[40px] 
                  md:col-span-4 col-span-12 flex items-center justify-center flex-col"
              data-aos={item.dataAos}
              data-aos-duration={item.dataAosDuration}
              data-aos-offset={item.dataAosOffset}
              key={key}>
              <span className="text-[80px] mb-[20px]">{item.icon}</span>
              <h3
                className="text-[40px] text-bothColor"
                style={{
                  fontFamily: lora.style.fontFamily,
                }}>
                {item.title}
              </h3>
              <p className="text-center mt-[20px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"></div> */}

      <div className="my-[30px] ">
        <SectionTitle title="Stats" />
        <div className="overflow-y-hidden py-[80px] bg-[#2A303C] stats rounded-none  grid grid-cols-12 gap-4">
          {StatsData.map((item, key) => (
            <div
              key={key}
              className="lg:col-span-3 md:col-span-6 col-span-12 flex justify-center flex-col gap-2 items-center">
              <div
                className="stat"
                data-aos={item.dataAos}
                data-aos-duration={item.dataAosDuration}
                data-aos-offset={item.dataAosOffset}>
                <div className="stat-figure text-[#fff]  text-[30px]">
                  {item.icon}
                </div>
                <div className="stat-title text-[#fff]">{item.title}</div>
                <div className="stat-value text-bothColor">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider"></div>

      <div
        className="wrapper my-[30px] py-[30px] lg:px-0 px-8"
        data-aos={"fade-up"}
        data-aos-duration={"1200"}
        data-aos-offset={"180"}>
        <SectionTitle title="Contact us" />
        <ContactUs />
      </div>
    </>
  );
};

export default LandingPage;