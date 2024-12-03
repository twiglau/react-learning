import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import requireTransform from "vite-plugin-require-transform";
import ReactCompilerConfig from "babel-plugin-react-compiler";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    requireTransform({
      fileRegex: /.js$|.jsx$/,
    }),
  ],
});
