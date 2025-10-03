import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { isTMA, retrieveLaunchParams } from "@tma.js/bridge";

if (isTMA()) {
   const { tgWebAppData } = retrieveLaunchParams();
   console.log("launchParams:", tgWebAppData?.user);
}

createApp(App).mount("#app");
