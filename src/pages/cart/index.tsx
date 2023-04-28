import { useGetCartBookQuery, useRemoveFromCartMutation } from "@/api/cart/api";
import Card from "@/components/card/card";
import Head from "next/head";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BsCartCheck } from "react-icons/bs";
import { toastStatus } from "@/utils/toastify";
import { decrementCart, incrementCart } from "@/app/slices/cart.slice";
import { useAppDispatch } from "@/app/hooks";
import { setToken } from "@/app/slices/authSlice";
const Cart = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useGetCartBookQuery({});
  const router = useRouter();

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);

  const [
    removeFromCart,
    { isSuccess: isSuccessRemoveFromCart, reset: resetRemove },
  ] = useRemoveFromCartMutation({});

  console.log({ isSuccessRemoveFromCart });

  const setProductIdInCart = (id: number) => {
    const ids = JSON.parse(localStorage.getItem("myIds") || "[]") as number[];
    if (ids.includes(id)) {
      const newIds = ids.filter((item) => item !== id);
      localStorage.setItem("myIds", JSON.stringify(newIds));
      dispatch(decrementCart(newIds.length));
    } else {
      const newIds = [...ids, id];
      localStorage.setItem("myIds", JSON.stringify(newIds));
      dispatch(incrementCart(newIds.length));
    }
  };

  const handleRemoveItemFromCart = (id: number) => {
    removeFromCart({ bookId: id });
    setProductIdInCart(id);
  };

  useEffect(() => {
    if (isSuccessRemoveFromCart) {
      toastStatus("isDeleted", "Removed From Cart successfully");
    }
    refetch();
    resetRemove();
  }, [isSuccessRemoveFromCart, router, refetch, resetRemove]);

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper mt-10">
        {data?.response?.length > 0 ? (
          <>
            <h2 className="md:text-[30px] text-[20px] my-4">
              Items In Cart : {data?.response?.length}
            </h2>
            <div className="overflow-x-auto my-[40px]">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.response?.map(
                    (
                      item: {
                        bookId: number;
                        bookPhoto: string;
                        bookName: string;
                        price: number;

                        amount: number;
                      },
                      key: number
                    ) => (
                      <tr key={key}>
                        <td> {item?.bookId} </td>
                        <td>
                          <img
                            src={item?.bookPhoto}
                            alt=""
                            className="w-[120px] object-cover"
                          />
                        </td>
                        <td> {item?.bookName} </td>
                        <td> {item?.price} </td>
                        <td> {item?.amount} </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="btn gap-2"
                              onClick={() =>
                                handleRemoveItemFromCart(item.bookId)
                              }>
                              <IoCloseCircleOutline className="text-[20px]" />
                            </button>
                            <button className="btn gap-2">
                              <BsCartCheck className="text-[20px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className=" h-[80vh] flex justify-center items-center flex-col">
            <h1 className="dark:text-[#fff] md:text-[40px] text-[22px]">
              Your Cart is Empty!
            </h1>
            <Link href={"/main-page"} className="btn btn-primary my-[10px]">
              Add Some
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
