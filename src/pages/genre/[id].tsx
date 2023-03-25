import React, { useState } from "react";
import { useRouter } from "next/router";

import { useGetBookByGenreQuery } from "@/api/books/api";
import { IoArrowForwardOutline, IoArrowBackSharp } from "react-icons/io5";
import Card from "@/components/card/card";
import Loading from "@/components/loading/loading";

const Products = () => {
  const router = useRouter();
  const { id } = router.query;

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBookByGenreQuery({
    id: 1,
    pageSize: 30,
    pageNumber: page,
  });

  console.log({ data });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper py-[40px]">
          <div className="flex justify-center items-center flex-wrap">
            {data.response.map((item: any, key: number) => (
              <Card
                key={key}
                img={item.image}
                title={item.title}
                price={item.price}
                href={`/book-info/${item.id}`}
              />
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
