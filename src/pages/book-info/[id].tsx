import React from "react";
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
const BookInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const { data: bookData, isLoading } = useGetBookByIdQuery(id);
  console.log({ bookData });
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
  ];
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          <div className="dark:shadow-blackShadow my-[30px] rounded-3xl shadow-xl py-[30px] md:px-[40px] px-10px">
            <h1 className="md:text-[30px] text-[24px] text-[#fff]">
              Product Info.
            </h1>
            <div className="sm:grid grid-cols-12 gap-4 my-[20px] ">
              <div className="sm:col-span-2 lg:col-span-2 col-span-2 relative">
                <Image
                  src={bookData?.image}
                  alt={bookData?.title}
                  width={400}
                  height={200}
                  className="mx-auto h-full object-cover cursor-pointer rounded-md"
                />
              </div>
              <div className="sm:col-span-8 lg:col-span-10 col-span-12 md:my-0 my-4">
                <div className="flex justify-between md:items-center items-start md:flex-row flex-col">
                  <h1 className="md:text-[30px] text-[24px] text-[#fff]">
                    {bookData?.title}
                  </h1>
                </div>
                <p className=" text-[18px] break-words">
                  <span className="font-[500] dark:text-[#fff]">
                    Description :
                  </span>
                  {bookData?.description}
                </p>
                <div>
                  <span className="dark:text-[#fff] font-[500]">Authors :</span>
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
                <TextInfo title="Author" desc="Bahaa Atekah" />
                <TextInfo title="Price" desc={bookData?.price} />
                <TextInfo
                  title="Number Of Pages"
                  desc={bookData?.numberPages}
                />
                <div className="flex justify-end  mt-[10px] gap-2">
                  <Counter />
                  <button className="btn btn-primary gap-2">
                    <span className="text-[20px]">
                      <IoCartOutline />
                    </span>
                    <span className="sm:block hidden">Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="wrapper py-[40px]">
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
          </div>
        </div>
      )}
    </>
  );
};

export default BookInfo;
