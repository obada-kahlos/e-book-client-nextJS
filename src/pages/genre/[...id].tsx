import React from "react";
import { useRouter } from "next/router";

import { useGetBookByGenreQuery } from "@/api/books/api";

const Products = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const { data } = useGetBookByGenreQuery(id);
  console.log({ data });

  return <div>[...products]</div>;
};

export default Products;
