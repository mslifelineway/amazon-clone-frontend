import React, { useContext } from "react";
import { Drawer } from ".";
import Appbar from "./Appbar";
import { DrawerContext } from "../contexts";

const Layout = ({ children }) => {
  const { isDrawerOpened } = useContext(DrawerContext);

  return (
    <React.Fragment>
      {isDrawerOpened && <Drawer />}
      <Appbar />
      <div className="main__container">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
