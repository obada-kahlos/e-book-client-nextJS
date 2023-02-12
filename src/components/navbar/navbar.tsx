import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { Inter, Lora } from "@next/font/google";
const lora = Lora({
  weight: "700",
  subsets: ["latin"],
});
const Navbar = () => {
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
  console.log({ token });

  const handleDeleteToken = () => {
    localStorage.removeItem("e-book");
    router.push("/");
  };

  return (
    <div className="navbar md:px-[120px] px-[10px] sticky top-0 left-0 w-full shadow-md bg-base-200 text-[white] z-[999]">
      <div className="navbar-start text-[#fff]">
        <a
          className="btn btn-ghost normal-case text-xl"
          style={{
            fontFamily: lora.style.fontFamily,
          }}
        >
          BookStore
        </a>
      </div>
      {token !== null ? (
        <div className="navbar-center text-[#fff] md:block hidden">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
            <li>
              <a>Item 4</a>
            </li>
          </ul>
        </div>
      ) : null}
      {
        <>
          {token !== null ? null : (
            <div className="navbar-end">
              <div className="flex gap-2">
                <Link href="login">
                  <button className="btn btn-primary"> Login </button>
                </Link>
                <Link href="signup">
                  <button className="btn btn-primary btn-outline">
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
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="flex md:gap-4 gap-1">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn text-white btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </label>
              <div
                tabIndex={0}
                className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/images/photo_2021-11-02_14-36-19.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleDeleteToken}>
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
