import type { IAuthUser, ICoordinate } from "../Interfaces";

async function getUsersNearby({
   user_id,
   lat,
   lon,
   radius,
}: {
   user_id: number;
   lat: number;
   lon: number;
   radius: number;
}) {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/get-user/nearby`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         user_id: user_id,
         lat: lat,
         lon: lon,
         radius: radius,
      }),
   });
   if (!res.ok) throw new Error(`HTTP error ${res.status}`);
   return await res.json();
}

async function updateCurrentUser(user: IAuthUser, position: ICoordinate) {
   const res = await fetch(`${import.meta.env.VITE_API_URL}/create-user`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({...user, ...position}),
   });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
   return await res.json();
}

export default { getUsersNearby, updateCurrentUser };
