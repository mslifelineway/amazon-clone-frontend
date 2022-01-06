import React from "react";
import { AiOutlineCaretUp } from "react-icons/ai";

import "./styles.css";

const PopoverBox = ({ children }) => {
  return (
    <div className="popover__container">
      <AiOutlineCaretUp className="popover__caret" />
      <div className="popover__children">{children}</div>
    </div>
  );
};

export default PopoverBox;
