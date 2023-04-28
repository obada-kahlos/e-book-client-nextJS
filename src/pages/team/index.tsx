import React, { useEffect } from "react";
import Team from "@/components/team/team";
import Head from "next/head";
import { useRouter } from "next/router";
import { setToken } from "@/app/slices/authSlice";
import SectionTitle from "@/components/section-title/section-title";
import { useAppDispatch } from "@/app/hooks";

const TeamPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const teamData = [
    {
      img: "/images/obada.jpg",
      name: "Obada Kahlous",
      specialization: "Front-End Developer(Reactjs)",
      deec: "Hello! I’m Obada Kahlous. Front-end developer with +1 years of experience in building Web Sites.",
      href: "https://www.linkedin.com/in/obada-kahlous/",
      phoneNumber: "(963) 997-741-497",
    },
    {
      img: "/images/bahaa.jpg",
      name: "Bahaa Atekah",
      specialization: "Back-End Developer(Asp.net)",
      deec: "I'm a junior back-end developer, I'm building web apps using the Asp.net core framework and I love mathematics ,algorithms",
      href: "https://www.linkedin.com/in/bahaa-atekah-3217a3199/",
      phoneNumber: "(963) 951-584-338",
    },
  ];
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);

  return (
    <>
      <Head>
        <title>Team</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionTitle title="Developer Team" />
      <div className="wrapper md:py-[10px] py-[20px] grid grid-cols-12 gap-8 items-center justify-center">
        {teamData.map((item, key) => (
          <div className="lg:col-span-6 col-span-12" key={key}>
            <Team
              name={item.name}
              deec={item.deec}
              specialization={item.specialization}
              img={item.img}
              href={item.href}
              phoneNumber={item.phoneNumber}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamPage;
