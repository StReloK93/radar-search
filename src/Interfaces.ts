import type { Graphics } from "pixi.js"

export interface ICircleAnimation {
   radius: number
   delay: number
   startTime: null | number
   circle: Graphics
}