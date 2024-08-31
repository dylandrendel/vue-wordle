import { expect, test } from "vitest";
import { createTiles, Tile } from "@/views/WordleView.vue";

test("l - 1 yellow, 2 gray", () => {
  const solution = "nasal";
  const currGuess = "lolly";
  const tiles: Tile[] = createTiles(solution, currGuess);
  const expected: Tile[] = [
    { letter: "l", color: "yellow" },
    { letter: "o", color: "gray" },
    { letter: "l", color: "gray" },
    { letter: "l", color: "gray" },
    { letter: "y", color: "gray" },
  ];
  expect(tiles).toStrictEqual(expected);
});

test("s - 1 yellow, 1 gray, 1 green", () => {
  const solution = "glass";
  const currGuess = "sassy";
  const tiles: Tile[] = createTiles(solution, currGuess);
  const expected: Tile[] = [
    { letter: "s", color: "yellow" },
    { letter: "a", color: "yellow" },
    { letter: "s", color: "gray" },
    { letter: "s", color: "green" },
    { letter: "y", color: "gray" },
  ];
  expect(tiles).toStrictEqual(expected);
});

test("d - 2 green, 1 gray", () => {
  const solution = "dandy";
  const currGuess = "daddy";
  const tiles: Tile[] = createTiles(solution, currGuess);
  const expected: Tile[] = [
    { letter: "d", color: "green" },
    { letter: "a", color: "green" },
    { letter: "d", color: "gray" },
    { letter: "d", color: "green" },
    { letter: "y", color: "green" },
  ];
  expect(tiles).toStrictEqual(expected);
});
