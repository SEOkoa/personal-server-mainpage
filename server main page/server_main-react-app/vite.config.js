import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // 청크 사이즈 경고 제한을 원하는 값으로 조정합니다.
    chunkSizeWarningLimit: 600, // 기본 500kB에서 늘림
    rollupOptions: {
      output: {
        // 각 모듈을 필요한 기준에 따라 청크로 분리합니다.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
