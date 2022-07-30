import React from "react";

import { useOnScreen } from "../../MemedonaContext/useOnScreen";

import "./LoadingMoreMemes.scss";

import defaultLogo from "../../assets/img/defaultLogo.png";

function LoadingMoreMemes({ functionOnVisible }) {
  const ref = React.useRef();
  const isVisible = useOnScreen(ref);
  if (isVisible) functionOnVisible();

  return (
    <div ref={ref} className="LoadingMoreMemes">
      <div className="LoadingMoreMemes__content">
        <img
          className="LoadingMoreMemes__content__img"
          src={defaultLogo}
          alt="Memedona: Shitposting memes since 1852 xd"
        />
        <p className="LoadingMoreMemes__content__title">
          Loading your memes...
        </p>
        <p className="LoadingMoreMemes__content__subtitle">
          Memedona: Shitposting memes since 1852 xd
        </p>
      </div>
    </div>
  );
}

export { LoadingMoreMemes };
