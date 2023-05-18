import { useGetUserInfQuery } from "@/api/user/api";
import { setToken } from "@/app/slices/authSlice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { CiSearch } from "react-icons/ci";
import { MdOutlineSearchOff } from "react-icons/md";
import { useGetSearchQuery } from "@/api/books/api";
import Loading from "@/components/loading/loading";
import Card from "@/components/card/card";
const Search = () => {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useDispatch();

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);

  const { data: profileData } = useGetUserInfQuery({});
  const { data: searchData, isLoading } = useGetSearchQuery(search);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {searchData?.length > 0 ? (
            <div className="wrapper py-[40px]">
              <div className="flex justify-center gap-4 items-center flex-wrap">
                {searchData?.map(
                  (
                    searchItem: {
                      bookImage: string;
                      price: string;
                      title: string;
                    },
                    key: number
                  ) => {
                    return (
                      <Card
                        key={key}
                        img={searchItem?.bookImage}
                        price={searchItem?.price}
                        title={searchItem?.title}
                      />
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            <div className="relative h-[80vh] w-full flex justify-center items-center">
              <div className="flex items-center justify-center flex-col text-center">
                <span className="absolute left-[50%] top-[50%] dark:text-[rgba(255,255,255,0.4)] text-[rgba(102,102,102,0.2)] -translate-y-1/2 -translate-x-1/2 md:text-[400px] text-[70px]">
                  <MdOutlineSearchOff />
                </span>
                <h3 className=" font-bold text-[40px]">
                  No Result about
                  <span className="text-yellow-500"> {search} </span>
                </h3>
                <p className="md:text-[36px] text-[22px] lg:w-8/12 md:w10/12 w-full font-[500]">
                  Sorry, we couldn’t find any results matching your search.
                  Please try again with different keywords.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
