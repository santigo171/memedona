import React from "react";
import "./AppUi.scss";

import { Header } from "../Header";
import { TopicList } from "../TopicList";
import { MemeList } from "../MemeList/MemeList";

import { MemedonaContext } from "../../MemedonaContext";

const AppUi = React.forwardRef(() => {
  const { loading } = React.useContext(MemedonaContext);

  return (
    <div className="AppUi">
      <Header />
      {!loading && <TopicList />}
      {!loading && <MemeList />}
    </div>
  );
});

export { AppUi };
