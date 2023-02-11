import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Landing = () => {
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  const router = useRouter();
  useEffect(() => {
    if (!getToken) {
      router.push("login");
    }
  }, [getToken]);

  return (
    <div className="h-[600px] w-full flex justify-center items-center">
      <h1 className="text-[70px] font-mono"> Hi Landing.! </h1>
    </div>
  );
};

export default Landing;
