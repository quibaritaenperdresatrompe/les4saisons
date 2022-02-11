import { createUseStyles } from "react-jss";

const useModalStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    margin: "auto",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    padding: "16px",
    backgroundColor: "grey",
    width: "fit-content",
    height: "fit-content",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  content: { marginTop: 8, marginBottom: 8 },
  actions: { marginTop: 8, marginBottom: 8 },
  button: {
    border: "none",
    padding: "4px 8px",
    fontWeight: 700,
    cursor: "pointer",
    backgroundColor: theme.type === "light" ? "black" : "white",
    color: theme.type === "light" ? "white" : "black",
  },
}));

export default useModalStyles;
