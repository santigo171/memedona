import React, { useEffect } from "react";

import { changeFavicon } from "./changeFavicon";
import { apiConsumer } from "./apiConsumer";

const API_URL = process.env.REACT_APP_API_URL;

const MemedonaContext = React.createContext();

function MemedonaProvider({ children }) {
  const [memes, setMemes] = React.useState([]);
  const [logoProps, setLogoProps] = React.useState(undefined);
  const [collectors, setCollectors] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [currentTopicId, setCurrentTopicId] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [nextFetchMoreMemesLink, setNextFetchMoreMemesLink] =
    React.useState(undefined);

  useEffect(() => {
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
      setCurrentTopicId(fetchedTopics[0].id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMoreMemes() {
    if (loading) return;
    let fetchedMemes;

    if (nextFetchMoreMemesLink) {
      fetchedMemes = await apiConsumer.getMemes(nextFetchMoreMemesLink);
    } else {
      fetchedMemes = await apiConsumer.getMemes(undefined, {
        "topic-id": currentTopicId,
        type: "img",
      });
    }

    setNextFetchMoreMemesLink(fetchedMemes.next);
    setMemes([...memes, ...fetchedMemes.results]);
    // console.log(memes.length);
  }

  return (
    <MemedonaContext.Provider
      value={{
        memes,
        logoProps,
        collectors,
        topics,
        currentTopicId,
        setCurrentTopicId,
        fetchMoreMemes,
        loading,
      }}
    >
      {children}
    </MemedonaContext.Provider>
  );
}

export { MemedonaContext, MemedonaProvider };
