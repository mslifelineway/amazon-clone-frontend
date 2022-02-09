import React, { useState } from "react";
import {
  BannerCarousel,
  CardImageTitle,
  CustomCarousel,
  Layout,
} from "../components";
import { GetLandingPageData } from "../services/LandingPageDataService";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "../styles/landing.styles.css";

const Landing = () => {
  const [products, setProducts] = useState([]);
  const [blockBusterDealsProducts, setBlockBusterDealsProducts] = useState({});
  const [sponsorBanners, setSponsorBanners] = useState([]);

  console.log("===> sponsorBanners : ", sponsorBanners);
  useState(async () => {
    const { data } = await GetLandingPageData();
    if (data) {
      setSponsorBanners(data.sponsorBanners || []);
      setProducts(data.products || []);
      setBlockBusterDealsProducts(data.blockBusterDealsProducts || []);
    }
  }, []);

  const RenderSponsoredBanner = () => {
    return (
      <div className="landing__sponsor--banner">
        <CardImageTitle {...sponsorBanners[0]} />
        <div className="banner2">
          <CardImageTitle {...sponsorBanners[1]} />
        </div>
        <span className="sponsor__ad">
          Sponsored <BsFillInfoCircleFill />
        </span>
      </div>
    );
  };

  const RenderList = ({ list = [] }) => {
    return (
      list &&
      list.map((l, i) => (
        <div
          key={`${l.imageData[0] ? l.imageData[0].image : l.title}_${i}`}
          className="list__item"
        >
          <CardImageTitle {...l} />
        </div>
      ))
    );
  };

  return (
    <Layout>
      <div className="landing__carousel">
        <BannerCarousel />
        <div className="landing__other-layout">
          <div className="landing__main--container">
            <div className="grid__view">
              <RenderList list={[...products].slice(0, 3)} />
              <RenderSponsoredBanner />
            </div>
            <div className="grid__view">
              <RenderList list={[...products].slice(3, 7)} />
            </div>
            <CustomCarousel data={blockBusterDealsProducts} />
            <div className="grid__view">
              <RenderList list={[...products].slice(3, 7)} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
