import React, { useState, createContext } from "react";

const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpened(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpened(false);
  };

  return (
    <DrawerContext.Provider
      value={{ isDrawerOpened, setIsDrawerOpened, openDrawer, closeDrawer }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export { DrawerContext, DrawerContextProvider };
