import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import SearchBackdrop from "../SearchBackdrop";
import { getTextWidth } from "../../utils/helpers";
import { PAGE_PATHS } from "../../utils/constants";
import PopoverBox from "../PopoverBox";
import "./styles.css";

const options = [
  {
    name: "All",
    value: "",
  },
  {
    name: "All Categories",
    value: "all categories",
  },
  {
    name: "Popular Categories",
    value: "pupular categories",
  },
  {
    name: "Most sold products",
    value: "most sold products",
  },
];

const languagesByCountry = [
  { lang: "English - EN", code: "EN" },
  { lang: "Hindi - HI", code: "HI" },
  { lang: "Tamil - TA", code: "TA" },
  { lang: "Telugu - TE", code: "TE" },
  { lang: "Gujrati - GU", code: "GU" },
  { lang: "Bangala - BN", code: "BN" },
  { lang: "Marathi - MR", code: "MR" },
];

const yourListsMenus = [
  { name: "Create a Wisth List", link: PAGE_PATHS.createWishList },
  { name: "Wish from Any Website", link: PAGE_PATHS.universalWishList },
  { name: "Baby Wish List", link: PAGE_PATHS.babyWishlist },
  { name: "Discover Your Style", link: PAGE_PATHS.discoverYourStyle },
  { name: "Explore Showroom", link: PAGE_PATHS.exploreShowroom },
];

const yourAccountMenus = [
  { name: "Your Account", link: PAGE_PATHS.createWishList },
  { name: "Your Orders", link: PAGE_PATHS.createWishList },
  { name: "Your Wish List", link: PAGE_PATHS.createWishList },
  { name: "Your Recommendations", link: PAGE_PATHS.createWishList },
  { name: "Your Prime Membership", link: PAGE_PATHS.primeCentral },
  { name: "Your Prime Video", link: PAGE_PATHS.primeVideo },
  { name: "Your Subscribe & Save Items", link: PAGE_PATHS.autoDeliveries },
  {
    name: "Memberships & Subscriptions",
    link: PAGE_PATHS.membershipsAndSubscriptions,
  },
  { name: "Your Gift Card Balance", link: PAGE_PATHS.balance },
  {
    name: "Your Amazon Business Account",
    link: PAGE_PATHS.amazonBusinessAccount,
  },
  { name: "Your Seller Account", link: PAGE_PATHS.amazonBusinessAccount },
  {
    name: "Manage Your Content and Devices",
    link: PAGE_PATHS.amazonBusinessAccount,
  },
  { name: "Switch Accounts", link: PAGE_PATHS.switchAccounts },
  { name: "Sign Out", link: PAGE_PATHS.signOut },
];

const Header = () => {
  const [isInputFocussed, setIsInputFocussed] = useState(false);
  const [country, setCountry] = useState({ name: "India", code: "IN" });
  const [globalSearchTerm, setGlobalSearchTerm] = useState("");

  //TODO: LOGIC TO GET THE LANGUAGE SELECTED FROM THE URL THEN UPDATED THE selectedLanguageLink
  const defaultSelectedLanguageLink = `${languagesByCountry[0].code}_${country.code}`;
  const selectedLanguageLink = defaultSelectedLanguageLink;
  const selectedLanguage = languagesByCountry.find(
    (lang) => `${lang.code}_${country.code}` === selectedLanguageLink
  );

  // useEffect(() => {
  //   setCountry({ ...country });
  // }, []);

  const getWidth = (text) => {
    const w = getTextWidth(text) + 40;
    return `${w > 50 ? w : 50}px`;
  };

  const handleChange = (e) => {
    const { value, options, selectedIndex } = e.target;
    e.target.style.width = getWidth(options[selectedIndex].innerText);
  };

  const RenderOptions = () => {
    return options.map((op) => (
      <option key={op.name} value={op.value}>
        {op.name}
      </option>
    ));
  };

  const showBackdrop = () => {
    setIsInputFocussed(true);
  };

  const removeBackdrop = () => {
    setIsInputFocussed(false);
  };

  useEffect(() => {
    isInputFocussed
      ? ReactDOM.render(
          <SearchBackdrop onClick={removeBackdrop} />,
          document.getElementById("root__search_backdrop")
        )
      : ReactDOM.render("", document.getElementById("root__search_backdrop"));
  }, [isInputFocussed]);

  useEffect(() => {
    isInputFocussed
      ? ReactDOM.render(
          <SearchBackdrop onClick={removeBackdrop} />,
          document.getElementById("root__popover")
        )
      : ReactDOM.render("", document.getElementById("root__popover"));
  }, [isInputFocussed]);

  const RenderLanguageList = () => {
    return languagesByCountry.map((lang) => {
      const link = `${lang.code.toLowerCase()}_${country.code}`;
      if (selectedLanguageLink !== link) {
        return (
          <li key={lang.lang}>
            <a href={`#switch-lang=${link}`}>
              <i></i>
              <span>{lang.lang}</span>
            </a>
          </li>
        );
      }
    });
  };

  const RenderYourListsMenus = () => {
    return (
      <ul className="header__language-list">
        {yourListsMenus.map((list) => {
          return (
            <li key={list.name}>
              <a href={list.link}>
                <span>{list.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  };
  const RenderYourAccountMenus = () => {
    return (
      <ul className="header__language-list">
        {yourAccountMenus.map((list) => {
          return (
            <div key={list.name}>
              {list.link === PAGE_PATHS.switchAccounts && (
                <hr className="divider" style={{ marginLeft: 0 }} />
              )}
              <li>
                <a href={list.link}>
                  <span>{list.name}</span>
                </a>
              </li>
            </div>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__menu-box flex-full-center">
          <a href="#" className="header__menu ml12">
            <div className="header__logo">
              <img src="/assets/images/amazon.png" alt="logo" />
              <span>.in</span>
            </div>
          </a>
        </div>

        <div className="header__menu-box flex-full-center">
          <a href="#" className="header__menu ml10">
            <span>Hello</span>
            <div className="flex">
              <HiOutlineLocationMarker color="#fff" />
              <p>Select your address</p>
            </div>
          </a>
        </div>
      </div>

      <div className="header__fill flex-center">
        <form
          className={`header__search flex-stretch ${
            isInputFocussed ? "focussed" : ""
          }`}
          method="post"
        >
          <div className="header__search--menu flex-center">
            <select
              className="fullHeight"
              onClick={handleChange}
              id="globalSearch"
              autoComplete="off"
              style={{ width: getWidth(options[0].name) }}
            >
              <RenderOptions />
            </select>
            <AiFillCaretDown />
          </div>
          <div className="header__search--input fullWidth">
            <input
              type="text"
              className="fullWidthHeight"
              value={globalSearchTerm}
              onChange={(e) => setGlobalSearchTerm(e.target.value)}
              onClick={showBackdrop}
            />
          </div>
          <div className="header__search--icon flex-full-center">
            <BsSearch />
          </div>
        </form>
      </div>
      <div className="header__right flex">
        <div className="header__menu-box flex-full-center">
          <a href="#" className="flex-center header__menu pl15">
            <div className="menu__flag">
              {country && country.code !== "" && (
                <img
                  alt={country.name}
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
                />
              )}
              &nbsp;
              <AiFillCaretDown size={12} />
            </div>
          </a>
          <PopoverBox>
            <ul className="header__language-list">
              <li>
                <i className="language__selected"></i>
                <span>{selectedLanguage.lang}</span>
              </li>
              <hr className="divider" />
              <RenderLanguageList />
              <hr className="divider" />
            </ul>
            <span className="language__menu-flag flex">
              <i className="flag__image"></i>
              You are shopping on Amazon.in
            </span>
            <a
              href={PAGE_PATHS.changeCountry}
              className="header__language--change_country"
            >
              change country/region.
            </a>
          </PopoverBox>
        </div>

        <div className="header__menu-box flex-full-center header-account-menu">
          <a href="#" className="header__menu right">
            <span>Hello, Sign In</span>
            <div className="flex">
              <p>
                Account & Lists &nbsp;
                <AiFillCaretDown size={12} />
              </p>
            </div>
          </a>
          <PopoverBox>
            <div className="flex account-menu_container">
              <div className="account-menu_list">
                <p className="account-menu_title">Your Lists</p>
                <a href="#" className="account-menu_sub-title link">
                  mukeshms40003's Wish List
                </a>
                {/* <ul className="header__language-list">
                  <li>
                    <a href="">
                      <span>Create your Wish List</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span>Wishg from Any Website</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span>Baby Wish List</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span>Discover Your Style</span>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <span>Explore Showroom</span>
                    </a>
                  </li>
                </ul> */}
                <RenderYourListsMenus />
              </div>

              <div className="pr20">
                <p className="account-menu_title mb10">Your Account</p>
                <RenderYourAccountMenus />
              </div>
            </div>
          </PopoverBox>
        </div>

        <div className="header__menu-box flex-full-center">
          <a href="#" className="header__menu right">
            <span>Returns</span>
            <div className="flex">
              <p>& Orders</p>
            </div>
          </a>
        </div>

        <div className="header__menu-box flex-full-center">
          <a href="#" className="header__menu mr10 relative">
            <small className="header__cart-count">10</small>
            <div className="flex-end">
              <FaOpencart color="#fff" size={28} /> &nbsp;
              <p>Cart</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
