import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	const allowedHosts = env.VITE_ALLOWED_HOSTS
		? env.VITE_ALLOWED_HOSTS.split(',').map(host => host.trim()).filter(Boolean)
		: ['orders.snejok.syudo.org.ua']
	const port = Number(env.VITE_DEV_SERVER_PORT) || 5173

	return {
		server: {
			allowedHosts,
			port,
		},
		plugins: [vue()],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
			},
		},
	}
})
