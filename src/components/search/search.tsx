import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
const Search = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/${searchValue}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
