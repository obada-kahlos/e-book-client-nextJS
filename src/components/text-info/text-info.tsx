import React from "react";

interface textInfoProps {
  title: string;
  desc: string;
}

const TextInfo: React.FC<textInfoProps> = (props) => {
  return (
    <p className="my-[5px] break-words">
      <span className="font-[500] dark:text-[#fff]">{props.title} : </span>
      {props.desc}
    </p>
  );
};

export default TextInfo;
