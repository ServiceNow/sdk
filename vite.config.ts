import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { extendTheme, pigment } from "@pigment-css/vite-plugin";

const theme = extendTheme({
  colors: {
    primary: "tomato",
    secondary: "cyan",
  },
  spacing: {
    unit: 8,
  },
});

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [
    pigment({
      theme,
    }),
    react(),
    nodePolyfills(),
  ],
  optimizeDeps: {
    include: ["react-is", "prop-types"],
  },
});
