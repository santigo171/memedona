import React from "react";

import { Topic } from "./Topic";
import { MemedonaContext } from "../../MemedonaContext";

import "./TopicList.scss";

// let windowListenerActivated = false;

function TopicList() {
  const { topics, currentTopic, setCurrentTopic } =
    React.useContext(MemedonaContext);

  const currentTopicIndex = topics.findIndex(
    (topic) => topic.id === currentTopic.id
  );

  const { id, name, color, logoUrl } = currentTopic;

  const ref = React.useRef();
  // let lastScrollTop = 0;

  // if (!windowListenerActivated) {
  //   window.addEventListener("scroll", () => {
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;
  //     if (!(scrollTop > lastScrollTop)) {
  //       // ref.current.style.top = "0";
  //       console.log("up");
  //     } else {
  //       // ref.current.style.top = "-100px";
  //       console.log("down");
  //     }
  //     lastScrollTop = scrollTop;
  //   });

  //   windowListenerActivated = true;
  // }

  function Arrow({ left }) {
    const onClick = () => {
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
    <div ref={ref} className="TopicList">
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
