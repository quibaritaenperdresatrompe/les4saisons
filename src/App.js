import React, { lazy, Suspense, useState } from "react";
import { isWithinInterval } from "date-fns";
import { ThemeProvider, createUseStyles } from "react-jss";

import Season from "./Season";
import Modal from "./Modal";
import data from "./data.json";
import ThemeButton from "./ThemeButton";

const NextSeason = lazy(() => import("./NextSeason"));

const season = current(data.seasons);

const useStyles = createUseStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "system-ui",
    height: "100vh",
    backgroundColor: ({ theme }) => (theme === "light" ? "white" : "black"),
    color: ({ theme }) => (theme === "light" ? "black" : "white"),
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginTop: 8,
    marginBottom: 8,
  },
  actions: {
    marginTop: 8,
    marginBottom: 8,
  },
});

function App() {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  const classes = useStyles({ theme });
  return (
    <ThemeProvider theme={{ type: theme, toggle }}>
      <div className={classes.root}>
        <header className={classes.header}>
          <ThemeButton />
        </header>
        <main className={classes.main}>
          <div className={classes.content} data-testid="content">
            <Season name={season[0]} />
          </div>
          <div className={classes.actions} data-testid="actions">
            <Modal label="Et après ?">
              <Suspense fallback={<div>Loading...</div>}>
                <NextSeason name={season[1].next} />
              </Suspense>
            </Modal>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

export function current(seasons) {
  return Object.entries(seasons).filter(([name, season]) => {
    const currentYear = new Date().getFullYear();
    if (name === "winter") {
      return (
        isWithinInterval(new Date(), {
          start: new Date(
            currentYear - 1,
            season.beginAt.month - 1,
            season.beginAt.day
          ),
          end: new Date(currentYear, season.endAt.month - 1, season.endAt.day),
        }) ||
        isWithinInterval(new Date(), {
          start: new Date(
            currentYear,
            season.beginAt.month - 1,
            season.beginAt.day
          ),
          end: new Date(
            currentYear + 1,
            season.endAt.month - 1,
            season.endAt.day
          ),
        })
      );
    }
    return isWithinInterval(new Date(), {
      start: new Date(
        currentYear,
        season.beginAt.month - 1,
        season.beginAt.day
      ),
      end: new Date(currentYear, season.endAt.month - 1, season.endAt.day),
    });
  })[0];
}
