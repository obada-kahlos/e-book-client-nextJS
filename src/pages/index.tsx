import { useEffect, useState } from "react";
import Head from "next/head";
import { Lora, Anton } from "@next/font/google";
import Link from "next/link";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/app/hooks";
import { setToken } from "@/app/slices/authSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  const [token, setTokenRE] = useState<string>();
  useEffect(() => {
    if (getToken !== null) {
      setTokenRE(getToken);
    }
  }, [router]);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token?.token));
      router.push("/main-page");
    } else router.push("/landing-page");
  }, [token]);

  // token ?  : router.push("/");
  return (
    <>
      <Loading />
    </>
  );
}
