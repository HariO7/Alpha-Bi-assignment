import React from "react";

function Paginate(props) {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNo.push(i);
  }
  return (
    <nav>
      <ul className="pagination pagination-sm justify-content-center border-0">
        {pageNo.map((number) => {
          let classes = "page-item";
          if (number === props.currentPage) {
            classes += "active";
          }
          return (
            <li className={classes}>
              <a
                href="#"
                onClick={() => props.pageSelector(number)}
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Paginate;
