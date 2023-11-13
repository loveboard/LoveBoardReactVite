import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from'vite-plugin-mkcert'


/*

import replace from '@rollup/plugin-replace'

const pwaOptions = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'PWA Router',
    short_name: 'PWA Router',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest).name = 'PWA Inject Manifest'
  ;(pwaOptions.manifest).short_name = 'PWA Inject'
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying
*/

const manifestForPlugin = {
  // injectRegister: 'auto',

  mode: 'development',
  base: "./",
  includeAssets: ['logo.svg'],
  //strategies : 'injectManifest',
  // registerType: "autoUpdate",
  registerType: "prompt",
  // includeAssets: ["favicon.ico", "apple-touch-icon-180x180.png", "logo.svg"],
  manifest: {
    name: "LoveBoard",
    short_name: "LoveBoard",
    theme_color: '#ffffff',
    description: "An app that can show weather forecast for your city.",

    icons: [
      // https://vite-pwa-org.netlify.app/assets-generator/#example-using-minimal-preset
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
        purpose: "any maskable"
      },
      {
        src: 'pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'apple-touch-icon-180x180.png', // <== don't remove slash, for testing
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
    ],
    // theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
};

export default defineConfig({
  
  server: {
    https: true
  },
  base: "./",
  // base: process.env.BASE_URL || 'https://github.com/',
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    react({
      include: "**/*.jsx",
    }),
    VitePWA(manifestForPlugin),
    mkcert()
    // replace(replaceOptions),
  ],
  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  }
})



// https://vitejs.dev/config/
