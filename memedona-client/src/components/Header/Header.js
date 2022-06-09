import React from "react";
import "./Header.scss";

import defaultLogoUrl from "../../assets/img/defaultLogo.png";

function Header(props) {
  const logoProps = props.logoProps || {};
  logoProps.url = logoProps.url || defaultLogoUrl;
  return (
    <header className="Header">
      <div className="Header__logo">
        <img
          className="Header__logo__img"
          src={logoProps.url}
          alt="Memedona Logo"
        />
      </div>
      <p style={{ color: logoProps.color }} className="Header__text">
        Memedona
      </p>
    </header>
  );
}

export { Header };
