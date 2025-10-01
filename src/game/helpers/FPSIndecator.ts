import { Text, Ticker } from "pixi.js";
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
   
   return fpsText
}

