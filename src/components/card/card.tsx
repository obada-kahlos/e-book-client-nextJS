import Link from "next/link";
import React, { ReactEventHandler } from "react";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
interface cardProps {
  img: string;
  title: string;
  desc?: string;
  bade?: string;
  price: string;
  href: string;
}

const Card: React.FC<cardProps> = (props) => {
  return (
    <>
      <figure>
        <img
          src={props.img}
          alt={props.title}
          className="object-fill w-full h-[250px] rounded-xl"
        />
      </figure>
      <h3 className="dark:text-[#fff] text-[20px] my-[5px]">{props.title}.</h3>
      <p className="text-[] mb-[10px]">
        <strong>{props.price}</strong>
      </p>
      <Link
        href={props.href}
        className="btn dark:glass btn-primary btn-block my-[10px]">
        Viwe Book
      </Link>
    </>
  );
};

export default Card;
