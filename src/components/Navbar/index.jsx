import React, { useContext } from "react";
import { DrawerContext } from "../../contexts";
import { TextIconButton } from "..";
import { PAGE_PATHS } from "../../utils/constants";
import "./styles.css";

const navMenus = [
  { name: "Fresh", link: PAGE_PATHS.fresh },
  { name: "Amazon Pay", link: PAGE_PATHS.amazonPay },
  { name: "Gift Cards", link: PAGE_PATHS.giftCards },
  { name: "Buy Again", link: PAGE_PATHS.buyAgain },
  { name: "Gift Ideas", link: PAGE_PATHS.giftIdeas },
  {
    name: "Health, Household & Personal Care",
    link: PAGE_PATHS.healthAndPersonalCare,
  },
  { name: "Kindle eBooks", link: PAGE_PATHS.kindleStore },
];

const RenderNavMenus = () =>
  navMenus.map((_menu) => (
    <div key={_menu.name}>
      <TextIconButton text={_menu.name} link={_menu.link} />
    </div>
  ));

const Navbar = () => {
  const { openDrawer } = useContext(DrawerContext);

  return (
    <div className="nav__main">
      <div className="nav__left">
        <TextIconButton
          text="All"
          image="../../assets/images/icons_pack2.png"
          onClick={openDrawer}
          iconStyle={{
            backgroundPosition: "-172px -255px",
          }}
          textStyle={{ fontWeight: "bold" }}
        />
      </div>
      <div className="nav__fill flex-center full-grow">
        <RenderNavMenus />
      </div>
      <div className="nav__right">
        <TextIconButton link="/" style={{ padding: "0px", margin: "2px" }}>
          <img src="../../assets/images/amazon_nav_banner.jpg" />
        </TextIconButton>
      </div>
    </div>
  );
};

export default Navbar;
