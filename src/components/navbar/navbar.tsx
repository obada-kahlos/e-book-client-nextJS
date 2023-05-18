import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { Inter, Lora } from "@next/font/google";
import { AiOutlineStar, AiOutlineShoppingCart } from "react-icons/ai";
const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});

import { navbarData } from "@/data/navbar/navbar";
import { RxAvatar } from "react-icons/rx";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {
  resetWishCount,
  setWishCount,
  setWishList,
  toggleWishList,
} from "@/app/slices/wishList.slice";
import { resetCartCount, setCartCount } from "@/app/slices/cart.slice";
import { resetProfileData, toggleIsOpen } from "@/app/slices/user.slice";
import { resetToken } from "@/app/slices/authSlice";
import Image from "next/image";
import Search from "../search/search";
import { useRevokeTokenMutation } from "@/api/register/api";
import SearchPopover from "../search-popover/search-popover";
import { useGetCartBookQuery } from "@/api/cart/api";

import cookie from "js-cookie";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (getToken !== null) {
      setToken(getToken);
    }
  }, [router]);

  const cartCount = useAppSelector((state) => state.cart.count);
  const wishCount = useAppSelector((state) => state.wishList.count);
  const profilePopupData = useAppSelector((state) => state.user.profileData);
  const search = useAppSelector((state) => state.search.search);

  const handleOpenPopup = () => {
    dispatch(toggleIsOpen(true));
  };
  useEffect(() => {
    dispatch(setCartCount());
    dispatch(setWishCount());
    dispatch(setWishList());
  }, [dispatch]);

  const [
    revokeToken,
    { isLoading: isLoadingRevokeToken, isSuccess: isSuccessRevokeToken },
  ] = useRevokeTokenMutation();

  const handleDeleteToken = () => {
    revokeToken({});
  };

  useEffect(() => {
    if (isSuccessRevokeToken) {
      localStorage.removeItem("e-book");
      localStorage.removeItem("wishList");
      localStorage.removeItem("myIds");
      dispatch(resetToken());
      dispatch(resetProfileData({}));
      dispatch(resetCartCount());
      dispatch(resetWishCount());
      setToken(null);
      router.push("/");
    }
  }, [isSuccessRevokeToken]);

  const { data: cartData, refetch, isLoading } = useGetCartBookQuery({});

  return (
    <div className="navbar backdrop-blur-sm  md:px-[120px] px-[10px] sticky top-0 left-0 w-full shadow-md  z-[999]">
      <div className="navbar-start text-[#fff]">
        <Link
          href="/main-page"
          className="btn btn-ghost normal-case text-xl text-bothColor font-mono">
          SAFA7AT
        </Link>
        {token !== null ? (
          <div className="relative">
            <Search />
            {search ? <SearchPopover /> : ""}
          </div>
        ) : null}
      </div>
      {token !== null ? (
        <div className="navbar-center  md:block hidden">
          <ul className="menu menu-horizontal px-1">
            {navbarData.map((item, key) => (
              <li key={key} className="min-w-[100px]">
                <Link
                  className={router.pathname == item.href ? "active" : ""}
                  href={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {
        <>
          {token !== null ? null : (
            <div className="navbar-end">
              <div className="flex gap-2">
                <Link href="login">
                  <button className="btn md:w-[120px] w-[80px] md:text-[16px] text-[14px]">
                    Login
                  </button>
                </Link>
                <Link href="signup">
                  <button className="btn md:w-[120px] w-[80px] md:text-[16px] text-[14px]">
                    Sginup
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      }
      {token !== null ? (
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 md:hidden">
            <li tabIndex={0}>
              <a>
                Links
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24">
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                {navbarData.map((item, key) => (
                  <li key={key} className="min-w-[100px]">
                    <Link
                      className={router.pathname == item.href ? "active" : ""}
                      href={item.href}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="flex md:gap-4 gap-1">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              onClick={() => dispatch(toggleWishList())}>
              <div className="indicator">
                <AiOutlineStar className="text-[20px]" />
                <span className="badge badge-sm bg-primary indicator-item">
                  {wishCount}
                </span>
              </div>
            </label>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <AiOutlineShoppingCart className="text-[20px]" />
                  <span className="badge badge-sm bg-primary indicator-item">
                    {cartData?.response?.length > 0
                      ? cartData?.response?.length
                      : 0}
                  </span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {cartData?.response?.length > 0
                      ? cartData?.response?.length
                      : 0}
                    Items
                  </span>
                  <div className="card-actions">
                    <Link href={"/cart"} className="btn btn-primary btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ">
                  {/* {profilePopupData?.profilePhoto ? (
                    <Image
                      width={40}
                      height={40}
                      src={profilePopupData?.profilePhoto}
                      alt="User-Image"
                    />
                  ) : ( */}
                  <span className="text-[40px]">
                    <RxAvatar />
                  </span>
                  {/* )} */}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li onClick={() => handleOpenPopup()}>
                  <a className="justify-between">Profile</a>
                </li>
                <li onClick={() => handleDeleteToken()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
