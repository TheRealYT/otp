import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

// https://vite.dev/config/
const config = {
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
};

export default defineConfig(({mode, command}) => {
    if (command === 'serve')
        return {
            ...config,
            define: {
                BACKEND_BASE_URL: JSON.stringify('http://localhost:3000'),
            },
        };

    const env = loadEnv(mode, process.cwd(), '');

    return {
        ...config,
        define: {
            BACKEND_BASE_URL: JSON.stringify(env.VITE_BACKEND_URL),
        },
    };
});
