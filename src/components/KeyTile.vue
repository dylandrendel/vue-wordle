<script setup lang="ts">
import type { Tile } from "@/views/WordleView.vue";
import { computed } from "vue";

const props = defineProps<{
  tile: Tile;
}>();

const isGreen = computed(() => props.tile.color === "green");
const isYellow = computed(() => props.tile.color === "yellow");
const isGray = computed(() => props.tile.color === "gray");
</script>

<template>
  <div class="tile" :class="{ green: isGreen, yellow: isYellow, gray: isGray }">
    {{ tile.letter }}
  </div>
</template>

<style scoped lang="scss">
.tile {
  margin: 2px;
  cursor: pointer;
  &:hover {
    background-color: #8e8e8e;
  }
  -webkit-tap-highlight-color: #8e8e8e;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  padding: 10px;
  height: 50px;
  min-width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  background-color: rgb(142, 142, 142);
  &.green {
    border-color: green;
    background-color: rgb(28 155 28);
  }
  &.yellow {
    background-color: rgb(217 169 37);
  }
  &.gray {
    border-color: rgb(81, 81, 81);
    background-color: rgb(73, 73, 73);
  }
}
</style>
