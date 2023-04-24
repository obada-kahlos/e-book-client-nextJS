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
import { useAppDispatch } from "@/app/hooks";
interface BookProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
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
      : undefined;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper py-[40px]">
          <ul className="md:flex items-center gap-3 mb-[20px] hidden" id="nav">
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
          <select className="md:hidden block w-full mb-[20px] select select-primary">
            <option disabled selected>
              Select Genre
            </option>
            {genreData?.map(
              (item: { id: number; name: string }, key: number) => (
                <option key={key} value={item.id}>
                  {item.name}
                </option>
              )
            )}
          </select>
          <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
            {data?.response?.map((item: BookProps, key: number) => {
              const inLocal = ids ? ids.includes(item.id) : null;
              return (
                <Card
                  key={key}
                  img={item.image}
                  title={item.title}
                  price={item.price}
                  handleAddToCart={() => handleAddToCart(item.id)}
                  handelRemoveFromCart={() => handelRemoveFromCart(item.id)}
                  id={item.id}
                  inLocal={inLocal as boolean}
                />
              );
            })}
          </div>

          <div className="flex justify-center flex-row gap-3 my-[10px]">
            <Link href="#nav">
              <button
                className="btn btn-circle btn-primary btn-outline"
                disabled={page === 1 ? true : false}
                onClick={() => setPage(page - 1)}>
                <IoArrowBackSharp />
              </button>
            </Link>
            <Link href="#nav" scroll={true}>
              <button
                className="btn btn-circle btn-primary btn-outline"
                disabled={page === data?.metaData?.totalPage ? true : false}
                onClick={() => setPage(page + 1)}>
                <IoArrowForwardOutline />
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
