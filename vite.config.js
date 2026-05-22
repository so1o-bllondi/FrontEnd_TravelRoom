import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const getBase = () => {
  if (!process.env.GITHUB_ACTIONS) {
    return '/';
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

  if (!repoName || repoName.endsWith('.github.io')) {
    return '/';
  }

  return `/${repoName}/`;
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  base: getBase(),
});
