import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App, { current } from "./App";
import data from "./data.json";

describe(App.name, () => {
  it("renders the content", () => {
    render(<App />);
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });
  it("renders the actions", () => {
    render(<App />);
    expect(screen.getByTestId("actions")).toBeInTheDocument();
  });
});

describe("current", () => {
  describe("on january", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 0, 1));
    });
    it("returns winter season", () => {
      const [id] = current(data.seasons);
      expect(id).toBe("winter");
    });
    afterAll(() => {
      jest.useRealTimers();
    });
  });
  describe("on june", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 5, 1));
    });
    it("returns spring season", () => {
      const [id] = current(data.seasons);
      expect(id).toBe("spring");
    });
    afterAll(() => {
      jest.useRealTimers();
    });
  });
  describe("on december", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2021, 11, 30));
    });
    it("returns winter season", () => {
      const [id] = current(data.seasons);
      expect(id).toBe("winter");
    });
    afterAll(() => {
      jest.useRealTimers();
    });
  });
});
