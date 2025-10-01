import { StartGame } from "./components/StartGame";
export async function initGame(root: HTMLElement) {
   const mapApp = new StartGame();
   await mapApp.init(root)
   globalThis.__PIXI_APP__ = mapApp.app;
   return mapApp
}

export function destroyGame(mapApp: StartGame) {
   mapApp.app.destroy(true, { children: true })
}