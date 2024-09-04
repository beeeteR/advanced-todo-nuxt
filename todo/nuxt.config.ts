// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  components: [
    '~/components',
    {
      path: '~/components/common',
      pathPrefix: true,
      prefix: 'common',
    },
    {
      path: '~/components/ui',
      pathPrefix: true,
      prefix: 'ui',
    },
    {
      path: '~/components/layout',
      pathPrefix: true,
      prefix: 'layout',
    },
    {
      path: '~/components/popups',
      pathPrefix: true,
      prefix: 'popups',
    },
    {
      path: '~/components/tasks',
      pathPrefix: true,
      prefix: 'tasks',
    }
  ],
  css: [
    '~/assets/style/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/additional.scss" as *;',
        },
      },
    },
  },
  modules: ["@pinia/nuxt"],
  imports: {
    dirs: [
      'composables', 'composables/*/index.{ts,js,mjs,mts}', 'composables/**'
    ]
  },
  pages: true
})