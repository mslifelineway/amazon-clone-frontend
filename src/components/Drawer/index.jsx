import React, { useContext } from "react";
import { DrawerContext } from "../../contexts";
import { PAGE_PATHS } from "../../utils/constants";
import "./styles.css";

const trendingMenus = [
  { title: "Trending" },
  { name: "Best Sellers", link: PAGE_PATHS.bestSellers },
  { name: "New Releases", link: PAGE_PATHS.newReleases },
  { name: "Movers and Shakers", link: PAGE_PATHS.moversAndShakers },
];

const digitalContentMenus = [
  { title: "Digital Content And Devices" },
  {
    name: "Echo & Alexa",
    link: PAGE_PATHS.bestSellers,
    subMenus: [
      { title: "Echo & Alexa" },
      { name: "Sub menus 1", link: PAGE_PATHS.newReleases },
      { name: "Sub menus 2", link: PAGE_PATHS.newReleases },
      { name: "sub menus 3", link: PAGE_PATHS.newReleases },
    ],
  },
  { name: "Fire TV", link: PAGE_PATHS.newReleases },
  { name: "Kindle E-Readers & eBooks", link: PAGE_PATHS.moversAndShakers },
  { name: "Audible Audiobooks", link: PAGE_PATHS.moversAndShakers },
  { name: "Amazon Prime Video", link: PAGE_PATHS.moversAndShakers },
  { name: "Amazon Prime Music", link: PAGE_PATHS.moversAndShakers },
];

const shopByDeptMenus = [
  { title: "Shop By Department" },
  { name: "Mobiles, Computer", link: PAGE_PATHS.bestSellers },
  { name: "TV, Appliances, Electronics", link: PAGE_PATHS.newReleases },
  { name: "Mens's Fashion", link: PAGE_PATHS.moversAndShakers },
  { name: "See All", link: PAGE_PATHS.moversAndShakers },
];
const programAndFeaturesMenus = [
  { title: "Programs & Features" },
  { name: "Gift Cards & Mobile Recharges", link: PAGE_PATHS.bestSellers },
  { name: "Flight Tickets", link: PAGE_PATHS.newReleases },
  { name: "#FoundItOnAmazon", link: PAGE_PATHS.moversAndShakers },
  { name: "Amazon Outlet", link: PAGE_PATHS.moversAndShakers },
];

const helpAndSettingsMenus = [
  { title: "Help & Settings" },
  { name: "Your Account", link: PAGE_PATHS.bestSellers },
  { name: "Customer Service", link: PAGE_PATHS.newReleases },
  { name: "Sign Out", link: PAGE_PATHS.moversAndShakers },
];

const allMenus = [
  ...trendingMenus,
  ...digitalContentMenus,
  ...shopByDeptMenus,
  ...programAndFeaturesMenus,
  ...helpAndSettingsMenus,
];

const Drawer = () => {
  const { closeDrawer } = useContext(DrawerContext);

  const handleMenu = (e, dataMenuId) => {
    console.log("===> e: ", e);
    console.log("==>  dataMenuId : ", dataMenuId);
    // const ele = document.querySelectorAll(`[data-menu-id="${dataMenuId}"]`);
    const ele = document.querySelector(`ul[data-menu-id="${dataMenuId}"]`);
    console.log("===> ele : ", ele);
    //hiding the current menu > ul
    const currentUlEle = document.getElementsByClassName(
      "drawer__menu--visible"
    )[0];
    console.log("==> currentUlEle :", currentUlEle);
    currentUlEle.classList.remove("drawer__menu--visible");
    currentUlEle.classList.add("translateX_right");

    //adding css to new menu > ul to show
    ele.classList.remove("translateX_right");
    ele.classList.add("drawer__menu--visible");
  };

  const backToMainMenu = (e, dataMenuId, dataParentMenuId) => {
    // console.log("===> e: ", e);
    console.log(
      "==>  dataMenuId, dataParentMenuId : ",
      dataMenuId,
      dataParentMenuId
    );
    // const ele = document.querySelectorAll(`[data-menu-id="${dataMenuId}"]`);
    const ele = document.querySelector(`a[data-menu-id="${dataMenuId}"]`);
    const mainMenuUl = ele.closest("ul");
    console.log("===> ele : ", mainMenuUl);

    const currentUlEle = document.getElementsByClassName(
      "drawer__menu--visible"
    )[0];
    currentUlEle.classList.remove("drawer__menu--visible");
    currentUlEle.classList.add("translateX_right");

    //adding css to new menu > ul to show
    mainMenuUl.classList.remove("translateX_right");
    mainMenuUl.classList.add("drawer__menu--visible");
  };

  const RenderDrawerMenus = ({ menus = [] }) => {
    return menus.map((m) => {
      return (
        <li key={`${m.title || ""}__${m.name || ""}`}>
          {m.title ? (
            <div className="menu__item title">{m.title}</div>
          ) : (
            <a
              href={`${m.subMenus ? "#!" : m.link}`}
              className="menu__item"
              data-menu-id="2"
              onClick={m.subMenus ? (e) => handleMenu(e, "2") : null}
            >
              {m.name}
              {m.subMenus && <i className="arrow__next"></i>}
            </a>
          )}
        </li>
      );
    });
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
          <ul className="drawer__menu drawer__menu--visible" data-menu-id="1">
            <RenderDrawerMenus menus={allMenus} />
          </ul>
          <ul
            className="drawer__menu translateX_right"
            data-menu-id="2"
            data-parent-menu-id="1"
          >
            <li>
              <a
                href="#!"
                className="menu__item menu__back--button"
                onClick={(e) => backToMainMenu(e, 2, 1)}
              >
                <i className="back__arrow mr10"></i> MAIN MENU
              </a>
            </li>
            <RenderDrawerMenus menus={allMenus} />
          </ul>
          <ul
            className="drawer__menu translateX_right"
            data-menu-id="3"
            data-parent-menu-id="1"
          >
            <li>DAta menu id 3</li>
            <RenderDrawerMenus menus={allMenus} />
          </ul>
        </div>
      </div>
      <div className="full-grow fullHeight" onClick={closeDrawer}></div>
    </div>
  );
};

export default Drawer;
