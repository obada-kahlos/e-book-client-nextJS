import React from "react";
import { IoCartOutline } from "react-icons/io5";
import ImageComponent from "@/components/img/image";
import TextInfo from "@/components/text-info/text-info";
const index = () => {
  return (
    <div className="wrapper">
      <div className="dark:shadow-blackShadow my-[30px] rounded-3xl shadow-xl py-[30px] md:px-[40px] px-10px">
        <h1 className="md:text-[30px] text-[24px] text-[#fff]">
          Product Info.
        </h1>
        <div className="sm:grid grid-cols-12 gap-4 my-[20px] ">
          <div className="sm:col-span-4 lg:col-span-3  relative">
            <img src="/images/book-one.jpg" alt={"image"} className="mx-auto" />
          </div>
          <div className="sm:col-span-8 lg:col-span-9 col-span-12 md:my-0 my-4">
            <div className="flex justify-between items-center">
              <h1 className="md:text-[30px] text-[24px] text-[#fff]">
                Product Name.
              </h1>
              <button className="btn btn-primary gap-2">
                <span className="text-[20px]">
                  <IoCartOutline />
                </span>
                Add To Cart
              </button>
            </div>
            <TextInfo title="Publisher" desc="Obada Kahlous" />
            <TextInfo title="Author" desc="Bahaa Atekah" />
            <p className="my-4 dark:text-[rgba(255,255,255,0.9)]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum molestiae non ad iste harum totam repellat quia quae
              quaerat, atque aliquid optio pariatur illo corporis quisquam.
            </p>
            <TextInfo title="Price" desc="12000$" />
            <TextInfo title="Quantity" desc="6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
