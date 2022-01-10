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

  const handleMenuViews = (e, type = "more") => {
    if (type === "more") {
      const seeMoreButton = e.currentTarget.parentNode;
      const closestList = seeMoreButton.parentNode.children[3];
      seeMoreButton.classList.add("hide");
      closestList.classList.remove("hide");
    } else {
      const seeLessButton = e.currentTarget.parentNode;
      const closestList = seeLessButton.parentNode.parentNode.children[3];
      const seeMoreButton = seeLessButton.parentNode.parentNode.children[2];
      seeMoreButton.classList.remove("hide");
      closestList.classList.add("hide");
    }
  };

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
              <div className="see__less--menus">
                <RenderDrawerMenus
                  menus={[...m.menus].splice(0, 6)}
                  parent={false}
                  menuLevel={menuLevel + 1}
                  parentMenus={menus}
                />
              </div>
            )}
            {m.link === "" && parent && m.menus?.length > 6 && (
              <li>
                <a
                  className="menu__item see__more--button"
                  onClick={handleMenuViews}
                >
                  See All
                  <i className="arrow__more  ml10"></i>
                </a>
              </li>
            )}
            {m.menus && (
              <div className="see__more--menus hide">
                <RenderDrawerMenus
                  menus={[...m.menus].splice(6, m.menus.length - 1)}
                  parent={false}
                  menuLevel={menuLevel + 1}
                  parentMenus={menus}
                />
                <li>
                  <a
                    className="menu__item see__less--button"
                    onClick={(e) => handleMenuViews(e, "less")}
                  >
                    See Less
                    <i className="arrow__less ml10"></i>
                  </a>
                </li>
              </div>
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
          <ul className={`drawer__menu ${showBackMenuButton && "sub__menus"}`}>
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
