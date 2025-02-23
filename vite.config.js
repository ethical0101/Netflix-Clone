import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allows external access (Render requires this)
    port: 5173,  // Use default/fallback port
    strictPort: true,  // Ensures the app runs only on the assigned port
    allowedHosts: ["netflix-clone-pcqb.onrender.com"],  // Allow Render's host
  },
});
