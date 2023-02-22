import React from "react";

import { IoLogoFacebook, IoLogoWhatsapp, IoLogoGithub } from "react-icons/io5";

interface teamProps {
  name: string;
  deec: string;
  specialization: string;
  img: string;
  href: string;
}

const Team: React.FC<teamProps> = (props) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noreferrer"
      className="transition-all hover:dark:shadow-blackShadow shadow-xl py-[20px] flex flex-col items-center justify-center text-center cursor-pointer"
    >
      <div className="lg:w-[300px] lg:h-[300px] w-[240px] h-[240px] rounded-full overflow-hidden border-[5px] border-bothColor">
        <img
          src={props.img}
          alt="project-team"
          className="object-cover w-full h-full"
        />
      </div>
      <h4 className="text-[40px] dark:text-[#fff] text-[#191919]">
        {props.name}.
      </h4>
      <p className="text-[26px] text-bothColor"> {props.specialization} </p>
      <p>{props.deec}</p>
      <div className="flex gap-4 mt-[10px]">
        <button className="btn btn-circle text-[18px]">
          <IoLogoFacebook />
        </button>
        <button className="btn btn-circle text-[18px]">
          <IoLogoWhatsapp />
        </button>
        <button className="btn btn-circle text-[18px]">
          <IoLogoGithub />
        </button>
      </div>
    </a>
  );
};

export default Team;
