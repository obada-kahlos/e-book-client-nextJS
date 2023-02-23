import React from "react";

interface textInfoProps {
  title: string;
  desc: string;
}

const TextInfo: React.FC<textInfoProps> = (props) => {
  return (
    <p className="dark:text-[#fff] my-[5px]">
      <strong>{props.title}</strong> : {props.desc}
    </p>
  );
};

export default TextInfo;
