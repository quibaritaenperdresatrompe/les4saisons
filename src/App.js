import React, { lazy, Suspense } from "react";
import { isWithinInterval } from "date-fns";

import "./App.css";
import Season from "./Season";
import Modal from "./Modal";
import data from "./data.json";

const NextSeason = lazy(() => import("./NextSeason"));

const season = current(data.seasons);

function App() {
  return (
    <div className="App-root">
      <main className="App-main">
        <div className="App-content" data-testid="content">
          <Season name={season[0]} />
        </div>
        <div className="App-actions" data-testid="actions">
          <Modal label="Et après ?">
            <Suspense fallback={<div>Loading...</div>}>
              <NextSeason name={season[1].next} />
            </Suspense>
          </Modal>
        </div>
      </main>
    </div>
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
