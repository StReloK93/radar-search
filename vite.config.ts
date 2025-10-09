import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // 🔧 ESM muhitda __dirname ni olish
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
   plugins: [vue(), tailwindcss()],
   server: {
      allowedHosts: ["*"], // barcha loca.lt subdomenlariga ruxsat beradi

      // https: {
      //    key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      //    cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
      // },
      host: "localhost",
      port: 5174,
   },
});
