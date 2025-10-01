import { Graphics } from "pixi.js";

export function grid(width: number, height: number, spacing: number = 12) {
   const grid = new Graphics();

   // Vertikal chiziqlar
   for (let x = 0; x <= width; x += spacing) {
      grid.moveTo(x, 0).lineTo(x, height);
   }

   // Gorizontal chiziqlar
   for (let y = 0; y <= height; y += spacing) {
      grid.moveTo(0, y).lineTo(width, y);
   }

   // Chiziqni oq rangda, pixel-perfect qilib chizish
   grid.stroke({ color: '#0088ff', width: 1, pixelLine: true, alpha: 0.15 });

   return grid;
}
