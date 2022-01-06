import React from "react";
import { Drawer } from ".";
import Appbar from "./Appbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Drawer />
      <Appbar />
      <div className="main__container">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
