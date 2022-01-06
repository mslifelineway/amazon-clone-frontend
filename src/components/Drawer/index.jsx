import React from "react";
import { PAGE_PATHS } from "../../utils/constants";
import "./styles.css";

const trendingMenus = [
  { title: "Trending" },
  { name: "Best Sellers", link: PAGE_PATHS.bestSellers },
  { name: "New Releases", link: PAGE_PATHS.newReleases },
  { name: "Movers and Shakers", link: PAGE_PATHS.moversAndShakers },
];

const Drawer = () => {
  const RenderDrawerMenus = ({ menus = [] }) => {
    console.log("--> menus : ", menus);
    return menus.map((m) => {
      return (
        <li key={`${m.title || ""}__${m.name || ""}`}>
          {m.title ? (
            <div className="menu__item title">{m.title}</div>
          ) : (
            <a href="#" className="menu__item">
              {m.name}
            </a>
          )}
        </li>
      );
    });
  };

  return (
    <div className="drawer">
      <div className="drawer__close--icon"></div>
      <div className="drawer__container">
        <a href="#" className="drawer__custom-profile">
          <div className="drawer__profile-image"></div>
          <span>Hello, Mukesh</span>
        </a>

        <div className="drawer__menu--content">
          <ul className="drawer__menu" data-menu-id="1">
            <RenderDrawerMenus menus={trendingMenus} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
