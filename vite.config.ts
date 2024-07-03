import { ConfigEnv, UserConfig, defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const userConfig = (config: ConfigEnv) => {
  const env = loadEnv(config.mode, process.cwd())
  return {
    plugins: [react()],
    server: {
      open: true,
      proxy: {
        '/eSignature': {
          target: env.VITE_PROXY,
          changeOrigin: true // 允许跨域
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/base.scss";'
        }
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
}

export default defineConfig(userConfig as UserConfig)
