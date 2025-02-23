import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",  // Allows external access (Render requires this)
    port: 5173,  // Use Render's default or fallback to 5173
  },
});
