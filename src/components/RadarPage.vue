<template>
   <main class="flex flex-col h-full w-full max-w-[440px] border border-zinc-800">
      <div
         class="flex w-full aspect-square overflow-hidden border-b border-zinc-800 shadow-inner"
         ref="canvasParent"
      />
      <div class="flex border-b border-zinc-800">
         <button
            v-for="rad in aviableRadiuses"
            :key="rad"
            :class="{'bg-zinc-800': radius == rad}"
            @click="getData(rad)"
            class="px-2 flex-grow border-x border-zinc-800 text-xs py-1"
         >
            {{ rad }} km
         </button>
      </div>
      <section class="flex-grow relative">
         <main class="absolute inset-0 overflow-hidden overflow-y-auto scrollbar">
            <div
               v-for="user in userDistance"
               :key="user.user_id"
               class="p-2 flex gap-3 items-center"
            >
               <aside>
                  <img
                     :src="user.photo"
                     class="w-8 aspect-square rounded-full grayscale"
                  >
               </aside>
               <aside class="leading-none flex-grow">
                  <h3 class="text-zinc-300 flex justify-between w-full">
                     <span>
                        {{ user.first_name }}
                     </span>
                     <span class="text-sm leading-none text-zinc-600 font-bold">
                        {{ Math.round(user.dist / 10) / 100 }} Km</span>
                  </h3>
                  <div class="text-zinc-500">
                     <a :href="`tg://user?id=${user.username}`">{{ user.username }}</a>
                  </div>
               </aside>
            </div>
         </main>
      </section>
   </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import { StartGame } from "../game/StartGame";
import type { IUserDist } from "../Interfaces";
import { useUserInformation } from "../store/User";
const canvasParent: Ref<HTMLElement | null> = ref(null);
const UserStore = useUserInformation();

let game: StartGame | null = null;
const userDistance: Ref<IUserDist[]> = ref([]);

const aviableRadiuses = [1, 5,10,25,50,100,200]

const radius: Ref<number> = ref(10);
async function getData(currentRadius: number) {
   radius.value = currentRadius
   const res = await fetch("https://radarbackend-production.up.railway.app/get-user/nearby", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         user_id: UserStore.user?.user_id,
         lat: UserStore.user?.lat,
         lon: UserStore.user?.lon,
         radius: currentRadius,
      }),
   });
   if (!res.ok) throw new Error(`HTTP error ${res.status}`);
   const data = await res.json();

   if (game && UserStore.user?.lat && UserStore.user?.lon) {
      game.clearCircles();
      game?.pointsByCoordinate({ lat: UserStore.user.lat, lon: UserStore.user.lon }, radius.value * 1000, data);
   }
}

onMounted(async () => {
   if (canvasParent.value) game = new StartGame(canvasParent.value);

   if (game) {
      game.onBeforeInit = () => getData(radius.value);

      game.onUpdateUsers = (users) => {
         userDistance.value = users;
      };
   }
});

onBeforeUnmount(() => {
   if (game) game.destroyGame();
});
</script>
