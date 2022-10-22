import React from "react";
import "./AppUi.scss";

import { Header } from "../Header";
import { TopicList } from "../TopicList";
import { MemeList } from "../MemeList/MemeList";
import { ErrorComponent } from "../ErrorComponent";
import { LoadingMoreMemes } from "../MemeList/LoadingMoreMemes.js";
import { AddToHomeScreen } from "../AddToHomeScreen";
import { Info } from "../Info";

import { MemedonaContext } from "../../MemedonaContext";

const AppUi = React.forwardRef(() => {
  const { loading, error, showA2HS, showInfo } =
    React.useContext(MemedonaContext);

  return (
    <>
      {!showInfo && !loading && !error && <TopicList />}
      <div className="AppUi">
        <Header />
        {showInfo && <Info />}
        {!showInfo && !loading && !error && <MemeList />}
        {!showInfo && error && <ErrorComponent />}
        {loading && !error && <LoadingMoreMemes functionOnVisible={() => {}} />}
        {!showInfo && showA2HS && <AddToHomeScreen />}
      </div>
    </>
  );
});

export { AppUi };
