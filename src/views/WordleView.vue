<script lang="ts">
export type Color = "green" | "yellow" | "gray" | "none";

export interface Tile {
  color: Color;
  letter: string;
}

export function createTile(
  solution: string,
  index: number,
  currGuess: string,
  tiles: Tile[],
  keyboardTiles: Ref<Tile[]> | undefined
): Tile {
  const letter = currGuess.charAt(index);
  let tile: Tile = { color: "none", letter };
  if (letter === solution.charAt(index)) {
    tile.color = "green";
  } else if (solution.includes(letter)) {
    const solnCount = solution.split(letter).length - 1;
    const yellowTilesSoFar = tiles.filter(
      (t) => t.color === "yellow" && t.letter === letter
    ).length;
    const greenCount = [...currGuess].reduce(
      (acc, curr, i) =>
        curr === letter && solution.charAt(i) === curr ? acc + 1 : acc,
      0
    );
    tile.color = yellowTilesSoFar < solnCount - greenCount ? "yellow" : "gray";
  } else {
    tile.color = "gray";
  }
  if (keyboardTiles) {
    keyboardTiles.value = keyboardTiles.value.map((t) => {
      if (t.letter.toLowerCase() === letter.toLowerCase()) {
        t.color = tile.color;
      }
      return t;
    });
  }
  return tile;
}

export function createTiles(
  solution: string,
  currGuess: string,
  keyboardTiles?: Ref<Tile[]>
): Tile[] {
  const tiles: Tile[] = [];
  for (let i = 0; i < currGuess.length; i++) {
    tiles.push(createTile(solution, i, currGuess, tiles, keyboardTiles));
  }
  return tiles;
}
</script>

<script setup lang="ts">
import GuessRow from "@/components/GuessRow.vue";
import KeyBoard from "@/components/KeyBoard.vue";
import { words } from "@/data/words";
import { allowed } from "@/data/allowed";
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

let solution = words[Math.floor(Math.random() * words.length - 1)];
let currentGuessWordIndex = 0;

const initialKeys: Tile[] = [
  { letter: "Q", color: "none" },
  { letter: "W", color: "none" },
  { letter: "E", color: "none" },
  { letter: "R", color: "none" },
  { letter: "T", color: "none" },
  { letter: "Y", color: "none" },
  { letter: "U", color: "none" },
  { letter: "I", color: "none" },
  { letter: "O", color: "none" },
  { letter: "P", color: "none" },
  { letter: "A", color: "none" },
  { letter: "S", color: "none" },
  { letter: "D", color: "none" },
  { letter: "F", color: "none" },
  { letter: "G", color: "none" },
  { letter: "H", color: "none" },
  { letter: "J", color: "none" },
  { letter: "K", color: "none" },
  { letter: "L", color: "none" },
  { letter: "Z", color: "none" },
  { letter: "X", color: "none" },
  { letter: "C", color: "none" },
  { letter: "V", color: "none" },
  { letter: "B", color: "none" },
  { letter: "N", color: "none" },
  { letter: "M", color: "none" },
];
const keyboardTiles = ref(initialKeys);
const guesses = ref(Array<string>(6).fill(""));
const solved = ref(false);
const failed = ref(false);
const tiles = ref(
  Array.from({ length: 6 }, () =>
    Array<Tile>(5).fill({ color: "none", letter: "" })
  )
);

function handleKeyDown(key: string) {
  if (solved.value || failed.value) {
    return;
  }

  let currGuess = guesses.value[currentGuessWordIndex];
  let newWord = "";

  if (key === "Backspace" && currGuess.length > 0) {
    newWord = currGuess.substring(0, currGuess.length - 1);
    guesses.value[currentGuessWordIndex] = newWord;
    return;
  }

  if (key === "Enter" && currGuess.length === 5) {
    if (!allowed.has(currGuess.toLowerCase())) {
      alert("Not a valid word");
      return;
    }
    tiles.value[currentGuessWordIndex] = createTiles(
      solution,
      currGuess,
      keyboardTiles
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

  if (/^[a-z]$/i.test(key) && currGuess.length <= 4) {
    newWord = currGuess + key;
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
  keyboardTiles.value = keyboardTiles.value.map((t) => ({
    ...t,
    color: "none",
  }));
}

onMounted(() => {
  window.addEventListener("keydown", (event) => handleKeyDown(event.key));
});
</script>

<template>
  <div class="column">
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
    <KeyBoard :tiles="keyboardTiles" @key-clicked="handleKeyDown" />
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    margin-top: 20px;
  }
}
</style>
