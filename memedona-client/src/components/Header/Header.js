import React from "react";

import { MemedonaContext } from "../../MemedonaContext";
import defaultLogoUrl from "../../assets/img/defaultLogo.png";

import "./Header.scss";

function Header() {
  const { logoProps: contextLogoProps } = React.useContext(MemedonaContext);

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
        <p style={headerTextStyle} className="Header__container__text">
          Memedona
        </p>
      </div>
    </header>
  );
}

export { Header };
