import Team from "@/components/team/team";
import Head from "next/head";
import React from "react";

const index = () => {
  const teamData = [
    {
      img: "/images/obada.jpg",
      name: "Obada Kahlous",
      specialization: "Front-End Developer(Reactjs)",
      deec: "Hello! I’m Obada Kahlous. Front-end developer with +1 years of experience in building Web Sites.",
      href: "https://www.linkedin.com/in/obada-kahlous/",
    },
    {
      img: "/images/bahaa.jpg",
      name: "Bahaa Atekah",
      specialization: "Back-End Developer(Asp.net)",
      deec: "I'm a junior back-end developer, I'm building web apps using the Asp.net core framework and I love mathematics ,algorithms",
      href: "https://www.linkedin.com/in/bahaa-atekah-3217a3199/",
    },
  ];
  return (
    <>
      <Head>
        <title>Team</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="wrapper md:py-[120px] py-[20px] grid grid-cols-12 gap-8 items-center justify-center">
        {teamData.map((item, key) => (
          <div className="lg:col-span-6 col-span-12">
            <Team
              name={item.name}
              deec={item.deec}
              specialization={item.specialization}
              img={item.img}
              href={item.href}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default index;
