import React from "react";

import { changeFavicon } from "./changeFavicon";
import { apiConsumer } from "./apiConsumer";

const API_URL = process.env.REACT_APP_API_URL;

const MemedonaContext = React.createContext();

function MemedonaProvider({ children }) {
  const [logoProps, setLogoProps] = React.useState(undefined);
  const [collectors, setCollectors] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [currentTopic, setCurrentTopic] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [videosMuted, setVideosMuted] = React.useState(true);
  const [showA2HS, setShowA2HS] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  React.useEffect(() => {
    initialConsumeApi();
  }, []);

  async function initialConsumeApi() {
    try {
      // Set Api url
      apiConsumer.setApiUrl(API_URL);

      // Brand & Header
      const brand = await apiConsumer.getCurrentBrand();
      if (!brand.message) {
        const logoUrl = apiConsumer.getAssetUrl(brand.logoUrl);
        setLogoProps({
          color: brand.color,
          url: logoUrl,
        });
        changeFavicon(logoUrl);
      }

      // Collectors
      const fetchedCollectors = await apiConsumer.getCollectors();
      setCollectors(fetchedCollectors);

      // Topics
      const fetchedTopics = await apiConsumer.getTopics();
      setTopics(fetchedTopics);
      setCurrentTopic(fetchedTopics[0]);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  async function fetchMoreMemes() {
    console.log("MORE MEMES");
    if (loading) return;
    let fetchedMemes;

    setTimeout(async () => {
      if (currentTopic.nextFetchMoreMemesLink) {
        fetchedMemes = await apiConsumer.getMemes(
          currentTopic.nextFetchMoreMemesLink
        );
      } else {
        fetchedMemes = await apiConsumer.getMemes(undefined, {
          "topic-id": currentTopic.id,
        });
      }

      let newCurrentTopic = { ...currentTopic };
      if (!newCurrentTopic.memes) newCurrentTopic.memes = [];
      newCurrentTopic.memes.push(...fetchedMemes.results);
      newCurrentTopic.nextFetchMoreMemesLink = fetchedMemes.next;
      setCurrentTopic(newCurrentTopic);
    }, 0);
  }

  return (
    <MemedonaContext.Provider
      value={{
        logoProps,
        collectors,
        topics,
        currentTopic,
        setCurrentTopic,
        fetchMoreMemes,
        loading,
        error,
        videosMuted,
        setVideosMuted,
        showA2HS,
        setShowA2HS,
        showInfo,
        setShowInfo,
      }}
    >
      {children}
    </MemedonaContext.Provider>
  );
}

export { MemedonaContext, MemedonaProvider };
