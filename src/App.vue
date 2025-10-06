<template>
   <section class="h-dvh bg-black text-gray-300 p-2">
      <!-- <StarterPage  @search="searchNearbyUsers"  /> -->
      <StarterPage
         @search="searchNearbyUsers"
         v-if="UserStore.user == null || UserStore.user?.lat == null"
      />
      <RadarPage v-else />
   </section>
</template>
<script setup lang="ts">
import { isTMA, retrieveLaunchParams } from "@tma.js/bridge";
import { useUserInformation } from "./store/User";
import RadarPage from "./components/RadarPage.vue";
import StarterPage from "./components/StarterPage.vue";
import { onMounted } from "vue";
import type { IAuthUser } from "./Interfaces";

const UserStore = useUserInformation();

onMounted(async () => {
   if (isTMA()) {
      const { tgWebAppData } = retrieveLaunchParams();
      if (tgWebAppData && tgWebAppData.user) {
         UserStore.user = {
            lat: null,
            lon: null,
            first_name: tgWebAppData.user.first_name,
            user_id: tgWebAppData.user.id,
            last_name: tgWebAppData.user.last_name,
            photo_url: tgWebAppData.user.photo_url,
            username: tgWebAppData.user.username,
         };
      }
   } else {
      UserStore.loading = true;
      setTimeout(() => {
         UserStore.user = {
            lat: null,
            lon: null,
            first_name: "Software",
            user_id: 7550008088,
            last_name: "",
            photo_url:
               "https://t.me/i/userpic/320/mioAxEQFB9mJlLXI1k6ADiRgxqxQnWyfL6xaHzKn5nNQHBwI3Wp6ODKAL4POJ0Oa.svg",
            username: "EddyandCrashTwo",
         };
         UserStore.loading = false;
      }, 2000);
   }
});

function searchNearbyUsers(user: IAuthUser) {
   fetch("http://192.168.14.173:3000/create-user", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   });
}
</script>
