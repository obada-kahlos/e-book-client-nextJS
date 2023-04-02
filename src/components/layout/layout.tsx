import { setToken } from "@/app/slices/autoSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";

interface layoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout: React.FC<layoutProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [tokenData, setTokenData] = useState();
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  useEffect(() => {
    if (getToken !== null) {
      setTokenData(getToken);
    }
  }, [router]);

  // setTokenData(getToken?.token);
  console.log({ tokenData });
  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [dispatch, router, getToken]);

  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
