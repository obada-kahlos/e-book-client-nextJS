import React, { useState } from "react";
import { useRouter } from "next/router";

import { useGetBookByGenreQuery } from "@/api/books/api";
import { IoArrowForwardOutline, IoArrowBackSharp } from "react-icons/io5";
import Card from "@/components/card/card";
import Loading from "@/components/loading/loading";

const Products = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBookByGenreQuery({
    id: 1,
    pageSize: 30,
    pageNumber: page,
  });
  console.log({ page });

  const books = [
    {
      img: "/images/book-one.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
    {
      img: "/images/2d8478184f3843cc96f277296fcf3966.png.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
    {
      img: "/images/book-one.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
    {
      img: "/images/2d8478184f3843cc96f277296fcf3966.png.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
    {
      img: "/images/book-one.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
    {
      img: "/images/2d8478184f3843cc96f277296fcf3966.png.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
    {
      img: "/images/2d8478184f3843cc96f277296fcf3966.png.jpg",
      title: "Book's Name.",
      price: "12300$",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper py-[40px]">
          <div className="flex justify-between items-center flex-wrap">
            {books.map((item, key) => (
              <div
                className="xl:w-[calc(90%/6)] lg:w-[calc(90%/5)] sm:w-[calc(90%/3)] w-[calc(90%/2)]"
                key={key}>
                <Card
                  img={item.img}
                  title={item.title}
                  price={item.price}
                  href="/product-info"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end flex-row gap-3 my-[10px]">
            <button
              className="btn btn-circle btn-primary btn-outline"
              disabled={page === 1 ? true : false}
              onClick={() => setPage(page - 1)}>
              <IoArrowBackSharp />
            </button>
            <button
              className="btn btn-circle btn-primary btn-outline"
              disabled={page === 10 ? true : false}
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
