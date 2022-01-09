import React, { useContext, useState, useEffect } from "react";
import { DrawerContext } from "../../contexts";
import { GetDrawerMenus } from "../../services/GetDrawerMenus";
import "./styles.css";

const Drawer = () => {
  const { closeDrawer } = useContext(DrawerContext);
  const [drawerMenus, setDrawerMenus] = useState([]);
  const [showBackMenuButton, setShowBackMenuButton] = useState(false);
  const [previousMenusHistory, setPreviousMenusHistory] = useState([]);

  const nextMenus = (next, prevMenus) => {
    setPreviousMenusHistory([...previousMenusHistory, prevMenus]);
    setShowBackMenuButton(true);
    setDrawerMenus(next || []);
  };

  const backTo = () => {
    setDrawerMenus(previousMenusHistory[previousMenusHistory.length - 1]);
    const newMenus = [...previousMenusHistory].splice(
      0,
      previousMenusHistory.length - 1
    );
    if (newMenus.length === 0) {
      setShowBackMenuButton(false);
    }
    setPreviousMenusHistory(newMenus || []);
  };

  useEffect(async () => {
    const { data, error } = await GetDrawerMenus();
    if (!error) {
      setDrawerMenus(data);
    }
  }, []);

  const RenderDrawerMenus = ({
    menus = drawerMenus,
    parent = true,
    menuLevel = 1,
    parentMenus = [],
  }) => {
    return (
      menuLevel < 3 &&
      menus.map((m, i) => {
        return (
          <div key={`${m.name || ""}__${m.link || ""}__${i}`}>
            <li>
              {m.link === "" && parent ? (
                <div className="menu__item title">{m.name}</div>
              ) : (
                <a
                  href={`${
                    m.menus || (m.menus && m.menus.length !== 0) ? "#!" : m.link
                  }`}
                  className="menu__item"
                  onClick={() => nextMenus(m.menus, parentMenus)}
                >
                  {m.name}
                  {m.menus && <i className="arrow__next"></i>}
                </a>
              )}
            </li>
            {m.menus && (
              <RenderDrawerMenus
                menus={m.menus}
                parent={false}
                menuLevel={menuLevel + 1}
                parentMenus={menus}
              />
            )}
          </div>
        );
      })
    );
  };

  return (
    <div className="drawer">
      <div className="drawer__close--icon" onClick={closeDrawer}></div>
      <div className="drawer__container">
        <a href="#" className="drawer__custom-profile">
          <div className="drawer__profile-image"></div>
          <span>Hello, Mukesh</span>
        </a>

        <div className="drawer__menu--content">
          <ul className="drawer__menu">
            {showBackMenuButton && (
              <li>
                <a
                  href="#!"
                  className="menu__item menu__back--button"
                  onClick={backTo}
                >
                  <i className="back__arrow mr10"></i> MAIN MENU
                </a>
              </li>
            )}
            <RenderDrawerMenus />
          </ul>
        </div>
      </div>
      <div className="full-grow fullHeight" onClick={closeDrawer}></div>
    </div>
  );
};

export default Drawer;
