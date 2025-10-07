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
         <!-- <p class="p-4 leading-4 text-sm text-justify text-zinc-400 border-y border-zinc-600 mx-4">
            Dastur faqat geolokatsiya yoniq holatda ishlaydi. Iltimos GeoRadar dasturiga kirishdan oldin geolokatsiya
            yoqib kiring.
         </p> -->
         <div class="text-center my-4">
            <button
               v-if="UserStore.user && UserStore.user.lat == null && UserStore.user.lon == null"
               :disabled="UserStore.user == null"
               @click="getLocation"
               class="bg-zinc-700 px-3 py-1 rounded-md shadow-2xl disabled:bg-zinc-950 disabled:text-zinc-700"
            >
               GPS Malumotlarini olish
            </button>
            <button
               v-else-if="UserStore.user && UserStore.user.lat && UserStore.user.lon"
               :disabled="UserStore.user == null"
               @click="emit('search', UserStore.user)"
               class="bg-zinc-700 px-3 py-1 rounded-md shadow-2xl disabled:bg-zinc-950 disabled:text-zinc-700"
            >
               Qidirish
            </button>
            <span v-else>
               Yuklanmoqda...
            </span>
         </div>
      </main>
   </section>
</template>

<script setup lang="ts">
import { useUserInformation } from "../store/User";
import { requestUserLocation } from "../game/helpers";
import type { IAuthUser } from "../Interfaces";

const emit = defineEmits(["search"]);
const UserStore = useUserInformation();
function getLocation() {
   requestUserLocation(async (err, location) => {
      if (err) console.warn("Joylashuvni olishda xato:", err);
      else {
         if (UserStore.user) {
            UserStore.user.lat = location?.lat || null;
            UserStore.user.lon = location?.lon || null;

            updateCurrentUser(UserStore.user);
         }
      }
   });
}

async function updateCurrentUser(user: IAuthUser) {
   fetch("https://radarbackend-production.up.railway.app/create-user", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   });
}
</script>
