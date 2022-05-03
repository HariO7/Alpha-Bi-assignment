import React, { useState } from "react";
import classes from "./Layout.module.css";
import axios from "axios";
import Card from "./Card";
import LoadingSpinner from "./UI/LoadingSpinner";
import Paginate from "./UI/Paginate";
function Layout(props) {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

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
        limit: 100,
      },
    });
    setSearchData(res.data.data);
    setIsloading(false);
  };

  let searchedData = currentItems.map((element) => (
    <div key={element.id}>
      <Card image={element.images.fixed_height.url} />
    </div>
  ));

  if (isloading) {
    searchedData = <LoadingSpinner />;
  }

  const pageSelector = (pageNo) => {
    setCurrentPage(pageNo);
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
      {searchedData}
      <Paginate
        pageSelector={pageSelector}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={searchData.length}
      />
    </div>
  );
}

export default Layout;
