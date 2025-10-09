// MapApp.ts
// import { RadarCircles } from "./components/RadarCircles";
import type { ICoordinate, IUser } from "../Interfaces";
import { Application, Container, Graphics } from "pixi.js";
import { createBouncyDot, projectToRadar } from "./helpers";
import { radarGrid } from "./components/RadarGrid";

export class StartGame {
   app: Application;
   mapContainer: Container;
   maxCenter: number;
   circles: Container[];
   onBeforeInit: (() => void) | null;
   onUpdateUsers: ((users: IUser[]) => void) | null;

   constructor(parentNode: HTMLElement) {
      this.circles = [];
      this.onBeforeInit = null;
      this.onUpdateUsers = null;
      this.app = new Application();
      this.mapContainer = new Container();
      this.maxCenter = 0;
      this.init(parentNode);
   }
   async init(parentNode: HTMLElement) {
      await this.app.init({
         resizeTo: parentNode,
         resolution: 1,
         antialias: true,
         autoDensity: true,
         background: "#18181b",
      });
      this.app.stage.addChild(this.mapContainer);
      parentNode.appendChild(this.app.canvas as HTMLCanvasElement);
      this.maxCenter = this.app.canvas.width / 2;

      const minCircle = new Graphics().circle(this.maxCenter, this.maxCenter, 5).fill({ color: "#222", alpha: 1 });
      this.mapContainer.addChild(minCircle);
      // this.radarCircles();

      const backgroundGrid = radarGrid(this.app.canvas.width, this.app.canvas.height, 12);
      this.mapContainer.addChild(backgroundGrid);

      if (this.onBeforeInit) this.onBeforeInit();
   }

   pointsByCoordinate(center: ICoordinate, radarRadius: number, users: IUser[]) {
      const radarCenter = { x: this.maxCenter, y: this.maxCenter };
      const distanceSort = users.map((user) => ({ ...projectToRadar(user, center), ...user }));

      distanceSort.sort((a, b) => a.dist! - b.dist!);
      if (this.onUpdateUsers) this.onUpdateUsers(distanceSort);

      this.paintDots(distanceSort, radarRadius, radarCenter);
   }

   async paintDots(
      usersWithDistance: IUser[],
      radarRadius: number,
      radarCenter: { x: number; y: number },
      indexNum: number = 0
   ) {
      const index = indexNum;
      if (usersWithDistance.length <= index) return;

      const scale = this.maxCenter / radarRadius;
      const user = usersWithDistance[index]!;
      // faqat radarRadius ichidagi nuqtalarni chizamiz
      if (Math.round(user.dist) <= radarRadius) {
         const x = radarCenter.x + user.x * scale;
         const y = radarCenter.y + user.y * scale;

         const dot = await createBouncyDot(x, y, user.photo, this.app);
         dot.on("click", () => {
            console.log(user);
         });
         this.circles.push(dot);
         this.mapContainer.addChild(dot);
      }

      setTimeout(() => {
         this.paintDots(usersWithDistance, radarRadius, radarCenter, index + 1);
      }, 25);
   }

   clearCircles() {
      this.circles.forEach((circle) => circle.destroy());
   }

   destroyGame() {
      this.app.destroy(true, { children: true });
   }

   // radarCircles() {
   //    const radarCircles = new RadarCircles({
   //       minRadius: 5,
   //       maxRadius: this.maxCenter,
   //       container: this.mapContainer,
   //    });

   //    this.app.ticker.add(() => radarCircles.startAnimation());
   // }
}
