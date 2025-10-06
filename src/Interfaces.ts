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
   first_name: string;
   last_name: string;
   username: string;
   user_id: number;
   photo: string;
   last_active_time?: string | null;
   lat: number;
   lon: number;
}

export interface IUserDist {
   first_name: string;
   last_name: string;
   username: string;
   user_id: number;
   photo: string;
   lat: number;
   lon: number;
   x: number;
   y: number;
   dist: number;
}

export interface IAuthUser {
   added_to_attachment_menu?: boolean | undefined;
   first_name: string;
   user_id: number;
   is_bot?: boolean | undefined;
   is_premium?: boolean | undefined;
   last_name?: string | undefined;
   photo_url?: string | undefined;
   username?: string | undefined;
   lat: number | null;
   lon: number | null;
}
