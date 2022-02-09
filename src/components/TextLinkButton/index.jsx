import React from "react";
import "./styles.css";

const TextLinkButton = ({ text, link, onClick, style = {}, ...rest }) => {
  return (
    <a
      href={link}
      onClick={onClick}
      style={style}
      className="text__link--button"
      {...rest}
    >
      {text}
    </a>
  );
};

export default TextLinkButton;
