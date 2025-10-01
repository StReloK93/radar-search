import { Text, Ticker } from "pixi.js";
import type { IPoint } from "../../Interfaces";
export function FPSIndicator() {
   const fpsText = new Text({
      text: "FPS: 0",
      style: {
         fill: 0x00ff00,
         fontSize: 16,
      },
   });
   fpsText.x = 10;
   fpsText.y = 10;

   // Har frame yangilab turish
   Ticker.shared.add(() => {
      fpsText.text = `FPS: ${Ticker.shared.FPS.toFixed(1)}`;
   });

   return fpsText;
}

export function projectToRadar(point: { lat: number; lon: number }, center: { lat: number; lon: number }) {
   const R = 6371000; // Yer radiusi (m)

   const lat1 = (center.lat * Math.PI) / 180;
   const lon1 = (center.lon * Math.PI) / 180;
   const lat2 = (point.lat * Math.PI) / 180;
   const lon2 = (point.lon * Math.PI) / 180;

   const dLat = lat2 - lat1;
   const dLon = lon2 - lon1;

   const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   const dist = R * c; // metr

   const y = Math.sin(dLon) * Math.cos(lat2);
   const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
   const bearing = Math.atan2(y, x);

   return {
      x: dist * Math.sin(bearing),
      y: -dist * Math.cos(bearing),
      dist,
   };
}

export function generateRandomPoints(center: IPoint, radiusKm: number, count: number): IPoint[] {
   const earthRadius = 6371; // Yer radiusi (km)
   const points: IPoint[] = [];

   for (let i = 0; i < count; i++) {
      // 0 - 1 oralig‘ida random radius (kvadrat ildiz olamiz — nuqtalar teng taqsimlansin)
      const r = radiusKm * Math.sqrt(Math.random());
      // 0 - 2π oralig‘ida burchak
      const theta = Math.random() * 2 * Math.PI;

      // Lat/Lon hisoblash
      const dLat = (r / earthRadius) * (180 / Math.PI);
      const dLon = ((r / earthRadius) * (180 / Math.PI)) / Math.cos((center.lat * Math.PI) / 180);

      const newLat = center.lat + dLat * Math.sin(theta);
      const newLon = center.lon + dLon * Math.cos(theta);

      points.push({ lat: newLat, lon: newLon });
   }

   return points;
}

export function randomHexColor(): string {
   const hex = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
   return `#${hex}`;
}
