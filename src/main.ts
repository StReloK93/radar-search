import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import {  isTMA, retrieveLaunchParams, retrieveRawInitData, retrieveRawLaunchParams } from "@tma.js/bridge";

async function bootstrap() {
   
   if (isTMA()) {
      console.log("In Telegram WebApp ✅");

      const launchParams = retrieveLaunchParams();
      const rawInitData = retrieveRawInitData(); // faqat init() dan keyin to‘ladi
      const rawLaunchParams = retrieveRawLaunchParams();

      console.log("launchParams:", launchParams);
      console.log("rawInitData:", rawInitData);
      console.log("rawLaunchParams:", rawLaunchParams);
   }
}

bootstrap();
createApp(App).mount("#app");
