import React from "react";

import { MemedonaContext } from "../../MemedonaContext";
import { download } from "../../MemedonaContext/download";
import { apiConsumer } from "../../MemedonaContext/apiConsumer";
import { VideoJS } from "./VideoJS";

import "./Meme.scss";

import like_image from "../../assets/img/icons/like.png";
import share_image from "../../assets/img/icons/share.png";
import download_image from "../../assets/img/icons/download.png";

function Meme({ id, collectorId, source, likes, shares, type, url }) {
  const { collectors } = React.useContext(MemedonaContext);

  const collector = collectors.filter(
    (collector) => collector.id === collectorId
  )[0];

  const formattedCollectorLogoUrl = apiConsumer.getAssetUrl(collector.logoUrl);

  // Like
  const likeCounterRef = React.useRef();
  let liked = false;
  async function likeMeme() {
    if (liked) return;
    liked = true;
    likeCounterRef.current.classList.add("Meme__footer__button__counter--used");
    likeCounterRef.current.innerHTML =
      parseInt(likeCounterRef.current.innerHTML) + 1;
    await apiConsumer.patchMeme({
      id,
      likes: 1,
    });
  }

  // Share
  const shareCounterRef = React.useRef();
  let shared = false;

  async function sendShare() {
    shared = true;
    shareCounterRef.current.classList.add(
      "Meme__footer__button__counter--used"
    );
    shareCounterRef.current.innerHTML =
      parseInt(shareCounterRef.current.innerHTML) + 1;
    await apiConsumer.patchMeme({
      id,
      shares: 1,
    });
  }

  function shareMeme() {
    if ("share" in navigator) {
      try {
        navigator.share({
          text: "Look this Memedona Meme!",
          url: url,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      download(url);
    }
    if (shared) return;
    sendShare();
  }

  function downloadMeme() {
    download(url);
    if (shared) return;
    sendShare();
  }

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
      {type === "img" && (
        <img className="Meme__content" src={url} alt="Meme did not load" />
      )}
      {type === "vid" && <VideoJS url={url} />}
      <div className="Meme__footer">
        <button className="Meme__footer__button" onClick={likeMeme}>
          <img src={like_image} alt="Like button" />
          <span ref={likeCounterRef} className="Meme__footer__button__counter">
            {likes}
          </span>
        </button>
        <button className="Meme__footer__button" onClick={shareMeme}>
          <img src={share_image} alt="Share button" />
          <span ref={shareCounterRef} className="Meme__footer__button__counter">
            {shares}
          </span>
        </button>
        <button
          className="Meme__footer__button Meme__footer__button--right"
          onClick={downloadMeme}
        >
          <img src={download_image} alt="Download button" />
        </button>
      </div>
    </div>
  );
}

export { Meme };
