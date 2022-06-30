import React from "react";

import { apiConsumer } from "../../MemedonaContext/apiConsumer";

import "./Topic.scss";

function Topic({ name, color, logoUrl }) {
  const formattedLogoUrl = apiConsumer.getAssetUrl(logoUrl);
  const imgAlt = `${name} topic logo`;
  const TopicTextStyle = color ? { color } : {};

  return (
    <div className="Topic">
      <p style={TopicTextStyle} className="Topic__name">
        {name}
      </p>
      <img src={formattedLogoUrl} alt={imgAlt} className="Topic__logo" />
    </div>
  );
}

export { Topic };
