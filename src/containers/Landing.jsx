import React, { useState } from "react";
import { BannerCarousel, CardImageTitle, Layout } from "../components";
import { GetLandingPageData } from "../services/LandingPageDataService";
import "../styles/landing.styles.css";

const sponsorBanner = {
  imageData: [
    {
      image:
        "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/c4898261-0b6a-446f-b58d-2e632045a759.jpg",
      link: "https://www.amazon.in/stores/page/9DCC9333-C2D8-434E-921A-09A4491709EF?aaxitk=565a8afc11da3351ee85bdd1c9bde3f5",
    },
  ],
};

const Landing = () => {
  const [data, setData] = useState([]);

  useState(async () => {
    const { data: listData } = await GetLandingPageData();
    setData(listData || []);
  }, []);

  const RenderSponsoredBanner = () => {
    return <p>Sponsor banner</p>;
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
            <RenderList list={[...data].slice(0, 3)} />
            <div className="landing__sponsor--banner">
              <CardImageTitle {...sponsorBanner} />
              <span>Sponsored</span>
            </div>
            <RenderList list={[...data].slice(3, 7)} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Landing;
