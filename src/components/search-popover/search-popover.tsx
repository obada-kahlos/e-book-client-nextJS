import { useGetSearchQuery } from "@/api/books/api";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetSearch } from "@/app/slices/search.slice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface bookSearchInterface {
  id: number;
  bookImage: string;
  title: string;
  price: string;
  authors: string[];
}

const SearchPopover = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.search);

  const { data: searchData, isLoading } = useGetSearchQuery(search);

  return (
    <>
      <div className="search-popover absolute bg-base-100 shadow-xl sm:w-[400px] w-[300px] max-h-[400px] overflow-hidden overflow-y-auto  rounded-[10px]">
        {searchData?.map((item: bookSearchInterface, key: number) => {
          return (
            <Link
              href={`/book-info/${item?.id}`}
              key={key}
              onClick={() => dispatch(resetSearch())}>
              <div className="flex items-center gap-4 px-[10px] my-[5px] transition-all duration-300 hover:bg-[rgba(0,0,0,0.1)] w-full">
                <Image
                  width={40}
                  height={40}
                  src={item?.bookImage}
                  alt={item?.title}
                />
                <div>
                  <h4 className="dark:text-[#fff] text-[#333]">
                    {item?.title}
                  </h4>
                  <span className="dark:text-[#fff] text-[#333]">
                    {item?.price}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <style>
        {`
            
          `}
      </style>
    </>
  );
};

export default SearchPopover;
