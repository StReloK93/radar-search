// MapApp.ts
import type { IPoint, IUser, IUserDist } from "../Interfaces";
import { Application, Assets, Container, Graphics } from "pixi.js";
import { projectToRadar } from "./helpers";
import { RadarCircles } from "./components/RadarCircles";
import { radarGrid } from "./components/RadarGrid";

export class StartGame {
   app: Application;
   mapContainer: Container;
   maxCenter: number;
   circles: Container[];
   onBeforeInit: (() => void) | null;
   onUpdateUsers: ((users: IUserDist[]) => void) | null;

   constructor(parentNode: HTMLElement) {
      this.circles = [];
      this.onBeforeInit = null;
      this.onUpdateUsers = null;
      this.app = new Application();
      this.mapContainer = new Container();
      this.maxCenter = 0;
      this.init(parentNode);
   }

   userPoint() {
      const minCircle = new Graphics().circle(this.maxCenter, this.maxCenter, 5).fill({ color: "#222", alpha: 1 });
      this.mapContainer.addChild(minCircle);
   }

   radarCircles() {
      const radarCircles = new RadarCircles({
         minRadius: 5,
         maxRadius: this.maxCenter,
         container: this.mapContainer,
      });

      this.app.ticker.add(() => radarCircles.startAnimation());
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

      this.userPoint();
      // this.radarCircles();

      const backgroundGrid = radarGrid(this.app.canvas.width, this.app.canvas.height, 12);
      this.mapContainer.addChild(backgroundGrid);

      if (this.onBeforeInit) this.onBeforeInit();
   }

   pointsByCoordinate(center: IPoint, radarRadius: number, users: IUser[]) {
      const radarCenter = { x: this.maxCenter, y: this.maxCenter };
      const distanceSort = users.map((user) => ({ ...projectToRadar(user, center), ...user }));

      distanceSort.sort((a, b) => a.dist - b.dist);
      if (this.onUpdateUsers) this.onUpdateUsers(distanceSort);

      this.paintDots(distanceSort, radarRadius, radarCenter);
   }

   async paintDots(
      usersWithDistance: IUserDist[],
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

         const dot = await this.createBouncyDot(x, y, user.photo_url);
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

   async createBouncyDot(x: number, y: number, avatarUrl: string) {
      const container = new Container();
      container.x = x;
      container.y = y;
      container.eventMode = "static";
      container.cursor = "pointer";
      const proxyUrl = "https://corsproxy.io/?";
      // const texture = await Assets.load(proxyUrl + avatarUrl);

      const texture = await Assets.load({ src: proxyUrl + avatarUrl, parser: "texture" });
      const circle = new Graphics().circle(0, 0, 20).fill(texture).stroke({ width: 1, color: "#000" });
      container.scale.set(0);

      container.addChild(circle);

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

         container.scale.set(scale);
      });

      return container;
   }

   clearCircles() {
      this.circles.forEach((circle) => circle.destroy());
   }

   destroyGame() {
      this.app.destroy(true, { children: true });
   }
}
