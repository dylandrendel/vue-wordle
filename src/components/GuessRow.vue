<script setup lang="ts">
import LetterTile from "./LetterTile.vue";
import { computed } from "vue";
import type { Tile } from "@/views/WordleView.vue";

const props = defineProps<{
  guess: string;
  tiles: Tile[];
}>();

const letters = computed(() => [...props.guess.toUpperCase()]);
</script>

<template>
  <div class="guess-row">
    <LetterTile v-for="(tile, index) in props.tiles" :key="index" :tile="tile">
      {{ letters[index] }}
    </LetterTile>
  </div>
</template>

<style scoped>
.guess-row {
  display: flex;
  flex-direction: row;
  gap: 3px;
}
</style>
