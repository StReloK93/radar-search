<template>
   <section class="h-full bg-zinc-900 rounded-md">
      <main class="h-full w-full p-2 pt-10">
         <div class="w-16 h-16 shadow-2xl shadow-black rounded-full border-2 mx-auto flex justify-center items-center mb-7">
            <aside class="w-8 h-8 rounded-full bg-white shadow-2xl shadow-black " />
         </div>
         <h3 class="text-6xl text-center font-[math] text-shadow-lg/30 mb-4">
            GeoRadar
         </h3>
         <p class="px-2 leading-4 text-sm text-justify text-zinc-400 border-y py-2 mx-5">
            Dastur faqat geolokatsiya yoniq holatda ishlaydi. Iltimos GeoRadar dasturiga kirishdan oldin geolokatsiya yoqib kiring.
         </p>
         <button @click="getLocation">
            Locatsiya
         </button>
         <p class="text-xs">
            {{ UserStore.location }}
         </p>
      </main>
   </section>
</template>

<script setup lang="ts">
import { useUserInformation } from '../store/User';
import { requestUserLocation } from "../game/helpers";
function getLocation(){
   requestUserLocation((err, location) => {
      if (err) {
         console.warn("Joylashuvni olishda xato:", err);
      } else UserStore.location = location;
      console.log(location);
      
   });
}

const UserStore = useUserInformation();
</script>
