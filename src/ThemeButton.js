import React from "react";
import { useTheme } from "react-jss";

import useStyles from "./ThemeButton.style";

function ThemeButton() {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <button onClick={theme.toggle} className={classes.root}>
      Switch to {theme.type === "dark" ? "light" : "dark"} theme
    </button>
  );
}

export default ThemeButton;
