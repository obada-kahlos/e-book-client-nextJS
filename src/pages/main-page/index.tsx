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
import { useGetUserInfQuery } from "@/api/user/api";
import {
  handleAddToWishList,
  wishListProps,
} from "@/utils/set-product-id-in-cart";
import {
  decrementCart,
  incrementCart,
  setCartCount,
} from "@/app/slices/cart.slice";
import { useAppDispatch } from "@/app/hooks";

interface BookProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
}

const MainPage = () => {
  const dispatch = useAppDispatch();

  const { data: booksByGenreOne, isLoading } = useGetBookByGenreQuery({
    id: 1,
    pageSize: 6,
    pageNumber: 1,
  });

  console.log({ booksByGenreOne });
  const { data: booksByGenreTow } = useGetBookByGenreQuery({
    id: 2,
    pageSize: 6,
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
  const { data: clientProfile } = useGetUserInfQuery({});

  const ids =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("myIds") || "[]") as number[])
      : null;
  const localWishList =
    typeof window !== "undefined"
      ? (JSON.parse(
          localStorage.getItem("wishList") || "[]"
        ) as wishListProps[])
      : null;

  const [wishList, setWishList] = useState<wishListProps[] | null>();
  useEffect(() => {
    setWishList(localWishList);
  }, []);
  console.log({ wishList });

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
                <h1 className={`md:text-5xl text-4xl font-bold lg:w-12/12`}>
                  Best Place to Find Your Favorite
                  <span className="text-bothColor"> Books.</span>
                </h1>
                <p className="py-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  nemo totam delectus ut deleniti, accusamus illum magni,
                  facilis libero dolore vero quae. Sint, impedit beatae
                  similique distinctio nihil recusandae. Itaque!
                </p>
                <button className="btn btn-primary">Get Started</button>
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
            <div className="wrapper py-[40px]">
              <h2 className="md:text-[32px] text-[18px] text-bothColor my-[20px]">
                Genre Book.
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
                  <h3 className="cursor-pointer text-end my-[20px] text-bothColor">
                    View All
                  </h3>
                </Link>
              )}
            </div>
          ) : (
            <div className="h-[70vh] flex justify-center items-center w-full text-bothColor md:text-[40px] text-[22px]">
              No Data! Something went wrong!...
            </div>
          )}

          {booksByGenreTow?.response?.length > 0 ? (
            <div className="wrapper py-[40px]">
              <h2 className="md:text-[32px] text-[18px] text-bothColor my-[20px]">
                Genre Book.
              </h2>
              <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
                {booksByGenreTow?.response?.map(
                  (item: BookProps, key: number) => {
                    const inLocal = ids ? ids.includes(item.id) : null;
                    return (
                      <Card
                        key={key}
                        id={item.id}
                        img={item.image}
                        price={item.price}
                        title={item.title}
                        inLocal={inLocal as boolean}
                        handleAddToCart={() => handleAddToCart(item.id)}
                        handelRemoveFromCart={() =>
                          handelRemoveFromCart(item.id)
                        }
                        // handleAddTpWishList={() => setProductInCart(item.id)}
                        desc={item.description.slice(0, 50)}
                      />
                    );
                  }
                )}
              </div>
              {booksByGenreTow?.response?.length > 5 && (
                <Link href="/genre/2">
                  <h3 className="cursor-pointer text-end my-[20px] text-bothColor">
                    View All
                  </h3>
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
