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
  height: 60px;
  width: 62px;
  color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  background-color: rgb(0, 0, 0);
  border-color: gray;
  &.green {
    border-color: green;
    background-color: rgb(28 155 28);
  }
  &.yellow {
    background-color: rgb(217 169 37);
  }
  &.gray {
    border-color: gray;
    background-color: rgb(73, 73, 73);
  }
}
</style>
