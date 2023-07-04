import Link from "next/link";
import React, { ReactEventHandler } from "react";
import { BsCartX } from "react-icons/bs";
import {
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";

interface cardProps {
  img?: string;
  title?: string;
  desc?: string | null;
  bade?: string;
  price?: string | number;
  id?: number;
  inLocal?: boolean | undefined;
  inWishList?: boolean | null;
  handleAddToCart?: ReactEventHandler | undefined;
  handelRemoveFromCart?: ReactEventHandler | undefined;
  handleAddTpWishList?: ReactEventHandler | undefined;
  removeButton?: ReactEventHandler | undefined;
}

const Card: React.FC<cardProps> = ({ ...props }) => {
  return (
    <div className="card w-[300px] bg-base-100 shadow-xl min-h-[500px]">
      <figure className="px-5 pt-5">
        <div className="relative rounded-xl w-[60%] h-[200px] overflow-hidden">
          <Image src={props.img} alt={props.title} fill />
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.title}</h2>
        <h2 className="card-title">{props.price}</h2>
        <p>{props?.desc?.slice(0, 40)}</p>
        <div className="card-actions">
          {!props.inLocal ? (
            <span
              className={`btn btn-ghost btn-circle text-[18px]`}
              onClick={props.handleAddToCart}>
              <AiOutlineShoppingCart />
            </span>
          ) : (
            <span
              className={`btn btn-primary btn-circle text-[18px]`}
              onClick={props.handelRemoveFromCart}>
              <BsCartX />
            </span>
          )}
          <Link
            href={`/book-info/${props.id}`}
            className="btn btn-ghost btn-circle text-[18px]">
            <AiOutlineEye />
          </Link>
          <span
            className={`btn ${
              props.inWishList ? "btn-active" : "btn-ghost"
            } btn-circle text-[18px]`}
            onClick={props.handleAddTpWishList}>
            <AiOutlineStar />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
