import { setToken } from "@/app/slices/authSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Aside from "../aside/aside";

interface layoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout: React.FC<layoutProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;

  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router]);

  return (
    <>
      <Navbar />
      <Aside />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
