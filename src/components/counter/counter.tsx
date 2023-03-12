import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { number } from "yup";

const Counter = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-row">
        <button className="btn btn-circle  rounded-r-[0px] rounded-l-[7px]">
          <AiOutlineMinus />
        </button>
        <input
          pattern="\d{1,5}"
          type={"text"}
          maxLength={3}
          className="counter-input py-[9.7px] w-[50px] text-center focus:outline-none text-[18px]"
        />
        <button className="btn btn-circle rounded-l-[0px] rounded-r-[7px]">
          <AiOutlinePlus />
        </button>
      </div>
      <style>
        {`
            input.counter-input:invalid  {
            }
        `}
      </style>
    </>
  );
};

export default Counter;
