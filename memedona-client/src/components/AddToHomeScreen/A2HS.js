import React from "react";

import { MemedonaContext } from "../../MemedonaContext";

import shaggy from "../../assets/img/shaggy.png";

import "./A2HS.scss";

function A2HS() {
  const { setShowA2HS } = React.useContext(MemedonaContext);
  const { A2HSPrompt, setA2HSPrompt } = React.useState(null);

  React.useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("A2HS");
      e.preventDefault();
      setA2HSPrompt(e);
      setShowA2HS(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startUpA2HS() {
    console.log(A2HSPrompt);
    setShowA2HS(false);
    A2HSPrompt.prompt();
    A2HSPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      setA2HSPrompt(null);
    });
  }

  return (
    <div className="A2HS">
      <button onClick={startUpA2HS} className="A2HS__button">
        Add to Home Screen
      </button>
      <p className="A2HS__text">
        This feature will allow you to have{" "}
        <span className="A2HS__text__span">Memedona</span> in your home screen.
        "Cool" says Shaggy
      </p>
      <img className="A2HS__img" src={shaggy} alt="Shaggy" />
      <button onClick={() => setShowA2HS(false)} className="A2HS__X">
        X
      </button>
    </div>
  );
}

export { A2HS };
