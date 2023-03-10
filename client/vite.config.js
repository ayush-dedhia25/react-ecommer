import ViteRequireContext from '@originjs/vite-plugin-require-context';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), ViteRequireContext()],
});
