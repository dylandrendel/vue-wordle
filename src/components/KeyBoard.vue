<script setup lang="ts">
import { type Tile } from "@/views/WordleView.vue";
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
        @click="$emit('key-clicked', tile.letter)"
      />
    </div>
    <div class="row">
      <KeyTile
        v-for="tile in middleTiles"
        :key="tile.letter"
        :tile="tile"
        @click="$emit('key-clicked', tile.letter)"
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
        @click="$emit('key-clicked', tile.letter)"
      />
      <button
        class="backspace-button"
        @click="$emit('key-clicked', 'Backspace')"
      >
        &larr;
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  &:hover {
    background-color: #e0e0e0;
  }
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  cursor: pointer;
  margin: 2px;
}
.row {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
