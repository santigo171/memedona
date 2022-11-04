import React from "react";

import { changeFavicon } from "./changeFavicon";
import { apiConsumer } from "./apiConsumer";
import { useLocalStorage } from "./useLocalStorage";

const API_URL = process.env.REACT_APP_API_URL;
const COLLECTOR_URL = process.env.REACT_APP_COLLECTOR_URL;
const MAX_LAST_MEME_EXCLUDE_MIN =
  process.env.REACT_APP_MAX_LAST_MEME_EXCLUDE_MIN;
const MAX_LAST_MEME_EXCLUDE = Number(MAX_LAST_MEME_EXCLUDE_MIN) * 60000;

const MemedonaContext = React.createContext();

function MemedonaProvider({ children }) {
  const {
    item: memeExclude,
    saveItem: saveMemeExclude,
    // loading: memeExcludeLoading,
    // error: memeExcludeError,
  } = useLocalStorage("MEMEDONA_V1_EXCLUDE", []);
  const {
    item: lastMemeExclude,
    saveItem: saveLastMemeExclude,
    // loading: lastMemeExcludeLoading,
    // error: lastMemeExcludeError,
  } = useLocalStorage("MEMEDONA_V1_LAST_EXCLUDE", 0);

  const {
    item: installed,
    saveItem: saveInstalled,
    // loading: installedLoading,
    // error: installedError,
  } = useLocalStorage("MEMEDONA_V1_INSTALLED", false);

  const [logoProps, setLogoProps] = React.useState(undefined);
  const [collectors, setCollectors] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [currentTopic, setCurrentTopic] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [videosMuted, setVideosMuted] = React.useState(true);
  const [showA2HS, setShowA2HS] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);

  // Initial consume api
  React.useEffect(() => {
    initialConsumeApi();
  }, []);

  async function initialConsumeApi() {
    try {
      // Start collector
      apiConsumer.startCollector(COLLECTOR_URL);

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

  // Meme fetching
  async function fetchMoreMemes() {
    console.log("Fetching memes");
    if (loading) return;
    let paramsToFetch = {
      "topic-id": currentTopic.id,
    };

    const now = Date.now();
    if (
      now < lastMemeExclude + MAX_LAST_MEME_EXCLUDE &&
      currentTopic.id !== 2
    ) {
      // Will search in localstorage exclude variable
      paramsToFetch.exclude = JSON.stringify(memeExclude);
    } else {
      // Will search in currentTopic exclude variable
      if (!currentTopic.exclude) currentTopic.exclude = [];
      paramsToFetch.exclude = JSON.stringify(currentTopic.exclude);
    }

    const fetchedMemes = await apiConsumer.getMemes(paramsToFetch);
    if (currentTopic.id !== 2) {
      saveMemeExclude(fetchedMemes.exclude);
    } else {
      currentTopic.exclude = fetchedMemes.exclude;
    }
    saveLastMemeExclude(Date.now());

    let newCurrentTopic = { ...currentTopic };
    if (!newCurrentTopic.memes) newCurrentTopic.memes = [];
    newCurrentTopic.memes.push(...fetchedMemes.results);
    setCurrentTopic(newCurrentTopic);
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
        installed,
        saveInstalled,
      }}
    >
      {children}
    </MemedonaContext.Provider>
  );
}

export { MemedonaContext, MemedonaProvider };
