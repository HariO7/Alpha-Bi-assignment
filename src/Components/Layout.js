import React, { useState } from "react";
import classes from "./Layout.module.css";
import axios from "axios";
import Card from "./Card";
function Layout(props) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

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
    setSearchData(res.data.data);
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
      {searchData.map((element) => (
        <div key={element.id}>
          <Card image={element.images.fixed_height.url} />
        </div>
      ))}
    </div>
  );
}

export default Layout;
