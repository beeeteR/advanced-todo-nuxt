// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/colors.css', '~/assets/css/nullalble.css', '~/assets/css/basic.css', '~/assets/css/modifiers.css'],
  modules: ["@pinia/nuxt"],
  imports: {
    dirs: [
      'composables', 'composables/*/index.{ts,js,mjs,mts}', 'composables/**'
    ]
  },
  pages: true
})