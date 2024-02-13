import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import envCompatible from 'vite-plugin-env-compatible';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "API_KEY",
  plugins: [vue(), envCompatible()],
})
