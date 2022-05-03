import React, { useState } from "react";
import classes from "./Layout.module.css";
import axios from "axios";
import Card from "./Card";
import LoadingSpinner from "./UI/LoadingSpinner";
function Layout(props) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    setIsloading(true);
    event.preventDefault();
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "89Kvm7tqRvIcz1DZRWXM392lz7JXbAYm",
        q: search,
      },
    });
    setSearchData(res.data.data);
    setIsloading(false);
  };

  let searchedData = searchData.map((element) => (
    <div key={element.id}>
      <Card image={element.images.fixed_height.url} />
    </div>
  ));

  if (isloading) {
    searchedData = <LoadingSpinner />;
  }

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
      {searchedData}
    </div>
  );
}

export default Layout;
