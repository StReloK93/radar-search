<template>
   <div
      class="flex w-full max-w-96 aspect-square overflow-hidden rounded-md"
      ref="canvasParent"
   />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import { StartGame } from "../game/StartGame";
import { generateRandomPoints } from "../game/helpers";
const canvasParent: Ref<HTMLElement | null> = ref(null);

let game: StartGame | null = null;

onMounted(async () => {
   const points = generateRandomPoints({ lat: 41.3111, lon: 69.2797 }, 5, 50);

   if (canvasParent.value) game = new StartGame(canvasParent.value, points);
   if (game) {
      game.beforeInit = () => {
         game?.pointsByCoordinate({ lat: 41.3111, lon: 69.2797 }, 5 * 1000, points);
      };
   }
});

onBeforeUnmount(() => {
   if (game) game.destroyGame();
});
</script>
