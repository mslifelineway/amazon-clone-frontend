import React from "react";
import "./styles.css";

//...rest --> will take care of other props for the 'a' tag
//  not for the icon, For the icon need to pass manually and consume that props key here

const TextIconButton = ({
  children,
  text,
  link,
  onClick,
  image,
  height,
  style = {},
  iconStyle = {},
  textStyle = {},
  ...rest
}) => {
  return (
    <a
      href={link ? link : "#!"}
      onClick={onClick}
      className="nav__menu1 text__icon_button"
      style={{ height, ...style }}
      {...rest}
    >
      {image && (
        <i
          className="icon__button-icon"
          style={{ backgroundImage: `url(${image})`, ...iconStyle }}
        ></i>
      )}
      <span style={{ ...textStyle }}>{text}</span>
      {children}
    </a>
  );
};

export default TextIconButton;
