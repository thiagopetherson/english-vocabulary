// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  alias: {
    css: '/<rootDir>/assets/css'
  },
  css: ["~/assets/css/main.css"],
  modules: [    
    '@nuxt/ui'
  ],  
  ssr: false
})