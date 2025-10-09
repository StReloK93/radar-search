<template>
   <section class="h-full bg-zinc-900 rounded-md flex items-center">
      <main class="w-full p-2 -mt-16">
         <div
            class="w-16 h-16 shadow-2xl shadow-black rounded-full border-2 mx-auto flex justify-center items-center mb-4"
         >
            <aside class="w-8 h-8 rounded-full bg-white shadow-2xl shadow-black" />
         </div>
         <h3 class="text-6xl text-center font-[math] text-shadow-lg/30 mb-2">
            GeoRadar
         </h3>
         <div class="text-center my-4">
            <button
               v-if="UserStore.user && UserStore.location == null"
               :disabled="UserStore.user == null"
               @click="emit('onGetLocation')"
               class="bg-zinc-700 px-3 py-1 rounded-md shadow-2xl disabled:bg-zinc-950 disabled:text-zinc-700"
            >
               GPS Malumotlarini olish
            </button>
            <span v-else> Yuklanmoqda... </span>
         </div>
      </main>
   </section>
</template>

<script setup lang="ts">
import { useUserInformation } from "../store/User";
const emit = defineEmits(["onGetLocation"]);
const UserStore = useUserInformation();
</script>
