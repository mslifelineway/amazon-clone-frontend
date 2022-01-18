import React, { useState, useEffect } from "react";
import { GetBanners } from "../../services/BannerCarouselService";

import "./styles.css";

const CustomCarousel = ({ data = [] }) => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);

  const handleCarousel = (type = "next") => {
    let index = bannerIndex;
    if (type === "next") {
      index += 1;
    } else {
      index -= 1;
    }
    if (index === banners.length) {
      index = 0;
    } else if (index === 0) {
      index = banners.length - 1;
    }
    setBannerIndex(index);
  };

  const RenderTimer = ({ offerExpires = {} }) => {
    const { label, hours, minutes, seconds } = offerExpires;
    if (hours === "" && minutes === "" && seconds === "") {
      return <span></span>;
    }
    return (
      <span className="deal__timer">
        <span className="offer__expire--timer">
          <span className="offer__expiresin">
            {`${label} ${hours || 0} hours ${minutes || 0} minutes ${
              seconds || 0
            } seconds`}
          </span>
          <span className="offer__live--time">
            <span className="label">{label}</span>
            <span className="timer__hour">{hours}</span>
            <span className="timer__seperator">:</span>
            <span className="timer__minutes">{minutes}</span>
            <span className="timer__seperator">:</span>
            <span className="timer__seconds">{seconds}</span>
          </span>
        </span>
      </span>
    );
  };

  const RenderPriceDetails = ({ price = {}, maxDealsPrice = {} }) => {
    if (price.whole === "" && maxDealsPrice.whole === "") {
      return <span></span>;
    }

    return (
      <div className="price__details">
        <span className="deal__price">
          <span className="price__symbol">{price.symbol}</span>
          <span className="price__whole">
            {price.whole}
            <span className="price__decimal">.</span>
          </span>
          <span className="price__fraction">{price.fraction}</span>
        </span>
        <span className="price__dash">-</span>
        <span className="deal__price">
          <span className="price__symbol">{maxDealsPrice.symbol}</span>
          <span className="price__whole">
            {maxDealsPrice.whole}
            <span className="price__decimal">.</span>
          </span>
          <span className="price__fraction">{maxDealsPrice.fraction}</span>
        </span>
      </div>
    );
  };

  return (
    <div className="custom__carousel ">
      <a
        className="prev__button controller"
        tabIndex={0}
        onClick={handleCarousel}
      >
        <i className="prev__icon controller__icon"></i>
      </a>
      <a
        className="next__button controller"
        tabIndex={1}
        onClick={() => handleCarousel("next")}
      >
        <i className="next__icon controller__icon"></i>
      </a>
      <div className="carousel__list--container">
        <ul className="carousel__list">
          {data.map((d, i) => {
            return (
              <li className="carousel__item" key={`${d.image}__${d.link + i}`}>
                <a href={d.link} target="_blank" className="item">
                  <div className="image__details">
                    <img alt="product" src={d.image} />
                  </div>
                  <div className="other__details">
                    <RenderPriceDetails
                      price={d.price}
                      maxDealsPrice={d.maxDealsPrice}
                    />
                    <RenderTimer offerExpires={d.offerExpires} />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="carousel__scrollbar">
          <span className="scrollbar__track">
            <span className="scrollbar__thumb show"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
