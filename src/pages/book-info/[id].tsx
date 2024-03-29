import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import ImageComponent from "@/components/img/image";
import TextInfo from "@/components/text-info/text-info";
import SectionTitle from "@/components/section-title/section-title";
import Card from "@/components/card/card";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGetBookByIdQuery } from "@/api/books/api";
import Loading from "@/components/loading/loading";
import Image from "next/image";
import Counter from "@/components/counter/counter";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from "@/api/cart/api";
import { decrementCart, incrementCart } from "@/app/slices/cart.slice";
import { useAppDispatch } from "@/app/hooks";
import { toastStatus } from "@/utils/toastify";
import { setToken } from "@/app/slices/authSlice";
import { useGetUserInfQuery } from "@/api/user/api";
const BookInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;
  const { data: bookData, isLoading } = useGetBookByIdQuery(id);

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);

  const [counter, setCounter] = useState<number>(1);

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

  const [addToCart, { isSuccess, reset }] = useAddToCartMutation();
  const handleAddToCart = (id: number) => {
    addToCart({ Amount: counter, BookId: id });
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

  const ids =
    typeof window !== "undefined"
      ? (JSON.parse(localStorage.getItem("myIds") || "[]") as number[])
      : null;

  const [itemId, setItemId] = useState<boolean | null>(false);

  useEffect(() => {
    if (isSuccess) {
      toastStatus("isSuccess", "Added To Cart successfully");
    }
    if (isSuccessRemoveFromCart) {
      toastStatus("isDeleted", "Removed From Cart successfully");
    }
    reset();
    resetRemove();
  }, [isSuccess, isSuccessRemoveFromCart]);

  const { data: profileData } = useGetUserInfQuery({});

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="dark:shadow-blackShadow bg-base-100 my-[30px] rounded-3xl shadow-xl py-[30px] md:px-[40px] px-[10px] ">
            <h1 className="md:text-[30px] text-[24px] font-[600]">
              Product Info.
            </h1>
            <div className="flex justify-start items-start flex-wrap gap-8 my-[20px] ">
              <div className="relative sm:w-fit flex items-center justify-center">
                <Image
                  src={bookData?.image}
                  alt={bookData?.title}
                  width={200}
                  height={200}
                />
              </div>
              <div className="md:my-0 my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                  <h1 className="md:text-[30px] text-[24px] font-[500]">
                    {bookData?.title}
                  </h1>
                </div>
                <div className="w-8/12">
                  <TextInfo title="Description" desc={bookData?.description} />
                </div>
                <div>
                  <span className="dark:text-[#fff] font-[500]">
                    Authors :{" "}
                  </span>
                  {bookData?.authors?.length > 0 ? (
                    <>
                      {bookData?.authors?.map((item: any, key: number) => (
                        <p key={key} className="inline">
                          {item}
                        </p>
                      ))}
                    </>
                  ) : (
                    <p className="inline"> Unknown Author </p>
                  )}
                </div>
                <TextInfo title="Publisher" desc={bookData?.publishers} />
                <TextInfo title="Language" desc={bookData?.language} />
                <TextInfo title="Price" desc={bookData?.price} />
                <TextInfo title="quantity" desc={bookData?.quantity} />
                <TextInfo
                  title="Number Of Pages"
                  desc={bookData?.numberPages}
                />
              </div>
            </div>
            <div className="flex justify-end  mt-[10px] gap-2">
              <Counter
                quantity={bookData?.quantity}
                counter={counter}
                setCounter={setCounter}
              />
              <button className="btn btn-primary gap-2">
                <span className="text-[20px]">
                  <IoCartOutline />
                </span>
                <span
                  className="sm:block hidden"
                  onClick={() => {
                    handleAddToCart(bookData?.id);
                  }}>
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
          {/* <div className="wrapper py-[40px]">
            <SectionTitle title="Book You May Like It" />
            <div className="">
              <h2 className="md:text-[32px] text-[18px] text-bothColor my-[20px]">
                Gener Book.
              </h2>
              <div className="flex justify-between items-center flex-wrap ">
                {books.map((item, key) => (
                  <div className="" key={key}>
                    <Card
                      img={item.img}
                      title={item.title}
                      price={item.price}
                      href="/product-info"
                    />
                  </div>
                ))}
              </div>
              <Link href="/products">
                <h3 className="cursor-pointer text-end my-[20px] text-bothColor">
                  View All
                </h3>
              </Link>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default BookInfo;
