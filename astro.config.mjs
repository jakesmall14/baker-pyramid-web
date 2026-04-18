import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { copyFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function copyPdfjsWorker() {
  return {
    name: 'copy-pdfjs-worker',
    hooks: {
      'astro:config:done': () => {
        const src = resolve('node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
        const dest = resolve('public/pdf.worker.min.mjs');
        if (existsSync(src)) copyFileSync(src, dest);
      },
    },
  };
}

export default defineConfig({
  integrations: [tailwind(), copyPdfjsWorker()],
  vite: {
    optimizeDeps: {
      exclude: ['pdfjs-dist'],
    },
  },
});
