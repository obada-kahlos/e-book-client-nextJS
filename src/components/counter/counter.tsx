import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { number } from "yup";

const Counter = () => {
  const [counter, setCounter] = useState<number>(1);
  return (
    <>
      <div className="flex justify-center items-center flex-row">
        <button
          className="btn btn-circle  rounded-r-[0px] rounded-l-[7px]"
          disabled={counter === 1 ? true : false}
          onClick={() => setCounter(counter - 1)}>
          <AiOutlineMinus />
        </button>
        <input
          pattern="\d{1,5}"
          type={"text"}
          value={counter}
          maxLength={3}
          className="counter-input py-[9.7px] w-[50px] text-center focus:outline-none text-[18px]"
          // onChange={(e: any) => setCounter(e.target.value)}
        />
        <button
          className="btn btn-circle rounded-l-[0px] rounded-r-[7px]"
          disabled={counter === 999 ? true : false}
          onClick={() => setCounter(counter + 1)}>
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
