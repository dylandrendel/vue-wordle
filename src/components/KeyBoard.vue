<script setup lang="ts">
import type { Tile } from "@/views/WordleView.vue";
import { computed } from "vue";
import { ref } from "vue";
import { watchEffect } from "vue";
import KeyTile from "./KeyTile.vue";

const props = defineProps<{
  tiles: Tile[];
}>();

const tiles = ref(props.tiles);

const topTiles = computed(() => tiles.value.slice(0, 10));
const middleTiles = computed(() => tiles.value.slice(10, 19));
const bottomTiles = computed(() => tiles.value.slice(19, 26));

watchEffect(() => {
  tiles.value = props.tiles;
});
</script>

<template>
  <div class="keyboard">
    <div class="row">
      <KeyTile
        v-for="tile in topTiles"
        :key="tile.letter"
        :tile="tile"
        @click="$emit('key-clicked', tile.letter.toLowerCase())"
      />
    </div>
    <div class="row">
      <KeyTile
        v-for="tile in middleTiles"
        :key="tile.letter"
        :tile="tile"
        @click="$emit('key-clicked', tile.letter.toLowerCase())"
      />
    </div>
    <div class="row">
      <button class="enter-button" @click="$emit('key-clicked', 'Enter')">
        ENTER
      </button>
      <KeyTile
        v-for="tile in bottomTiles"
        :key="tile.letter"
        :tile="tile"
        @click="$emit('key-clicked', tile.letter.toLowerCase())"
      />
      <button
        class="backspace-button"
        @click="$emit('key-clicked', 'Backspace')"
      >
        <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20">
          <path
            fill="white"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  &:hover {
    background-color: #8e8e8e;
  }
  -webkit-tap-highlight-color: #8e8e8e;
  font-size: 11px;
  color: #ffffff;
  font-weight: 700;
  background-color: rgb(131, 131, 131);
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  cursor: pointer;
  margin: 2px;
}
.backspace-button {
  padding: 0px 18px;
}
.row {
  display: flex;
  justify-content: center;
  margin-bottom: 3px;
}
</style>
