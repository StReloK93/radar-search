import { defineStore } from "pinia";
import { ref } from "vue";
import type { IAuthUser, IUser } from "../Interfaces";
import type { Ref } from "vue";

export const useUserInformation = defineStore("useUserInformation", () => {
   const user: Ref<IAuthUser | null | undefined> = ref(null);
   const loading: Ref<boolean> = ref(false);
   const location: Ref<{ lat: number; lon: number } | null> = ref(null);

   const searchedUser: Ref<IUser[]> = ref([])
   return { user, location, loading, searchedUser };
});
