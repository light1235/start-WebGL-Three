import { defineConfig } from 'vite'
import glsl from "vite-plugin-glsl";

export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
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
