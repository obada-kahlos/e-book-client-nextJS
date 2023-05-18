import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";

import { useAppSelector, useAppDispatch } from "@/app/hooks";

import {
  decrementWish,
  incrementWish,
  removeItemWishList,
  setWishList,
  toggleWishList,
  wishListProps,
} from "@/app/slices/wishList.slice";
import Link from "next/link";

const Aside = () => {
  const dispatch = useAppDispatch();
  const toggle = useAppSelector((state) => state.wishList.toggle);
  const wishList = useAppSelector((state) => state.wishList.wishLists);

  const handleAddToWishList = (id: number, array: wishListProps[]) => {
    const storedArray = JSON.parse(localStorage.getItem("wishList") || "[]");
    const itemObject: any = array.find((item) => item.id === id);
    if (storedArray.some((item: wishListProps) => item.id === id)) {
      const updatedArray = storedArray.filter(
        (item: wishListProps) => item.id !== id
      );
      localStorage.setItem("wishList", JSON.stringify(updatedArray));
      dispatch(incrementWish(updatedArray.length));
      dispatch(removeItemWishList(id));
    } else {
      storedArray.push(itemObject);
      localStorage.setItem("wishList", JSON.stringify(storedArray));
      dispatch(decrementWish(storedArray.length));
    }
  };

  return (
    <>
      <aside className="wish-list bg-base-100 dark:shadow-lg shadow">
        <div className="header">
          <p className="font-bold"> Wish List </p>
          <span
            onClick={() => dispatch(toggleWishList())}
            className="btn btn-ghost btn-circle ">
            <AiOutlineArrowRight />
          </span>
        </div>

        {wishList?.length > 0 ? (
          <>
            {wishList?.map((wishItem, key) => {
              return (
                <div className="p-2" key={key}>
                  <div className="w-full flex justify-center items-center flex-col text-center gap-1 py-2">
                    <img
                      src={wishItem.image}
                      alt={wishItem.title}
                      className="w-[120px] rounded-sm"
                    />
                    <h3> {wishItem.title} </h3>
                    <p>{wishItem?.description}</p>
                    <h3> {wishItem.price} </h3>
                    <div className="flex gap-2">
                      <Link
                        onClick={() => dispatch(toggleWishList())}
                        href={`/book-info/${wishItem.id}`}
                        className="btn btn-info btn-outline btn-circle text-[18px]">
                        <AiOutlineEye />
                      </Link>
                      <span
                        onClick={() =>
                          handleAddToWishList(wishItem.id, wishList)
                        }
                        className={`btn btn-error btn-outline btn-circle text-[18px]`}>
                        <AiOutlineDelete />
                      </span>
                    </div>
                  </div>
                  <div className="divider"></div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="h-[calc(100vh-65px)] text-yellow-500 font-bold text-[24px] text-center flex justify-center items-center text-ellipsis">
            Your Wish List Is Empty.
          </div>
        )}
      </aside>
      <>
        {toggle && (
          <div
            className="fixed z-[999] top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.1)]"
            onClick={() => dispatch(toggleWishList())}></div>
        )}
      </>
      <style>
        {`
            aside.wish-list{
                position : fixed;
                bottom : 0;
                right : ${toggle ? "0%" : "-200%"};
                width : 400px;
                height : 100vh;
                overflow-y : auto;
                overflow-x : hidden;
                transition: 0.3s ease;
                z-index : 999999;
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
                border-bottom : 1px solid #333;
            }   
            `}
      </style>
    </>
  );
};

export default Aside;
