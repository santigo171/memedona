import React from "react";

import { MemedonaContext } from "../../MemedonaContext";
import { apiConsumer } from "../../MemedonaContext/apiConsumer";

import "./Meme.scss";

import like_image from "../../assets/img/like.png";
import share_image from "../../assets/img/share.png";

function Meme({ id, collectorId, source, likes, shares, type, url }) {
  const { collectors } = React.useContext(MemedonaContext);

  const collector = collectors.filter(
    (collector) => collector.id === collectorId
  )[0];

  const formattedCollectorLogoUrl = apiConsumer.getAssetUrl(collector.logoUrl);

  return (
    <div className="Meme">
      <div className="Meme__header">
        <p className="Meme__header__text">From </p>
        <img
          className="Meme__header__logo"
          src={formattedCollectorLogoUrl}
          alt={source}
        />
        <span className="Meme__header__text Meme__header__text--bold">
          {" "}
          {source}
        </span>
      </div>
      <img className="Meme__content" src={url} alt="Meme" />
      <div className="Meme__footer">
        <button className="Meme__footer__button">
          <img src={like_image} alt="" />
          <span className="Meme__footer__button__counter">{likes}</span>
        </button>
        <button className="Meme__footer__button">
          <img src={share_image} alt="" />
          <span className="Meme__footer__button__counter">{shares}</span>
        </button>
      </div>
    </div>
  );
}

export { Meme };
