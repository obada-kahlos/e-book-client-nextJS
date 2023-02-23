import Link from "next/link";
import React from "react";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
interface cardProps {
  img: string;
  title: string;
  desc: string;
  bade: string;
  price: string;
}

const Card: React.FC<cardProps> = (props) => {
  return (
    <div className="card sm:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={props.img} alt="Movie" className="object-fill" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {props.title}
          <div className="badge badge-primary">{props.bade}</div>
        </h2>
        <p>{props.desc}</p>
        <p>Price: {props.price}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              console.log("Add To Cart");
            }}
            className="btn btn-circle text-[20px]"
          >
            <IoCartOutline />
          </button>
          <button
            onClick={() => {
              console.log("Add To Favorit");
            }}
            className="btn btn-circle text-[20px]"
          >
            <IoHeartOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
