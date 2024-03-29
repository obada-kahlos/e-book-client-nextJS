import Card from "@/components/card/card";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetBookByGenreQuery } from "@/api/books/api";
import Loading from "@/components/loading/loading";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/api/cart/api";
import { toastStatus } from "@/utils/toastify";
import {
  decrementCart,
  incrementCart,
  setCartCount,
} from "@/app/slices/cart.slice";
import { useAppSelector, useAppDispatch } from "@/app/hooks";

import {
  decrementWish,
  incrementWish,
  removeItemWishList,
  setWishList,
  wishListProps,
} from "@/app/slices/wishList.slice";
import { useGetUserInfQuery } from "@/api/user/api";
import { setToken } from "@/app/slices/authSlice";

interface BookProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
}

const MainPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);

  const { data: booksByGenreOne, isLoading } = useGetBookByGenreQuery({
    id: 2,
    pageSize: 8,
    pageNumber: 1,
  });

  const { data: booksByGenreTow } = useGetBookByGenreQuery({
    id: 3,
    pageSize: 8,
    pageNumber: 1,
  });

  const { data: booksByGenreThree } = useGetBookByGenreQuery({
    id: 1,
    pageSize: 8,
    pageNumber: 1,
  });

  const [addToCart, { isSuccess, error, isError, data, reset: resetAdd }] =
    useAddToCartMutation();

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

  const handleAddToCart = (id: number) => {
    addToCart({ Amount: 1, BookId: id });
    setProductIdInCart(id);
  };

  const [
    removeFromCart,
    { isSuccess: isSuccessRemoveFromCart, reset: resetRemove },
  ] = useRemoveFromCartMutation({});

  const handelRemoveFromCart = (id: number) => {
    removeFromCart({ bookId: id });
    setProductIdInCart(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toastStatus("isSuccess", "Added To Cart successfully");
    }
    if (isSuccessRemoveFromCart) {
      toastStatus("isDeleted", "Removed From Cart successfully");
    }
    resetAdd();
    resetRemove();
  }, [isSuccess, isSuccessRemoveFromCart]);

  const ids =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("myIds") || "[]") as number[])
      : null;

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
      dispatch(setWishList(itemObject));
      dispatch(decrementWish(storedArray.length));
    }
  };

  const wishList = useAppSelector((state) => state.wishList.wishLists);

  const { data: profileData } = useGetUserInfQuery({});

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="wrapper flex justify-center items-center min-h-[350px]">
            <div className="text-center">
              <div className="max-w-2xl">
                <h1
                  className={`md:text-5xl text-4xl font-bold lg:w-12/12 text-yellow-500`}>
                  Best Place to Find Your Favorite
                  <span className="text-bothColor"> Books.</span>
                </h1>
                <p className="py-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  nemo totam delectus ut deleniti, accusamus illum magni,
                  facilis libero dolore vero quae. Sint, impedit beatae
                  similique distinctio nihil recusandae. Itaque!
                </p>
                <a href={"#books"}>
                  <button className="btn btn-primary">Fiend Your Book</button>
                </a>
              </div>
            </div>
          </div>
          <div
            className="wrapper relative min-h-[400px] box-border"
            style={{ backgroundPosition: "center center" }}>
            <div style={{ boxSizing: "inherit" }} className="flex">
              <div className="min-h-[500px]">
                <img
                  src="/images/home-bg.png"
                  alt="bg-iamge"
                  className="home-image"
                />
              </div>
            </div>
          </div>
          <div className="divider"></div>
          {booksByGenreOne?.response?.length > 0 ? (
            <div className="wrapper py-[40px]" id={"books"}>
              <h2 className="md:text-[32px] text-[18px] text-bothColor my-[20px]">
                Arabic literature
              </h2>
              <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
                {booksByGenreOne?.response?.map(
                  (item: BookProps, key: number) => {
                    const inLocal = ids ? ids.includes(item.id) : null;
                    const inWishList = wishList
                      ? wishList.some((wish) => wish.id === item.id)
                      : null;
                    return (
                      <Card
                        key={key}
                        id={item.id}
                        img={item.image}
                        price={item.price}
                        title={item.title}
                        desc={item.description.slice(0, 50)}
                        handleAddToCart={() => handleAddToCart(item.id)}
                        handelRemoveFromCart={() =>
                          handelRemoveFromCart(item.id)
                        }
                        handleAddTpWishList={() =>
                          handleAddToWishList(
                            item.id,
                            booksByGenreOne?.response
                          )
                        }
                        inWishList={inWishList}
                        inLocal={inLocal as boolean}
                      />
                    );
                  }
                )}
              </div>
              {booksByGenreOne?.response?.length > 5 && (
                <Link href="/genre/1">
                  <button className="cursor-pointer btn btn-outline block ml-auto my-[20px] text-bothColor">
                    View All
                  </button>
                </Link>
              )}
            </div>
          ) : null}

          {booksByGenreTow?.response?.length > 0 ? (
            <div className="wrapper py-[40px]">
              <h2 className="md:text-[32px] text-[18px] text-bothColor my-[20px]">
                Islamic literature
              </h2>
              <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
                {booksByGenreTow?.response?.map(
                  (item: BookProps, key: number) => {
                    const inLocal = ids ? ids.includes(item.id) : null;
                    const inWishList = wishList
                      ? wishList.some((wish) => wish.id === item.id)
                      : null;
                    return (
                      <Card
                        key={key}
                        id={item.id}
                        img={item.image}
                        price={item.price}
                        title={item.title}
                        inLocal={inLocal as boolean}
                        inWishList={inWishList}
                        handleAddToCart={() => handleAddToCart(item.id)}
                        handelRemoveFromCart={() =>
                          handelRemoveFromCart(item.id)
                        }
                        handleAddTpWishList={() =>
                          handleAddToWishList(
                            item.id,
                            booksByGenreTow?.response
                          )
                        }
                        desc={item.description.slice(0, 50)}
                      />
                    );
                  }
                )}
              </div>
              {booksByGenreTow?.response?.length > 5 && (
                <Link href="/genre/2">
                  <button className="cursor-pointer btn btn-outline block ml-auto my-[20px] text-bothColor">
                    View All
                  </button>
                </Link>
              )}
            </div>
          ) : null}

          {booksByGenreThree?.response?.length > 0 ? (
            <div className="wrapper py-[40px]" id={"books"}>
              <h2 className="md:text-[32px] text-[18px] text-bothColor my-[20px]">
                Novel
              </h2>
              <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
                {booksByGenreOne?.response?.map(
                  (item: BookProps, key: number) => {
                    const inLocal = ids ? ids.includes(item.id) : null;
                    const inWishList = wishList
                      ? wishList.some((wish) => wish.id === item.id)
                      : null;
                    return (
                      <Card
                        key={key}
                        id={item.id}
                        img={item.image}
                        price={item.price}
                        title={item.title}
                        desc={item.description.slice(0, 50)}
                        handleAddToCart={() => handleAddToCart(item.id)}
                        handelRemoveFromCart={() =>
                          handelRemoveFromCart(item.id)
                        }
                        handleAddTpWishList={() =>
                          handleAddToWishList(
                            item.id,
                            booksByGenreOne?.response
                          )
                        }
                        inWishList={inWishList}
                        inLocal={inLocal as boolean}
                      />
                    );
                  }
                )}
              </div>
              {booksByGenreOne?.response?.length > 5 && (
                <Link href="/genre/1">
                  <button className="cursor-pointer btn btn-outline block ml-auto my-[20px] text-bothColor">
                    View All
                  </button>
                </Link>
              )}
            </div>
          ) : null}

          <div className="divider"></div>
        </>
      )}
    </>
  );
};

export default MainPage;
