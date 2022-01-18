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
  const [blockBusterDealsProducts, setBlockBusterDealsProducts] = useState([]);
  console.log("===> blockBusterDealsProducts : ", blockBusterDealsProducts);
  useState(async () => {
    const { data } = await GetLandingPageData();
    if (data) {
      setProducts(data.products || []);
      setBlockBusterDealsProducts(data.blockBusterDealsProducts || []);
    }
  }, []);

  const RenderSponsoredBanner = () => {
    const sponsorBanner1 = {
      imageData: [
        {
          image:
            "https://m.media-amazon.com/images/S/al-eu-726f4d26-7fdb/c4898261-0b6a-446f-b58d-2e632045a759.jpg",
          link: "https://www.amazon.in/stores/page/9DCC9333-C2D8-434E-921A-09A4491709EF?aaxitk=565a8afc11da3351ee85bdd1c9bde3f5",
        },
      ],
    };
    const sponsorBanner2 = {
      title: "Shop on the Amazon App",
      subtitle:
        "First convinient and secure | Over 17 carore products in your pocket",
      footerText: "Download the Amazon app",
      footerLink:
        "https://www.amazon.in/b/?_encoding=UTF8&node=6967393031&ref=IN_MM_SW_D_Grid&pf_rd_r=8Z7F6JPZ673VTJDSGMZR&pf_rd_p=6ef25b1f-5bec-426e-904f-779d9822d4dd&pd_rd_r=623b61ea-5406-444c-8316-6504071b59e4&pd_rd_w=wOKKu&pd_rd_wg=26dcK&ref_=pd_gw_unk",
    };
    return (
      <div className="landing__sponsor--banner">
        <CardImageTitle {...sponsorBanner2} />
        <div className="banner2">
          <CardImageTitle {...sponsorBanner1} />
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
            <div>
              <CustomCarousel data={blockBusterDealsProducts} />
            </div>
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
