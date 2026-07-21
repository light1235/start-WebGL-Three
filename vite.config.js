import { defineConfig } from 'vite'
import glsl from "vite-plugin-glsl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    glsl({
      include: [
        '**/*.glsl',
        '**/*.wgsl',
        '**/*.vert',
        '**/*.frag'
      ],
      exclude: undefined,
      warnDuplicatedImports: true,
      defaultExtension: 'glsl',
      compress: false,
      watch: true,
    }),
  ],
})
