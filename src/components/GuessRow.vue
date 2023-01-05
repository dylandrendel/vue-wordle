<script setup lang="ts">
import LetterTile from "./LetterTile.vue";
import { computed } from "vue";
import type { Highlight } from "@/views/WordleView.vue";

const props = defineProps<{
  guess: string;
  highlights: Highlight[];
}>();

const tiles = [0, 1, 2, 3, 4];
const letters = computed(() => [...props.guess.toUpperCase()]);
</script>

<template>
  <div class="guess-row">
    <LetterTile v-for="tile in tiles" :key="tile" :highlight="highlights[tile]">
      {{ letters[tile] }}
    </LetterTile>
  </div>
</template>

<style scoped>
.guess-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
