import React from "react";
import "./AppUi.scss";

import { Header } from "../Header";
import { TopicList } from "../TopicList";
import { MemeList } from "../MemeList/MemeList";
import { ErrorComponent } from "../ErrorComponent";

import { MemedonaContext } from "../../MemedonaContext";

const AppUi = React.forwardRef(() => {
  const { loading, error } = React.useContext(MemedonaContext);

  return (
    <>
      {!loading && !error && <TopicList />}
      <div className="AppUi">
        <Header />
        {!loading && !error && <MemeList />}
        {error && <ErrorComponent />}
      </div>
    </>
  );
});

export { AppUi };
