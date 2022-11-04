import React from "react";

import { Meme } from "./Meme";
import { LoadingMoreMemes } from "./LoadingMoreMemes";
import { MemedonaContext } from "../../MemedonaContext";

import "./MemeList.scss";

function MemeList() {
  const { currentTopic, fetchMoreMemes } = React.useContext(MemedonaContext);
  let { memes } = currentTopic;
  if (!memes) memes = [];

  return (
    <div className="MemeList">
      {memes.map(({ id, collectorId, source, likes, shares, type, url }) => (
        <Meme
          key={id}
          id={id}
          collectorId={collectorId}
          source={source}
          likes={likes}
          shares={shares}
          type={type}
          url={url}
        />
      ))}
      <LoadingMoreMemes functionOnVisible={fetchMoreMemes} />
    </div>
  );
}

export { MemeList };
