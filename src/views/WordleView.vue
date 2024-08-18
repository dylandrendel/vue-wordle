<script setup lang="ts">
import GuessRow from "@/components/GuessRow.vue";
import { words } from "@/data/words";
import { allowed } from "@/data/allowed";
import { ref, onMounted } from "vue";
export type Color = "green" | "yellow" | "gray" | "none";

export interface Tile {
  color: Color;
  letter: string;
}

let solution = words[Math.floor(Math.random() * words.length - 1)];
let currentGuessWordIndex = 0;
const guesses = ref(Array<string>(6).fill(""));
const solved = ref(false);
const failed = ref(false);
const tiles = ref(
  Array.from({ length: 6 }, () =>
    Array<Tile>(5).fill({ color: "none", letter: "" })
  )
);

function mapFalseYellowToGray(
  tile: Tile,
  index: number,
  currGuess: string,
  tiles: Tile[]
): Tile {
  if (tile.color === "yellow") {
    const letter = currGuess.charAt(index);
    const solnCount = solution.split(letter).length - 1;
    const greenCount = tiles.filter(
      (t) => t.color === "green" && t.letter === letter
    ).length;
    const yellowCount = tiles.filter(
      (t) => t.color === "yellow" && t.letter === letter
    ).length;
    return {
      color: yellowCount > solnCount - greenCount ? "gray" : "yellow",
      letter: tile.letter,
    };
  } else {
    return tile;
  }
}

function getColoredTile(letter: string, index: number): Tile {
  let tile: Tile = { color: "gray", letter };
  if (letter === solution.charAt(index)) {
    tile.color = "green";
  } else if (solution.includes(letter)) {
    tile.color = "yellow";
  }
  return tile;
}

function getFixedTiles(tiles: Tile[], currGuess: string): Tile[] {
  return tiles.reduce(
    (accTiles, currTile, index) => [
      ...accTiles.slice(0, index),
      mapFalseYellowToGray(currTile, index, currGuess, accTiles),
      ...accTiles.slice(index + 1),
    ],
    tiles
  );
}

function handleKeyDown(event: KeyboardEvent) {
  if (solved.value || failed.value) {
    return;
  }

  let currGuess = guesses.value[currentGuessWordIndex];
  let newWord = "";

  if (event.key === "Backspace" && currGuess.length > 0) {
    newWord = currGuess.substring(0, currGuess.length - 1);
    guesses.value[currentGuessWordIndex] = newWord;
    return;
  }

  if (event.key === "Enter" && currGuess.length === 5) {
    if (!allowed.has(currGuess)) {
      alert("Not a valid word");
      return;
    }
    tiles.value[currentGuessWordIndex] = getFixedTiles(
      [...currGuess].map((l, i) => getColoredTile(l, i)),
      currGuess
    );
    solved.value = currGuess === solution;
    if (!solved.value) {
      if (currentGuessWordIndex === 5) {
        failed.value = true;
      } else {
        currentGuessWordIndex++;
      }
    }
    return;
  }

  if (/^[a-z]$/.test(event.key) && currGuess.length <= 4) {
    newWord = currGuess + event.key;
    guesses.value[currentGuessWordIndex] = newWord;
  }
}

function reset() {
  solution = words[Math.floor(Math.random() * words.length - 1)];
  guesses.value = Array<string>(6).fill("");
  solved.value = false;
  failed.value = false;
  currentGuessWordIndex = 0;
  tiles.value = Array.from({ length: 6 }, () =>
    Array<Tile>(5).fill({ color: "none", letter: "" })
  );
}

onMounted(() => {
  window.addEventListener("keydown", (event) => handleKeyDown(event));
});
</script>

<template>
  <div class="row">
    <div class="container">
      <GuessRow
        v-for="(guess, i) in guesses"
        :guess="guess"
        :tiles="tiles[i]"
        :key="i"
      ></GuessRow>
      <div v-if="solved">Nice wordling!</div>
      <div v-if="failed">The solution was {{ solution }}</div>
      <div v-if="failed">Better luck next time!</div>
      <button v-if="solved || failed" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-top: 20px;
  }
}
</style>
