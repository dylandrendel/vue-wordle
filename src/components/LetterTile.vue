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
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.tile {
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  height: 45px;
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: #000;
  background-color: white;
  &.green {
    border-color: green;
    background-color: rgb(198, 242, 198);
  }
  &.yellow {
    background-color: lightyellow;
  }
  &.gray {
    border-color: gray;
    background-color: lightgray;
  }
}
</style>
