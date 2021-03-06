import React from "react";
import { Divider, TextLinkButton } from "../..";
import "./styles.css";

const CardImageTitle = ({ title, imageData = [], footerLink, footerText }) => {
  const RenderCards = () => {
    return imageData.map((d, i) => (
      <a
        href={d.link}
        className={`item ${imageData.length === 1 ? "fullWidth" : ""}`}
        key={`${title}_${d.image}_${i}_${footerText}`}
      >
        <img src={d.image} alt={d.imageTitle} />
        <span>{d.imageTitle}</span>
      </a>
    ));
  };

  return (
    <div className="cardImage__title">
      {title && (
        <div className="cardImage__header">
          <h2 className="header__title">{title}</h2>
        </div>
      )}
      {imageData.length > 0 && (
        <div className="cardImage__body">
          <RenderCards />
        </div>
      )}
      {footerText && (
        <div className="cardImage__footer">
          <Divider h={10} c="transparent" />
          <TextLinkButton text={footerText} href={footerLink} />
        </div>
      )}
    </div>
  );
};

export default CardImageTitle;
