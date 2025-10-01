// MapApp.ts
import { Application, Container, Graphics } from "pixi.js";
import { FPSIndicator } from "../helpers/FPSIndecator";
import { RadarCircles } from "./RadarCircles";
import { grid } from "./Grid";
export class StartGame {
   app: Application;
   mapContainer: Container;
   maxCenter: number;
   constructor() {
      this.maxCenter = 144;
      this.app = new Application();
      this.mapContainer = new Container();
      this.mapContainer.addChild(FPSIndicator());
   }

   async init(parentNode: HTMLElement) {
      await this.app.init({ resizeTo: parentNode, background: "#010027" });
      this.app.stage.addChild(this.mapContainer);
      parentNode.appendChild(this.app.canvas as HTMLCanvasElement);

      const backgroundGrid = grid(this.app.view.width, this.app.view.height, 16);
      const radarCircles = new RadarCircles({
         minRadius: 10,
         maxRadius: this.maxCenter,
         container: this.mapContainer,
      });

      this.mapContainer.addChild(backgroundGrid);
      this.app.ticker.add(() => {
         radarCircles.startAnimation();
      });


      
      // Taxminiy GPS nuqtalar
      const points = [
         { lat: 41.312, lon: 69.2805 },
         { lat: 41.31, lon: 69.278 },
         { lat: 41.3135, lon: 69.2815 },
         { lat: 41.3095, lon: 69.282 },
      ];

      this.pointsByCoordinate(306, points);
   }

   pointsByCoordinate(radarRadius: number, points: {lat: number, lon: number}[]) {
      // GPS markaz nuqta
      const center = { lat: 41.3111, lon: 69.2797 };

      // Radar radius (metrda)
      const maxRadarPixel = this.maxCenter; // chizish uchun maksimal piksel radius


      // ✅ GPS ni radar koordinataga proyeksiya qilish
      function projectToRadar(point: { lat: number; lon: number }, center: { lat: number; lon: number }) {
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

      const radarCenter = { x: this.maxCenter, y: this.maxCenter };
      const dotRadius = 5;
      points.forEach((p) => {
         const projected = projectToRadar(p, center);
         
         // ✅ masofani radarRadius ga nisbatan normallashtirish
          const scale = (maxRadarPixel + 12) / radarRadius;

         // faqat radarRadius ichidagi nuqtalarni chizamiz
         if (Math.round(projected.dist) <= radarRadius) {
            const x = radarCenter.x + projected.x * scale;
            const y = radarCenter.y + projected.y * scale;

            const dot = new Graphics().circle(x, y, dotRadius).fill({ color: 0xff0000 });
            this.mapContainer.addChild(dot);
         }
      });
   }
}
