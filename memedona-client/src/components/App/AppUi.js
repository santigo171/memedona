import React from "react";
import "./AppUi.scss";

import { Header } from "../Header";
import { TopicList } from "../TopicList";
import { MemeList } from "../MemeList/MemeList";
import { ErrorComponent } from "../ErrorComponent";
import { LoadingMoreMemes } from "../MemeList/LoadingMoreMemes.js";
import { Info } from "../Info";

import { MemedonaContext } from "../../MemedonaContext";

const AppUi = React.forwardRef(() => {
  const { loading, error, showInfo } = React.useContext(MemedonaContext);

  return (
    <>
      {!showInfo && !loading && !error && <TopicList />}
      <div className="AppUi">
        <Header />
        {showInfo && <Info />}
        {!showInfo && !loading && !error && <MemeList />}
        {!showInfo && error && <ErrorComponent />}
        {loading && !error && <LoadingMoreMemes functionOnVisible={() => {}} />}
      </div>
    </>
  );
});

export { AppUi };
