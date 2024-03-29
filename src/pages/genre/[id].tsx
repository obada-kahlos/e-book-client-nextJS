import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetBookByGenreQuery, useGetGenreQuery } from "@/api/books/api";
import { IoArrowForwardOutline, IoArrowBackSharp } from "react-icons/io5";
import Card from "@/components/card/card";
import Loading from "@/components/loading/loading";
import Link from "next/link";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/api/cart/api";
import { toastStatus } from "@/utils/toastify";
import { decrementCart } from "@/app/slices/cart.slice";
import { incrementCart } from "@/app/slices/cart.slice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  decrementWish,
  incrementWish,
  removeItemWishList,
  setWishList,
} from "@/app/slices/wishList.slice";
import { setToken } from "@/app/slices/authSlice";
import { useGetUserInfQuery } from "@/api/user/api";
interface BookProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
}
interface wishListProps {
  id: number;
  title: string;
  image: string;
  price: string;
}

const Products = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBookByGenreQuery({
    id: id,
    pageSize: 30,
    pageNumber: page,
  });

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);

  const { data: genreData } = useGetGenreQuery({});
  const { asPath } = useRouter();

  const [addToCart, { isSuccess, error, isError, reset: resetAdd }] =
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
      dispatch(setWishList(itemObject));
    }
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
  const wishList = useAppSelector((state) => state.wishList.wishLists);

  const ids =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("myIds") || "[]") as number[])
      : undefined;

  const { data: profileData } = useGetUserInfQuery({});

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper py-[40px]">
          <ul
            className="md:flex items-center w-full gap-3 mb-[20px] hidden"
            id="nav">
            {genreData?.map(
              (item: { id: number; name: string }, key: number) => (
                <Link
                  key={key}
                  className={
                    asPath == `/genre/${item.id}` ? "genre-link" : "active-link"
                  }
                  href={`/genre/${item.id}`}>
                  <li className="cursor-pointer"> {item.name} </li>
                </Link>
              )
            )}
          </ul>
          <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
            {data?.response?.map((item: BookProps, key: number) => {
              const inLocal = ids ? ids.includes(item.id) : null;
              const inWishList = wishList
                ? wishList.some((wish) => wish.id === item.id)
                : null;
              return (
                <Card
                  key={key}
                  img={item.image}
                  title={item.title}
                  price={item.price}
                  handleAddToCart={() => handleAddToCart(item.id)}
                  handelRemoveFromCart={() => handelRemoveFromCart(item.id)}
                  inWishList={inWishList}
                  id={item.id}
                  handleAddTpWishList={() =>
                    handleAddToWishList(item.id, data?.response)
                  }
                  inLocal={inLocal as boolean}
                />
              );
            })}
          </div>

          <div className="flex justify-center flex-row gap-3 my-[10px]">
            <button
              className="btn btn-circle btn-primary btn-outline"
              disabled={page === 1 ? true : false}
              onClick={() => setPage(page - 1)}>
              <IoArrowBackSharp />
            </button>
            <button
              className="btn btn-circle btn-primary btn-outline"
              disabled={page === data?.metaData?.totalPage ? true : false}
              onClick={() => setPage(page + 1)}>
              <IoArrowForwardOutline />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
