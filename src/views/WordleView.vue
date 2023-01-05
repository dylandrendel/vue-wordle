<script setup lang="ts">
import GuessRow from "@/components/GuessRow.vue";
import { allowed, words } from "@/data/words";
import { ref, onMounted } from "vue";
export type Highlight = "green" | "yellow" | "gray" | "none";

// const apiUrlAllWords = "https://random-word-api.herokuapp.com/all";
// const apiUrlRandomWord = "https://random-word-api.herokuapp.com/word?length=5";
// const loading = ref(false);

let solution = words[Math.floor(Math.random() * words.length - 1)];
let currentGuessWordIndex = 0;
const guesses = ref(Array<string>(6).fill(""));
const solved = ref(false);
const failed = ref(false);
const highlights = ref(
  Array.from({ length: 6 }, () => Array<Highlight>(5).fill("none"))
);

// function setCheckWordList() {
//   loading.value = true;
//   fetch(apiUrlAllWords)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((response: string[]) => {
//       loading.value = false;
//       checkWordList = response.filter((w) => w.length === 5);
//     });
// }

// function setSolution() {
//   fetch(apiUrlRandomWord)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((response: string[]) => {
//       loading.value = false;
//       solution = response[0];
//     });
// }

function getHighlightStatus(letter: string, index: number): Highlight {
  let highlight: Highlight = "gray";
  if (letter === solution.charAt(index)) {
    highlight = "green";
  } else if ([...solution].some((l) => l === letter)) {
    highlight = "yellow";
  }
  return highlight;
}

function handleKeyDown(event: KeyboardEvent) {
  if (solved.value || failed.value) {
    return;
  }

  let currWord = guesses.value[currentGuessWordIndex];
  let newWord = "";

  if (event.key === "Backspace" && currWord.length > 0) {
    newWord = currWord.substring(0, currWord.length - 1);
    guesses.value[currentGuessWordIndex] = newWord;
    return;
  }

  if (event.key === "Enter" && currWord.length === 5) {
    if (!allowed.has(currWord)) {
      alert("Not a valid word");
      return;
    }
    [...currWord].forEach(
      (l, i) =>
        (highlights.value[currentGuessWordIndex][i] = getHighlightStatus(l, i))
    );
    solved.value = currWord === solution;
    !solved.value && currentGuessWordIndex < 5
      ? currentGuessWordIndex++
      : (failed.value = true);
    return;
  }

  if (/^[a-z]$/.test(event.key) && currWord.length <= 4) {
    newWord = currWord + event.key;
    guesses.value[currentGuessWordIndex] = newWord;
  }
}

function reset() {
  solution = words[Math.floor(Math.random() * words.length - 1)];
  guesses.value = Array<string>(6).fill("");
  solved.value = false;
  failed.value = false;
  currentGuessWordIndex = 0;
  highlights.value = Array.from({ length: 6 }, () =>
    Array<Highlight>(5).fill("none")
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
        :highlights="highlights[i]"
        :key="i"
      ></GuessRow>
      <!-- <div v-if="loading">Loading...</div> -->
      <div v-if="solved">Nice wordling!</div>
      <div v-if="failed">Better luck next time!</div>
      <div v-if="failed">The solution was {{ solution }}</div>
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
