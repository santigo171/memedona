import React from "react";

import { Topic } from "./Topic";
import { MemedonaContext } from "../../MemedonaContext";

import "./TopicList.scss";

function TopicList() {
  // Style
  const TopicListRef = React.useRef(null);
  React.useEffect(() => {
    const el = TopicListRef.current;
    if (el == null) return;

    let lastScrollTop;
    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 170) {
        el.style.position = "fixed";
        if (scrollTop > lastScrollTop) {
          el.style.top = "-100px";
        } else {
          el.style.top = "0";
        }
      } else {
        el.style.position = "absolute";
        el.style.top = "70px";
      }
      lastScrollTop = scrollTop;
    });
  }, [TopicListRef]);

  // Logic
  const { topics, currentTopic, setCurrentTopic } =
    React.useContext(MemedonaContext);

  const currentTopicIndex = topics.findIndex(
    (topic) => topic.id === currentTopic.id
  );

  const { id, name, color, logoUrl } = currentTopic;

  function Arrow({ left }) {
    const onClick = () => {
      topics[currentTopicIndex] = currentTopic;
      if (left) {
        setCurrentTopic(topics[currentTopicIndex - 1]);
      } else {
        setCurrentTopic(topics[currentTopicIndex + 1]);
      }
    };
    return (
      <button className="Arrow" onClick={onClick}>
        {left ? "<" : ">"}
      </button>
    );
  }

  return (
    <div ref={TopicListRef} className="TopicList">
      {currentTopicIndex !== 0 ? <Arrow left={true} /> : <div></div>}
      <Topic key={id} name={name} color={color} logoUrl={logoUrl} />
      {currentTopicIndex !== topics.length - 1 ? (
        <Arrow left={false} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export { TopicList };
