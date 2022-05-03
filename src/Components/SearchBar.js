import React, { useState } from "react";
import classes from "./SearchBar.module.css";
import axios from "axios";
function SearchBar() {
  const [search, setSearch] = useState("");

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "89Kvm7tqRvIcz1DZRWXM392lz7JXbAYm",
        q: search,
      },
    });
    console.log(res.data);
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="Search"
          type="text"
          onChange={searchChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchBar;
