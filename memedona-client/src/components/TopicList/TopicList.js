import React from "react";

import { Topic } from "./Topic";
import { MemedonaContext } from "../../MemedonaContext";

import "./TopicList.scss";

function TopicList() {
  const { topics, currentTopicId, setCurrentTopicId } =
    React.useContext(MemedonaContext);
  let currentTopicIndex;

  const currentTopic = topics.filter((topic, index) => {
    if (topic.id === currentTopicId) {
      currentTopicIndex = index;
      return true;
    } else {
      return false;
    }
  })[0];
  const { id, name, color, logoUrl } = currentTopic;

  function Arrow({ left }) {
    const onClick = () => {
      if (left) {
        setCurrentTopicId(topics[currentTopicIndex - 1].id);
      } else {
        setCurrentTopicId(topics[currentTopicIndex + 1].id);
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
