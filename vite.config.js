import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Statik çok sayfalı site. React kaldırıldı — index.html hiçbir zaman
// main.jsx/App.jsx yüklemiyordu, o dosyalar ölü koddu.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kvkk: resolve(__dirname, 'pages/kvkk.html'),
        gizlilik: resolve(__dirname, 'pages/gizlilik.html'),
        kosullar: resolve(__dirname, 'pages/kullanim-kosullari.html'),
      },
    },
  },
})
