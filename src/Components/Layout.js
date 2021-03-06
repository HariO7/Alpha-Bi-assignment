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
  const [itemsPerPage, setItemsPerPage] = useState(3);
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
        limit: 30,
      },
    });
    setSearchData(res.data.data);
    console.log(res.data.data);
    setIsloading(false);
  };

  let searchedData = currentItems.map((element) => (
    <Card image={element.images.fixed_width.url} key={element.id} />
  ));

  if (isloading) {
    searchedData = <LoadingSpinner />;
  }

  const pageSelector = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <div className={classes.inputBox}>
      <form onSubmit={onSubmitHandler}>
        <input
          placeholder="&#xF002; Search"
          type="text"
          onChange={searchChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
      <div className="container">
        <div className="row">{searchedData}</div>
      </div>
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
