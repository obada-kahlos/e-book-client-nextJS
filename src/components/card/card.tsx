import Link from "next/link";
import React, { ReactEventHandler } from "react";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
interface cardProps {
  img: string;
  title: string;
  desc?: string;
  bade?: string;
  price: string | number;
  href: string;
  inCart?: boolean;
  removeButton?: ReactEventHandler | undefined;
}

const Card: React.FC<cardProps> = (props) => {
  return (
    <div className="xl:w-[calc(90%/6)] lg:w-[calc(90%/5)] sm:w-[calc(90%/3)] w-[calc(90%/2)]">
      <figure>
        <img
          src={props.img}
          alt={props.title}
          className="object-fill sm:w-[180px] w-full h-[250px] rounded-xl"
        />
      </figure>
      <h3 className="dark:text-[#fff] text-[20px] my-[5px]">{props.title}.</h3>
      <p className="text-[] mb-[10px]">
        <strong>{props.price}</strong>
      </p>
      {props.inCart && (
        <>
          <button className="btn btn-circle" onClick={props.removeButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>{" "}
        </>
      )}
      <Link
        href={props.href}
        className="btn dark:glass btn-primary sm:w-[180px] w-full my-[10px]">
        Viwe Book
      </Link>
    </div>
  );
};

export default Card;
