import React from "react";

import { Topic } from "./Topic";
import { MemedonaContext } from "../../MemedonaContext";

import "./TopicList.scss";

function TopicList() {
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
    <div className="TopicList">
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
