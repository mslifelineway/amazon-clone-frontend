import React, { useState, useEffect } from "react";
import { GetBanners } from "../../services/BannerCarouselService";

import "./styles.css";

const BannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [carouselBanner, setCarouselBanner] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(async () => {
    const { data: __banners, error } = await GetBanners();
    if (!error) {
      setBanners(__banners || []);
      setCarouselBanner(__banners[0]);
    }
  }, []);

  const handleCarousel = (type = "next") => {
    let index = bannerIndex;
    if (type === "next") {
      index += 1;
    } else {
      index -= 1;
    }
    if (index === banners.length) {
      index = 0;
    } else if (index <= 0) {
      index = banners.length - 1;
    }
    setCarouselBanner(banners[index]);
    setBannerIndex(index);
  };

  return (
    <div className="banner__carousel ">
      <div className="banner__carousel-container">
        {carouselBanner && (
          <>
            <a
              className="prev__icon--button"
              tabIndex={0}
              onClick={handleCarousel}
            >
              <i className="prev__icon controller__icon"></i>
            </a>
            <a
              className="next__icon--button"
              tabIndex={1}
              onClick={() => handleCarousel("next")}
            >
              <i className="next__icon controller__icon"></i>
            </a>
          </>
        )}
        {carouselBanner && (
          <div className="banner__carousel-box">
            <div className="banner__carousel-viewport">
              <ol>
                <li
                  className="a-carousel-card"
                  role="listitem"
                  key={`${carouselBanner.banner}__${carouselBanner.link}`}
                >
                  <a href={carouselBanner.link} target="_blank">
                    <img
                      alt="Mobiles"
                      src={`/assets/banners/${carouselBanner.banner}`}
                    />
                  </a>
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
