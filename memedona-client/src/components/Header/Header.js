import React from "react";

import defaultLogo from "../../assets/img/defaultLogo.png";

function Header({ logo_url = defaultLogo }) {
  return (
    <header>
      <img src={logo_url} alt="Memedona Logo" />
      <p></p>
    </header>
  );
}

export { Header };
