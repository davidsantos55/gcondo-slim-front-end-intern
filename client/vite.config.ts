import basicSssl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @see https://vitejs.dev/config */
export default defineConfig({
    plugins: [react(), tsconfigPaths(), basicSssl()],
    server: {
        watch: {
            usePolling: true,
        },
        host: '0.0.0.0',
        /** @see https://v4.vitejs.dev/config/server-options.html#server-https */
        https: true,
        strictPort: true,
        port: 5173,
        proxy:{
            '/condominiums':{target: 'http://nginx:80',changeOrigin: true,secure: false,}
        }
        
    },
});
