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
      className="text-center mb-[20px] md:text-[60px] dark:text-dark-headingColor text-light-[#222]"
      style={{
        fontFamily: lora.style.fontFamily,
      }}
    >
      {props.title}
    </h2>
  );
};

export default SectionTitle;
