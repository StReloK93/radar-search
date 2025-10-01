// MapApp.ts
import type { IPoint } from "../Interfaces";
import { Application, Container, Graphics } from "pixi.js";
import { projectToRadar, FPSIndicator, randomHexColor } from "./helpers";
import { RadarCircles } from "./components/RadarCircles";
import { radarGrid } from "./components/RadarGrid";

export class StartGame {
   app: Application;
   mapContainer: Container;
   maxCenter: number;
   points: IPoint[]
   beforeInit: (() => void) | null
   constructor(parentNode: HTMLElement, points: IPoint[]) {
      this.beforeInit = null
      this.app = new Application();
      this.mapContainer = new Container();
      this.maxCenter = 0;
      this.points = points
      this.init(parentNode);
   }

   async init(parentNode: HTMLElement) {
      // globalThis.__PIXI_APP__ = this.app;
      await this.app.init({ resizeTo: parentNode, background: "#010027" });
      this.app.stage.addChild(this.mapContainer);
      parentNode.appendChild(this.app.canvas as HTMLCanvasElement);
      this.maxCenter = this.app.canvas.width / 2;

      this.userPoint();
      this.radarCircles();

      const backgroundGrid = radarGrid(this.app.canvas.width, this.app.canvas.height, 24);
      this.mapContainer.addChild(backgroundGrid);
      this.mapContainer.addChild(FPSIndicator());

      if(this.beforeInit) this.beforeInit()

   }



   userPoint() {
      const minCircle = new Graphics().circle(this.maxCenter, this.maxCenter, 20).fill({ color: "#0088ff" });
      this.mapContainer.addChild(minCircle);
   }

   radarCircles() {
      const radarCircles = new RadarCircles({
         minRadius: 20,
         maxRadius: this.maxCenter,
         container: this.mapContainer,
      });

      this.app.ticker.add(() => radarCircles.startAnimation());
   }

   pointsByCoordinate(center: IPoint, radarRadius: number, points: IPoint[]) {
      const radarCenter = { x: this.maxCenter, y: this.maxCenter };
      const distanceSort = points.map((p) => projectToRadar(p, center));

      distanceSort.sort((a, b) => a.dist - b.dist);

      this.paintDots(distanceSort, radarRadius, radarCenter);
   }

   paintDots(
      distanceSort: {
         x: number;
         y: number;
         dist: number;
      }[],
      radarRadius: number,
      radarCenter: { x: number; y: number },
      indexNum: number = 0
   ) {
      const index = indexNum;
      if (distanceSort.length <= index) return;

      const scale = this.maxCenter / radarRadius;
      const projected = distanceSort[index]!;
      // faqat radarRadius ichidagi nuqtalarni chizamiz
      if (Math.round(projected.dist) <= radarRadius) {
         const x = radarCenter.x + projected.x * scale;
         const y = radarCenter.y + projected.y * scale;

         const dot = this.createBouncyDot(x, y);
         this.mapContainer.addChild(dot);
      }

      setTimeout(() => {
         this.paintDots(distanceSort, radarRadius, radarCenter, index + 1);
      }, 1000 / distanceSort.length);
   }

   createBouncyDot(x: number, y: number) {
      const dot = new Graphics()
         .circle(0, 0, 15)
         .fill({ color: randomHexColor(), alpha: 0.6 })
         .stroke({ width: 1, color: "#84c6ff", alpha: 0.5 });

      dot.x = x;
      dot.y = y;

      // Boshlanish scale = 0
      dot.scale.set(0);

      let progress = 0;
      const speed = 0.05; // animatsiya tezligi
      const overshoot = 1.4; // 20% kattaroq chiqib qaytadi
      // Har bir dot uchun alohida ticker emas, bitta global ticker
      this.app.ticker.add(() => {
         if (progress >= 1) return;

         progress += speed;

         let scale: number;
         if (progress < 0.7) {
            scale = (progress / 0.7) * overshoot;
         } else {
            const t = (progress - 0.7) / 0.3;
            scale = overshoot - (overshoot - 1) * t;
         }

         dot.scale.set(scale);
      });

      return dot;
   }

   destroyGame() {
      this.app.destroy(true, { children: true });
   }
}
