import type { Graphics } from "pixi.js";

export interface ICircleAnimation {
   radius: number;
   delay: number;
   startTime: null | number;
   circle: Graphics;
}

export interface IPoint {
   lat: number;
   lon: number;
}

export interface IUser {
   id: number;
   name: string;
   username: string;
   avatar: string;
   lat: number;
   lon: number;
}

export interface IUserDist {
   id: number;
   name: string;
   username: string;
   avatar: string;
   lat: number;
   lon: number;
   x: number,
   dist: number,
   y: number
}

