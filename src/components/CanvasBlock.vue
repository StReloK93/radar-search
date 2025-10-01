<template>
   <div
      class="flex w-72 h-72 overflow-hidden rounded-md"
      ref="canvasParent"
   />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import { initGame, destroyGame } from "../game";
import { StartGame } from "../game/components/StartGame";

const canvasParent: Ref<HTMLElement | null> = ref(null);

let game: StartGame | null = null;

onMounted(async () => {
   if (canvasParent.value) {
      game = await initGame(canvasParent.value);
   }
});

onBeforeUnmount(() => {
   if (game) {
      destroyGame(game); // pixi applicationni tozalash
      game = null;
   }
});
</script>
