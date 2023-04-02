import React, { useState } from "react";
import { useRouter } from "next/router";

import { useGetBookByGenreQuery, useGetGenreQuery } from "@/api/books/api";
import { IoArrowForwardOutline, IoArrowBackSharp } from "react-icons/io5";
import Card from "@/components/card/card";
import Loading from "@/components/loading/loading";
import Link from "next/link";

const Products = () => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBookByGenreQuery({
    id: id,
    pageSize: 30,
    pageNumber: page,
  });

  const { data: genreData } = useGetGenreQuery({});
  const { asPath } = useRouter();
  console.log({ asPath });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper py-[40px]">
          <ul className="md:flex items-center gap-3 mb-[20px] hidden">
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
          <div className="flex justify-between items-center flex-wrap sm:gap-0 gap-2">
            {data?.response?.map(
              (
                item: {
                  image: string;
                  title: string;
                  price: number;
                  id: number;
                },
                key: number
              ) => (
                <Card
                  key={key}
                  img={item.image}
                  title={item.title}
                  price={item.price}
                  href={`/book-info/${item.id}`}
                />
              )
            )}
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
