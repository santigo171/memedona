import React from "react";

import { MemedonaContext } from "../../MemedonaContext";
import defaultLogoUrl from "../../assets/img/defaultLogo.png";
import infoIcon from "../../assets/img/icons/info.png";

import "./Header.scss";

function Header() {
  const {
    logoProps: contextLogoProps,
    showInfo,
    setShowInfo,
  } = React.useContext(MemedonaContext);

  const logoProps = contextLogoProps || {};
  logoProps.url = logoProps.url || defaultLogoUrl;
  const logoColor = `#${logoProps.color}`;

  const headerTextStyle = logoProps.color ? { color: logoColor } : {};

  return (
    <header className="Header">
      <div className="Header__container">
        <div className="Header__container__logo">
          <img
            className="Header__container__logo__img"
            src={logoProps.url}
            alt="Memedona Logo"
          />
        </div>
        <h1 style={headerTextStyle} className="Header__container__text">
          Memedona
        </h1>
        <div className="Header__container__info">
          <button
            onClick={() => {
              setShowInfo(!showInfo);
            }}
          >
            {!showInfo && (
              <img
                className="Header__container__info__img"
                src={infoIcon}
                alt="Info icon"
              />
            )}
            {showInfo && <span className="Header__container__info__x">X</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export { Header };
