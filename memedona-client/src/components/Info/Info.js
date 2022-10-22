import React from "react";

import "./Info.scss";
import { ReactComponent as TriangleSvg } from "../../assets/img/icons/triangle.svg";

import screenshot1 from "../../assets/img/screenshots/1.jpg";
import screenshot2 from "../../assets/img/screenshots/2.jpg";
import screenshot3 from "../../assets/img/screenshots/3.jpg";
import screenshot4 from "../../assets/img/screenshots/4.jpg";
import screenshot5 from "../../assets/img/screenshots/5.jpg";

function Setting({ option, children }) {
  const [show, setShow] = React.useState(false);
  const TriangleStyle = show ? "" : "Setting__option__icon";
  return (
    <div>
      <div className="Setting__option">
        <button onClick={() => setShow(!show)}>
          <TriangleSvg className={TriangleStyle} />
        </button>
        <h4 className="Setting__option__h4">{option}</h4>
      </div>
      {show && children}
    </div>
  );
}

function ChangeLogRecord({ version, children }) {
  return (
    <div className="ChangeLogRecord">
      <p className="ChangeLogRecord__version">{version}</p>
      <p>{children}</p>
    </div>
  );
}

function Info() {
  return (
    <div className="Info">
      <p className="light">Shitposting memes since 1852 xd</p>
      <section>
        <p>
          Created by{" "}
          <a
            target="_blank"
            href="https://santigo171.github.io/"
            rel="noreferrer"
          >
            David Hurtado
          </a>
        </p>
        <p>
          I will love to read your comments, bug reports and suggestions on
          twitter <b>@santigo171</b>.
        </p>
      </section>
      <section>
        <h3>Settings</h3>
        <Setting option="Add to home screen">
          <div className="Setting--half--unequal">
            <p>
              At the moment, Memedona is not available on the Play Store or on
              the App Store. But you can install it with your browser following
              these steps:
            </p>
            <img
              src={screenshot1}
              alt="Screenshot were Memedona is installed as an app in home screen."
            />
          </div>
          <p>For Android phones:</p>
          <div className="Setting--half">
            <img
              src={screenshot2}
              alt="Screenshot where someone clicks site settings in his browser"
            />
            <img
              src={screenshot3}
              alt='Screenshot where someone clicks "Install app" on his browser'
            />
          </div>
          <p>For iOS phones (Only works with Safari browser):</p>
          <div className="Setting--half">
            <img
              src={screenshot4}
              alt="Screenshot where someone clicks share site in his browser"
            />
            <img
              src={screenshot5}
              alt='Screenshot where someone clicks "Add to home screen" on his browser'
            />
          </div>
        </Setting>
      </section>
      <section>
        <h3>Change log</h3>
        <ChangeLogRecord version="1.0.0">
          EPIC DEPLOY AMONGUS BUN BUN LETS GO 💨😏🧵
        </ChangeLogRecord>
      </section>
      <section>
        Some icons created by{" "}
        <a href="https://www.flaticon.com/free-icons/info" title="info icons">
          Stockio - Flaticon
        </a>
      </section>
    </div>
  );
}

export { Info };
