import { Container, Graphics } from "pixi.js";
import type { ICircleAnimation } from "../../Interfaces";

export class RadarCircles {
   circlesData: ICircleAnimation[];
   minRadius: number;
   maxRadius: number;
   container: Container;

   constructor({
      minRadius = 10,
      maxRadius = 300,
      container,
   }: {
      minRadius?: number;
      maxRadius?: number;
      container: Container;
   }) {
      this.minRadius = minRadius;
      this.maxRadius = maxRadius;
      this.container = container;
      this.circlesData = [];
      this.init();
   }

   init() {
      const minCircle = new Graphics()
         .circle(this.maxRadius, this.maxRadius, this.minRadius)
         .fill({ color: "#0088ff" });
      this.container.addChild(minCircle);

      this.circlesData = [];

      // Doiralarni yaratish
      for (let index = 0; index < 3; index++) {
         const circle = new Graphics()
            .circle(this.maxRadius, this.maxRadius, this.minRadius)
            .stroke({ width: 1, color: "#005096", alpha: 1 });
         this.container.addChild(circle);

         this.circlesData.push({
            radius: this.minRadius,
            delay: index * 400,
            startTime: null,
            circle: circle,
         });
      }
   }

   startAnimation(speed = 1.3) {
      const now = performance.now();

      this.circlesData.forEach((data) => {
         if (!data.startTime) data.startTime = now + data.delay;
         if (now < data.startTime) return;

         data.radius += speed;
         const alpha = 1 - (data.radius - this.minRadius) / ((this.maxRadius - this.minRadius) / 100) / 100;

         data.circle
            .clear()
            .circle(this.maxRadius, this.maxRadius, data.radius)
            .stroke({ width: 2, color: "#005096", alpha });

         if (data.radius > this.maxRadius - 1) data.radius = this.minRadius;
      });
   }
}
