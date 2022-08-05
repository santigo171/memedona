import React from "react";

import "./ErrorComponent.scss";

import meme1 from "../../assets/img/meme1.jpg";

function ErrorComponent() {
  function reloadPage() {
    window.location.reload();
  }

  return (
    <div className="ErrorComponent">
      <img
        className="ErrorComponent__image"
        src={meme1}
        alt="A meme of shrek saying tumba la casa mami"
      />
      <div className="ErrorComponent__text">
        <p className="ErrorComponent__text__primary">There was an error !!!</p>
        {!window.navigator.onLine && (
          <p className="ErrorComponent__text__secondary">
            You should check your internet conection
          </p>
        )}
      </div>
      <button className="ErrorComponent__button" onClick={reloadPage}>
        Reload Memedona
      </button>
    </div>
  );
}

export { ErrorComponent };
