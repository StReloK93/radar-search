<template>
   <section class="h-dvh bg-black text-gray-300 p-2">
      <StarterPage
         @on-get-location="getLocation"
         v-if="UserStore.user == null || UserStore.location == null"
      />
      <RadarPage v-else />
   </section>
</template>
<script setup lang="ts">
import { requestUserLocation } from "./game/helpers";
import UserRepository from "./repositories/UserRepository";
import { isTMA, retrieveLaunchParams } from "@tma.js/bridge";
import { useUserInformation } from "./store/User";
import RadarPage from "./components/RadarPage.vue";
import StarterPage from "./components/StarterPage.vue";
import { onMounted } from "vue";

const UserStore = useUserInformation();

onMounted(async () => {
   if (isTMA()) {
      const { tgWebAppData } = retrieveLaunchParams();
      if (tgWebAppData && tgWebAppData.user) {
         UserStore.user = {
            first_name: tgWebAppData.user.first_name,
            user_id: tgWebAppData.user.id,
            last_name: tgWebAppData.user.last_name!,
            photo_url: tgWebAppData.user.photo_url!,
            username: tgWebAppData.user.username!,
         };
      }
   } else {
      UserStore.loading = true;
      setTimeout(() => {
         UserStore.user = {
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

function getLocation() {
   requestUserLocation(async (err, location) => {
      if (err) console.warn("Joylashuvni olishda xato:", err);
      else {
         if (UserStore.user && location) {
            UserStore.location = location
            UserRepository.updateCurrentUser(UserStore.user, UserStore.location);
         }
      }
   });
}
</script>
