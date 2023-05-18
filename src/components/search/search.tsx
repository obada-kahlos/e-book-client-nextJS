import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { resetSearch, setSearchValue } from "@/app/slices/search.slice";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
const Search = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search.search);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/${search}`);
    dispatch(resetSearch());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered dark:text-[#fff] text-[#333]"
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
        />
      </div>
    </form>
  );
};

export default Search;
