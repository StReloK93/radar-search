<template>
   <main class="flex flex-col h-full w-full max-w-[440px] border border-zinc-600">
      <div
         class="flex w-full aspect-square overflow-hidden border-b border-zinc-700 shadow-inner"
         ref="canvasParent"
      />
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
                     <a :href="`https://t.me/username='${user.username}'`">{{ user.username }}</a>
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
import { generateRandomPoints } from "../game/helpers";
import type { IUser, IUserDist } from "../Interfaces";
const canvasParent: Ref<HTMLElement | null> = ref(null);

let game: StartGame | null = null;
const userDistance: Ref<IUserDist[]> = ref([]);
function getData() {
   const users = [
      { user_id: 1, first_name: "Aziz Soliyev", last_name: "", username: "ruzzifer", photo: "/public/batman.jpg" },
      { user_id: 2, first_name: "Nodira Karimova", last_name: "", username: "nodira.k", photo: "/public/batman.jpg" },
      {
         user_id: 3,
         first_name: "Jahongir Rustamov",
         last_name: "",
         username: "jahongir.r",
         photo: "/public/batman.jpg",
      },
      { user_id: 4, first_name: "Lola Isroilova", last_name: "", username: "lola.i", photo: "/public/batman.jpg" },
   ];

   const points = generateRandomPoints({ lat: 41.3111, lon: 69.2797 }, 10, 10);
   const newData: IUser[] = users.map((user, index) => {
      return {
         ...user,
         ...points[index]!,
      };
   });

   if (game) {
      game.clearCircles();
      game?.pointsByCoordinate({ lat: 41.3111, lon: 69.2797 }, 10 * 1000, newData);
   }
}

onMounted(async () => {
   if (canvasParent.value) game = new StartGame(canvasParent.value);

   if (game) {
      game.onBeforeInit = () => {
         getData();
      };

      game.onUpdateUsers = (users) => {
         userDistance.value = users;
      };
   }
});

onBeforeUnmount(() => {
   if (game) game.destroyGame();
});
</script>
