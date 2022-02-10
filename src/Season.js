import React from "react";
import { formatDistanceToNowStrict } from "date-fns";

import "./Season.css";
import data from "./data.json";

function Season({ name }) {
  const season = data.seasons[name];
  const currentYear = new Date().getFullYear();
  const distance = formatDistanceToNowStrict(
    new Date(
      currentYear + (name === "winter" ? -1 : 0),
      season.beginAt.month - 1,
      season.beginAt.day
    ),
    { unit: "day", addSuffix: true }
  );
  return (
    <div className="Season-root">
      <span role="img" aria-label={name} className="Season-icon">
        {season.icon}
      </span>
      <h1 className="Season-title">{season.name}</h1>
      <p className="Season-content">{distance}</p>
    </div>
  );
}

export default Season;
