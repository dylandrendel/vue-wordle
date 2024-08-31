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
  tiles: Tile[]
): Tile {
  const letter = currGuess.charAt(index);
  if (letter === solution.charAt(index)) {
    return { color: "green", letter };
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
    return {
      color: yellowTilesSoFar < solnCount - greenCount ? "yellow" : "gray",
      letter,
    };
  } else {
    return { color: "gray", letter };
  }
}

export function createTiles(solution: string, currGuess: string): Tile[] {
  const tiles: Tile[] = [];
  for (let i = 0; i < currGuess.length; i++) {
    tiles[i] = createTile(solution, i, currGuess, tiles);
  }
  return tiles;
}
</script>

<script setup lang="ts">
import GuessRow from "@/components/GuessRow.vue";
import { words } from "@/data/words";
import { allowed } from "@/data/allowed";
import { ref, onMounted } from "vue";

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
    tiles.value[currentGuessWordIndex] = createTiles(solution, currGuess);
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
