import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            components: "/components",
            src: "/src",
            config: "/utils/config",
            hooks: "/utils/hooks",
        },
    },
});
