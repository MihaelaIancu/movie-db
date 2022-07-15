import React from "react";
import "../App.css";

function Pagination(props) {
  const pageLinks = [];

  for (let i = 1; i <= props.pages + 1; i++) {
    let active = props.currentPage === i ? "active" : "";
    pageLinks.push(
      <li
        className={`link ${active}`}
        key={i}
        onClick={() => props.nextPage(i)}
      >
        <a href="#">{i}</a>
      </li>
    );
  }

  return (
    <div className="main">
      <div className="">
        <ul className="pagination">
          {props.currentPage > 1 ? (
            <li
              className={"link"}
              onClick={() => props.nextPage(props.currentPage - 1)}
            >
              <a href="#">Prev</a>
            </li>
          ) : (
            ""
          )}
          {pageLinks}
          {props.currentPage < props.pages + 1 ? (
            <li
              className={"link"}
              onClick={() => props.nextPage(props.currentPage + 1)}
            >
              <a href="#">Next</a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
