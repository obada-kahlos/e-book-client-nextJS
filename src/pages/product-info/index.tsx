import React from "react";
import { IoCartOutline } from "react-icons/io5";
import ImageComponent from "@/components/img/image";
import TextInfo from "@/components/text-info/text-info";
import SectionTitle from "@/components/section-title/section-title";
import Card from "@/components/card/card";
import Link from "next/link";
const index = () => {
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
    <div className="wrapper">
      <div className="dark:shadow-blackShadow my-[30px] rounded-3xl shadow-xl py-[30px] md:px-[40px] px-10px">
        <h1 className="md:text-[30px] text-[24px] text-[#fff]">
          Product Info.
        </h1>
        <div className="sm:grid grid-cols-12 gap-4 my-[20px] ">
          <div className="sm:col-span-4 lg:col-span-3  relative">
            <img src="/images/book-one.jpg" alt={"image"} className="mx-auto" />
          </div>
          <div className="sm:col-span-8 lg:col-span-9 col-span-12 md:my-0 my-4">
            <div className="flex justify-between items-center">
              <h1 className="md:text-[30px] text-[24px] text-[#fff]">
                Product Name.
              </h1>
              <button className="btn btn-primary gap-2">
                <span className="text-[20px]">
                  <IoCartOutline />
                </span>
                Add To Cart
              </button>
            </div>
            <TextInfo title="Publisher" desc="Obada Kahlous" />
            <TextInfo title="Author" desc="Bahaa Atekah" />
            <p className="my-4 dark:text-[rgba(255,255,255,0.9)]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Voluptatum molestiae non ad iste harum totam repellat quia quae
              quaerat, atque aliquid optio pariatur illo corporis quisquam.
            </p>
            <TextInfo title="Price" desc="12000$" />
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
  );
};

export default index;
