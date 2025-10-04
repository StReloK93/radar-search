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
   x: number;
   dist: number;
   y: number;
}

export interface IAuthUser {
   added_to_attachment_menu?: boolean | undefined;
   allows_write_to_pm?: boolean | undefined;
   first_name: string;
   id: number;
   is_bot?: boolean | undefined;
   is_premium?: boolean | undefined;
   last_name?: string | undefined;
   language_code?: string | undefined;
   photo_url?: string | undefined;
   username?: string | undefined;
}
