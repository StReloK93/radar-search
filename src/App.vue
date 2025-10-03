<template>
   <section class="h-dvh p-1 bg-zinc-950">
      <GameWindow />
   </section>
</template>
<script setup lang="ts">
import GameWindow from "./components/CanvasBlock.vue";
import { requestUserLocation } from "./game/helpers";

requestUserLocation((err, location) => {
   if (err) {
      console.warn("Joylashuvni olishda xato:", err);
   } else {
      console.log("Joylashuv:", location);
   }
});
</script>
