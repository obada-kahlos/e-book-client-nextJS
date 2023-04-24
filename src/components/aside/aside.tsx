import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineShoppingCart,
  AiOutlineEye,
} from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "@/app/hooks";

import { toggleWishList } from "@/app/slices/wishList.slice";
import Link from "next/link";

const Aside = () => {
  const toggle = useAppSelector((state) => state.wishList.toggle);
  const dispatch = useAppDispatch();

  return (
    <>
      <aside className="wish-list bg-base-100 shadow-lg">
        <div className="header">
          <p className="text-[#fff] font-bold"> Wish List </p>
          <span
            onClick={() => dispatch(toggleWishList())}
            className="btn btn-ghost btn-circle text-[#fff]">
            <AiOutlineArrowRight />
          </span>
        </div>
        <div className="p-2">
          <div className="w-full flex justify-center items-center flex-col text-center gap-1 py-2">
            <img
              src="/images/book-one.jpg"
              alt=""
              className="w-[120px] rounded-sm"
            />
            <h3> Book Name </h3>
            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
            <h3> Price </h3>
            <div className="flex gap-2">
              <span className="btn btn-primary btn-circle text-[18px]">
                <AiOutlineShoppingCart />
              </span>
              <Link href={""} className="btn btn-ghost btn-circle text-[18px]">
                <AiOutlineEye />
              </Link>
              <span className="btn btn-ghost btn-circle text-[18px]">
                <AiOutlineDelete />
              </span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[rgba(255,255,255,0.7)]"></div>
        </div>
      </aside>
      <style>
        {`
            aside.wish-list{
                position : fixed;
                bottom : 0;
                right : ${toggle ? "0%" : "-200%"};
                width : 400px;
                height : 100vh;
                z-index : 99999;
                overflow-y : auto;
                overflow-x : hidden;
                transition: 0.3s ease;
            }
            aside.wish-list::-webkit-scrollbar{
              display : none
            }
            aside div.header{
                width: 100%;
                padding : 10px 20px;
                display : flex; 
                justify-content : space-between;
                align-items: center;
                border-bottom : 1px solid #ffffff;
            }   
            `}
      </style>
    </>
  );
};

export default Aside;
