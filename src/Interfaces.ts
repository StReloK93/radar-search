import type { Graphics } from "pixi.js";

export interface ICircleAnimation {
   radius: number;
   delay: number;
   startTime: null | number;
   circle: Graphics;
}

export interface ICoordinate {
   lat: number;
   lon: number;
}

export interface IUser extends IAuthUser, ICoordinate {
   last_active_time?: string | null;
   photo: string;
   x: number;
   y: number;
   dist: number;
}

export interface IAuthUser {
   first_name: string;
   last_name: string;
   username: string;
   user_id: number;
   photo_url: string;
}
