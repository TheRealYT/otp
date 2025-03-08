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
        plugins: [
            {
                name: 'html-transform',
                transformIndexHtml(html) {
                    return html.replace('$$HEADERS$$', `<title>Verify – Unlimited & Free Effortless Phone Verification</title>
    <meta name="title" content="Verify – Unlimited & Free Effortless Phone Verification"/>
    <meta name="description"
          content="Verify provides unlimited, free phone verification with seamless API integration. No SMS costs, with flexible self-hosting or integration options."/>

    <meta property="og:type" content="website"/>
    <meta property="og:url" content="${env.VITE_URL}/"/>
    <meta property="og:title" content="Verify – Unlimited & Free Effortless Phone Verification"/>
    <meta property="og:description"
          content="Verify provides unlimited, free phone verification with seamless API integration. No SMS costs, with flexible self-hosting or integration options."/>
    <meta property="og:image" content="${env.VITE_URL}/cover.png"/>

    <meta property="twitter:card" content="summary_large_image"/>
    <meta property="twitter:url" content="${env.VITE_URL}/"/>
    <meta property="twitter:title" content="Verify – Unlimited & Free Effortless Phone Verification"/>
    <meta property="twitter:description"
          content="Verify provides unlimited, free phone verification with seamless API integration. No SMS costs, with flexible self-hosting or integration options."/>
    <meta property="twitter:image" content="${env.VITE_URL}/cover.png"/>`);
                },
            },
        ],
    };
});
