<template>
   <section class="h-dvh bg-black text-gray-300 p-2">
      <StarterPage />
      <!-- <StarterPage v-if="UserStore.user == null || UserStore.location == null" /> -->
      <!-- <GameWindow v-else /> -->
   </section>
</template>
<script setup lang="ts">
import { isTMA, retrieveLaunchParams } from "@tma.js/bridge";

import { useUserInformation } from "./store/User";
// import GameWindow from "./components/CanvasBlock.vue";
import StarterPage from "./components/StarterPage.vue";

const UserStore = useUserInformation();

if (isTMA()) {
   const { tgWebAppData } = retrieveLaunchParams();
   UserStore.user = tgWebAppData?.user;
}
</script>
