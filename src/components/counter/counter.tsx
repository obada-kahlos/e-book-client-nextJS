import React, { ReactEventHandler, useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { number } from "yup";

interface CounterProps {
  quantity: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  counter: number;
}

const Counter: React.FC<CounterProps> = ({ ...props }) => {
  return (
    <>
      <div className="flex justify-center items-center flex-row">
        <button
          className="btn btn-circle  rounded-r-[0px] rounded-l-[7px]"
          disabled={props.counter === 1 ? true : false}
          onClick={() => props.setCounter(props.counter - 1)}>
          <AiOutlineMinus />
        </button>
        <input
          pattern="\d{1,5}"
          type={"text"}
          value={props.counter}
          maxLength={3}
          className="counter-input py-[9.7px] w-[50px] text-center focus:outline-none text-[18px]"
        />
        <button
          className="btn btn-circle rounded-l-[0px] rounded-r-[7px]"
          disabled={props.counter === props.quantity ? true : false}
          onClick={() => props.setCounter(props.counter + 1)}>
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
