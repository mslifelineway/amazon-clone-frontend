import React from "react";
import "./styles.css";

const Divider = ({ h, w, c, style = {} }) => {
  return (
    <div
      style={{ height: h, width: w || "100%", backgroundColor: c, ...style }}
      className="hr__divider"
    ></div>
  );
};

export default Divider;
