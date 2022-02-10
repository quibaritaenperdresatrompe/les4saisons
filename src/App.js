import { lazy, Suspense } from "react";
import { isWithinInterval } from "date-fns";

import "./App.css";
import Season from "./Season";
import Modal from "./Modal";
import data from "./data.json";

const NextSeason = lazy(() => import("./NextSeason"));

const current = Object.entries(data.seasons).filter(([name, season]) => {
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
    start: new Date(currentYear, season.beginAt.month - 1, season.beginAt.day),
    end: new Date(currentYear, season.endAt.month - 1, season.endAt.day),
  });
})[0];

function App() {
  return (
    <div className="App-root">
      <main className="App-main">
        <div className="App-content">
          <Season name={current[0]} />
        </div>
        <div className="App-actions">
          <Modal label="Et après ?">
            <Suspense fallback={<div>Loading...</div>}>
              <NextSeason name={current[1].next} />
            </Suspense>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default App;
