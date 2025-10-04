import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAuthUser } from "../Interfaces";
import type { Ref } from "vue";

export const useUserInformation = defineStore("useUserInformation", () => {
   const user: Ref<IAuthUser | null | undefined> = ref(null);
   const location: Ref<{lat: number, lon: number} | null> = ref(null);
   return { user, location };
});
