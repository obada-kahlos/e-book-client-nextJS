import React, { useState, useEffect } from "react";
import { useGetAllBooksQuery } from "@/api/books/api";
import { useGetUserInfQuery } from "@/api/user/api";
import Card from "@/components/card/card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setToken } from "@/app/slices/authSlice";
import { useRouter } from "next/router";
import { resetBookList } from "@/app/slices/books-list.slice";
import SkeletonBook from "@/components/skeleton-book/skeleton-book";

interface BookProps {
  id?: number;
  image?: string;
  price?: number;
  title?: string;
  description?: string;
}

const Index = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(resetBookList());
    dispatch(setToken(getToken?.token));
  }, [router, dispatch]);

  const { data: profileData } = useGetUserInfQuery({});
  const { data, isLoading } = useGetAllBooksQuery({ pageNumber });
  const bookList: BookProps[] = useAppSelector(
    (state) => state.booksListSlice.bookList
  );
  console.log({ bookList });
  const fetchMoreData = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  return (
    <div className="wrapper py-[30px]">
      {isLoading ? (
        <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
          <SkeletonBook />
          <SkeletonBook />
          <SkeletonBook />
          <SkeletonBook />
          <SkeletonBook />
          <SkeletonBook />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={bookList?.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4></h4>}>
          <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
            {bookList?.map((item, key: number) => {
              return (
                <Card
                  key={key}
                  id={item.id}
                  img={item.image}
                  price={item.price}
                  title={item.title}
                  desc={item.description ? item.description.slice(0, 50) : null}
                  //   handleAddToCart={() => handleAddToCart(item.id)}
                  //   handelRemoveFromCart={() => handelRemoveFromCart(item.id)}
                  //   handleAddTpWishList={() =>
                  //     handleAddToWishList(item.id, booksByGenreOne?.response)
                  //   }
                  //   inWishList={inWishList}
                  //   inLocal={inLocal as boolean}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Index;
