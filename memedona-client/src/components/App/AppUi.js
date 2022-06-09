import React from "react";
import "./AppUi.scss";

import { Header } from "../Header/Header";

import { MemedonaContext } from "../../MemedonaContext";

const AppUi = React.forwardRef(() => {
  const { memes, logoProps } = React.useContext(MemedonaContext);

  return (
    <div className="AppUi">
      <Header logoProps={logoProps} />
      <p>{memes}</p>
    </div>
  );
});

export { AppUi };
