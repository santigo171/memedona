import React from "react";

import { MemedonaContext } from "../../MemedonaContext";

import screenshot1 from "../../assets/img/screenshots/1.jpg";
import doofPhone from "../../assets/img/memes/doofPhone.png";
import doofMap from "../../assets/img/memes/doofMap.jpg";

import "./A2HS.scss";

let mustRender = true;

function A2HS() {
  const { saveInstalled, setShowInfo, installed } =
    React.useContext(MemedonaContext);
  const [_installed, _setInstalled] = React.useState(false);

  React.useEffect(() => {
    if (installed) {
      mustRender = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="A2HS">
      {!_installed && mustRender && (
        <>
          <p className="A2HS__title">
            Looks like you're enjoying <span className="brand">Memedona</span>
          </p>
          <p className="A2HS__subtitle">
            Why don't install it on your phone, like Doofenshmirtz
          </p>
          <div className="A2HS__imgdiv">
            <img
              src={screenshot1}
              alt="Screenshot were Memedona is installed as an app in home screen."
              className="A2HS__imgdiv__image"
            />
            <img
              src={doofPhone}
              alt="Doofenshmirtz, a character from Phineas and Ferb holding a Doofenshmirtz"
              className="A2HS__imgdiv__image"
            />
          </div>
          <button
            className="A2HS__button A2HS__button--primary"
            onClick={() => {
              setShowInfo(true);
              _setInstalled(true);
            }}
          >
            Add to home screen
          </button>
          <button
            className="A2HS__button"
            onClick={() => {
              saveInstalled(true);
              _setInstalled(true);
            }}
          >
            Already added
          </button>
        </>
      )}
      {_installed && mustRender && (
        <>
          <img
            className="A2HS__doof-happy"
            src={doofMap}
            alt="Doofenshmirtz happy"
          />
          <p className="A2HS__title">
            Doofenshmirtz said that who have{" "}
            <span className="brand">Memedona</span> added on home screen is
            epic. You are epic! You won't see this message again
          </p>
        </>
      )}
    </div>
  );
}

export { A2HS };
