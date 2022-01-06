import React from "react";

import "./styles.css";

const SearchBackdrop = ({ onClick }) => {
  return <div className="search__backdrop" onClick={onClick}></div>;
};

export default SearchBackdrop;
