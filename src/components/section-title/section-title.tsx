import React from "react";
import { Lora } from "@next/font/google";

interface sectionTitle {
  title: string;
}
const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

const SectionTitle: React.FC<sectionTitle> = (props) => {
  return (
    <h2
      className="text-center first-letter:text-bothColor mb-[20px] capitalize md:text-[60px] text-[26px] dark:text-dark-headingColor text-light-[#222]"
      style={{
        fontFamily: lora.style.fontFamily,
      }}
    >
      {props.title}
      <span className="text-bothColor">.</span>
    </h2>
  );
};

export default SectionTitle;
