import React, { useState } from "react";
import { useGetAllBooksQuery } from "@/api/books/api";
import { useGetUserInfQuery } from "@/api/user/api";
import Card from "@/components/card/card";
import InfiniteScroll from "react-infinite-scroll-component";

interface BookProps {
  id: number;
  image: string;
  price: number;
  title: string;
  description: string;
}

const Index = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data: profileData } = useGetUserInfQuery({});
  const { data = [] } = useGetAllBooksQuery({ pageNumber });
  console.log({ data });
  const fetchMoreData = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  return (
    <div className="wrapper py-[30px]">
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4></h4>}>
        <div className="flex md:justify-between justify-center gap-4 items-center flex-wrap">
          {data?.response?.map((item: BookProps, key: number) => {
            return (
              <Card
                key={key}
                id={item.id}
                img={item.image}
                price={item.price}
                title={item.title}
                desc={item.description.slice(0, 50)}
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
    </div>
  );
};

export default Index;
