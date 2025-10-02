<template>
   <main>
      <div
         class="flex w-full max-w-96 aspect-square overflow-hidden border border-zinc-700 shadow-inner"
         ref="canvasParent"
      />
      <section>
         <div
            v-for="user in users"
            :key="user.id"
         >
            <img
               :src="user.avatar"
               class="w-10 aspect-square rounded-full"
            >
         </div>
      </section>
   </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";
import { StartGame } from "../game/StartGame";
import { generateRandomPoints } from "../game/helpers";
const canvasParent: Ref<HTMLElement | null> = ref(null);

let game: StartGame | null = null;

const users = [
   { id: 1, name: "Aziz Soliyev", username: "aziz.s", avatar: "https://i.pravatar.cc/150?img=1" },
   { id: 2, name: "Nodira Karimova", username: "nodira.k", avatar: "https://i.pravatar.cc/150?img=2" },
   { id: 3, name: "Jahongir Rustamov", username: "jahongir.r", avatar: "https://i.pravatar.cc/150?img=3" },
   { id: 4, name: "Lola Isroilova", username: "lola.i", avatar: "https://i.pravatar.cc/150?img=4" },
   { id: 5, name: "Bekzod Xusanov", username: "bekzod.x", avatar: "https://i.pravatar.cc/150?img=5" },
   { id: 6, name: "Malika Sharipova", username: "malika.s", avatar: "https://i.pravatar.cc/150?img=6" },
   { id: 7, name: "Oybek Tursunov", username: "oybek.t", avatar: "https://i.pravatar.cc/150?img=7" },
   { id: 8, name: "Gulnora Nazarova", username: "gulnora.n", avatar: "https://i.pravatar.cc/150?img=8" },
   { id: 9, name: "Sardor Qodirov", username: "sardor.q", avatar: "https://i.pravatar.cc/150?img=9" },
   { id: 10, name: "Dilorom Egamberdiyeva", username: "dilorom.e", avatar: "https://i.pravatar.cc/150?img=10" },
   { id: 11, name: "Rustam Yuldoshev", username: "rustam.y", avatar: "https://i.pravatar.cc/150?img=11" },
   { id: 12, name: "Sevara Mamatova", username: "sevara.m", avatar: "https://i.pravatar.cc/150?img=12" },
   { id: 13, name: "Aziza Mirzaeva", username: "aziza.m", avatar: "https://i.pravatar.cc/150?img=13" },
   { id: 14, name: "Timur Akhmedov", username: "timur.a", avatar: "https://i.pravatar.cc/150?img=14" },
   { id: 15, name: "Nilufar Abdullaeva", username: "nilufar.a", avatar: "https://i.pravatar.cc/150?img=15" },
   { id: 16, name: "Eldor Sattorov", username: "eldor.s", avatar: "https://i.pravatar.cc/150?img=16" },
   { id: 17, name: "Mehribon Yusupova", username: "mehribon.y", avatar: "https://i.pravatar.cc/150?img=17" },
   { id: 18, name: "Bakhtiyor Qodirov", username: "bakhtiyor.q", avatar: "https://i.pravatar.cc/150?img=18" },
   { id: 19, name: "Shahnoza Rasulova", username: "shahnoza.r", avatar: "https://i.pravatar.cc/150?img=19" },
   { id: 20, name: "Ibragimov Sardor", username: "ibragim.s", avatar: "https://i.pravatar.cc/150?img=20" },
   { id: 21, name: "Madina Usmonova", username: "madina.u", avatar: "https://i.pravatar.cc/150?img=21" },
   { id: 22, name: "Kamron Olmosov", username: "kamron.o", avatar: "https://i.pravatar.cc/150?img=22" },
   { id: 23, name: "Dina Raxmatova", username: "dina.r", avatar: "https://i.pravatar.cc/150?img=23" },
   { id: 24, name: "Javlon Murodov", username: "javlon.m", avatar: "https://i.pravatar.cc/150?img=24" },
   { id: 25, name: "Nigora Tillaeva", username: "nigora.t", avatar: "https://i.pravatar.cc/150?img=25" },
   { id: 26, name: "Otabek Nurmatov", username: "otabek.n", avatar: "https://i.pravatar.cc/150?img=26" },
   { id: 27, name: "Saodat Yuldasheva", username: "saodat.y", avatar: "https://i.pravatar.cc/150?img=27" },
   { id: 28, name: "Umid Akbarov", username: "umid.a", avatar: "https://i.pravatar.cc/150?img=28" },
   { id: 29, name: "Zarina Mirakhmedova", username: "zarina.m", avatar: "https://i.pravatar.cc/150?img=29" },
   { id: 30, name: "Azamat Tadjiev", username: "azamat.t", avatar: "https://i.pravatar.cc/150?img=30" },
];

function getData() {
   const points = generateRandomPoints({ lat: 41.3111, lon: 69.2797 }, 5, 50);
   console.log(points);

   if (game) {
      game.clearCircles();
      game?.pointsByCoordinate({ lat: 41.3111, lon: 69.2797 }, 5 * 1000, points);
   }
}

onMounted(async () => {
   if (canvasParent.value) game = new StartGame(canvasParent.value);

   if (game) {
      game.beforeInit = () => {
         getData();
      };
   }
});

onBeforeUnmount(() => {
   if (game) game.destroyGame();
});
</script>
