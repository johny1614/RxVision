import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 4201,
        strictPort: true,
        headers: { 'Cache-Control': 'no-store' }
    }
});
