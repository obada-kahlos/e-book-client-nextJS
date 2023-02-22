import React from "react";
import { IoCartOutline } from "react-icons/io5";
const index = () => {
  return (
    <div className="wrapper">
      <div className="dark:shadow-blackShadow my-[30px] shadow-xl py-[30px] md:px-[40px] px-10px">
        <h1 className="md:text-[30px] text-[24px] text-[#fff]">
          Product Info.
        </h1>
        <div className="grid grid-cols-12 gap-4 my-[20px]">
          <div className="lg:col-span-4 col-span-12">
            <img
              src="/images/رواية-ليطمئن-قلبي (eloualid-book.com).jpg"
              alt={"image"}
            />
          </div>
          <div className="lg:col-span-8 col-span-12 md:my-0 my-4">
            <div className="flex justify-between items-center">
              <h1 className="md:text-[30px] text-[24px] text-[#fff]">
                Product Name.
              </h1>
              <button className="btn btn-primary gap-2">
                <span className="text-[20px]">
                  <IoCartOutline />
                </span>
                Button
              </button>
            </div>
            <p className="my-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum molestiae non ad iste harum totam repellat quia quae
              quaerat, atque aliquid optio pariatur illo corporis quisquam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
