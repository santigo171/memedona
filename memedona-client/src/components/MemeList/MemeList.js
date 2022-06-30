import React from "react";

import { Meme } from "./Meme";
import { MemedonaContext } from "../../MemedonaContext";
import { useOnScreen } from "../../MemedonaContext/useOnScreen";

import "./MemeList.scss";

function MemeList() {
  const { currentTopic, fetchMoreMemes } = React.useContext(MemedonaContext);
  let { memes } = currentTopic;
  if (!memes) memes = [];
  if (memes.length < 5) fetchMoreMemes();
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
      <InfiniteScroll functionOnVisible={fetchMoreMemes} />
    </div>
  );
}

function InfiniteScroll({ functionOnVisible }) {
  const ref = React.useRef();
  const isVisible = useOnScreen(ref);
  if (isVisible) functionOnVisible();
  return <div ref={ref} className="InfiniteScroll" />;
}

export { MemeList };
