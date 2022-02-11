import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  root: {
    border: "none",
    padding: "4px 8px",
    fontWeight: 700,
    cursor: "pointer",
    backgroundColor: theme.type === "light" ? "black" : "white",
    color: theme.type === "light" ? "white" : "black",
  },
}));

export default useStyles;
