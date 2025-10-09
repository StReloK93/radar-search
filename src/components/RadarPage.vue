<template>
   <main class="flex flex-col h-full w-full max-w-[440px]">
      <header class="mb-2 flex">
         <div class="flex items-center gap-2 bg-zinc-900 px-1 py-0.5 rounded-2xl border border-zinc-800">
            <img
               :src="UserStore.user?.photo_url"
               class="w-7 aspect-square rounded-full grayscale"
            >
            <span class="mr-0.5">{{ UserStore.user?.first_name }}</span>
         </div>
      </header>
      <div
         class="flex w-full aspect-square overflow-hidden border border-zinc-950 rounded-2xl shadow-inner"
         ref="canvasParent"
      />
      <div class="flex gap-2 mt-2 justify-between">
         <button
            v-for="rad in aviableRadiuses"
            :key="rad"
            :class="{ 'bg-zinc-800': radius == rad }"
            @click="getData(rad)"
            class="flex-grow border rounded-md border-zinc-800 text-[11px] py-1"
         >
            {{ rad }}km
         </button>
      </div>
      <section class="flex-grow relative -mx-2">
         <main class="absolute inset-0 overflow-hidden overflow-y-auto scrollbar">
            <div
               v-for="user in userDistance"
               :key="user.user_id"
               class="p-2 flex gap-2 items-center"
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
                        {{ Math.round(user.dist! / 10) / 100 }} Km</span>
                  </h3>
                  <div class="text-zinc-500">
                     {{ user.username }}
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
import UserRepository from "../repositories/UserRepository";
import type { IUser } from "../Interfaces";
import { useUserInformation } from "../store/User";
const canvasParent: Ref<HTMLElement | null> = ref(null);
const UserStore = useUserInformation();

let game: StartGame | null = null;
const userDistance: Ref<IUser[]> = ref([]);

const aviableRadiuses = [1, 3, 5, 10, 25, 50, 100];

const radius: Ref<number> = ref(10);
async function getData(currentRadius: number) {
   radius.value = currentRadius;

   if (game && UserStore.location && UserStore.user) {
      const users = await UserRepository.getUsersNearby({
         user_id: UserStore.user.user_id,
         radius: currentRadius,
         ...UserStore.location
      });
      game.clearCircles();
      game.pointsByCoordinate(UserStore.location, radius.value * 1000, users);
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
