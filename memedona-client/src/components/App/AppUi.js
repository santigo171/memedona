import React from "react";
import "./AppUi.scss";

import { Header } from "../Header";
import { TopicList } from "../TopicList";
import { MemeList } from "../MemeList/MemeList";
import { ErrorComponent } from "../ErrorComponent";
import { LoadingMoreMemes } from "../MemeList/LoadingMoreMemes.js";
import { AddToHomeScreen } from "../AddToHomeScreen";

import { MemedonaContext } from "../../MemedonaContext";

const AppUi = React.forwardRef(() => {
  const { loading, error, showA2HS } = React.useContext(MemedonaContext);

  return (
    <>
      {!loading && !error && <TopicList />}
      <div className="AppUi">
        <Header />
        {!loading && !error && <MemeList />}
        {error && <ErrorComponent />}
        {loading && !error && <LoadingMoreMemes functionOnVisible={() => {}} />}
        {showA2HS && <AddToHomeScreen />}
      </div>
    </>
  );
});

export { AppUi };
