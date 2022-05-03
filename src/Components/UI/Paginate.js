import React from "react";

function Paginate(props) {
  const pageNo = [];
  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNo.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNo.map((number) => {
          // add class for inactive
          if (number === props.currentPage) {
            // add class for active
          }
          return (
            <li>
              <a href="#" onClick={() => props.pageSelector(number)}>
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
