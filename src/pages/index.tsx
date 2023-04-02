import { useEffect, useState } from "react";
import Head from "next/head";
import { Lora, Anton } from "@next/font/google";
import Link from "next/link";
import Loading from "@/components/loading/loading";
import { useRouter } from "next/router";

export default function Home() {
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

  useEffect(() => {
    if (token) {
      router.push("/main-page");
    } else router.push("/landing-page");
  }, [token, router]);

  // token ?  : router.push("/");
  return (
    <>
      <Loading />
    </>
  );
}
