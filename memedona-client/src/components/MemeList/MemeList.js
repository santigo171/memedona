import React from "react";

import { Meme } from "./Meme";
import { MemedonaContext } from "../../MemedonaContext";

import "./MemeList.scss";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  React.useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

function MemeList() {
  const { memes, fetchMoreMemes, currentTopicId } =
    React.useContext(MemedonaContext);
  console.log(currentTopicId);
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
