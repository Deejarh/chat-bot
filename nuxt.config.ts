// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  ssr: false,
  runtimeConfig: {
    OPENAI_API_KEY: process.env.NUXT_OPENAI_API_KEY
  },
  proxy: {
    '/api/ai': {
      target: 'http://localhost:3000', 
      pathRewrite: { '^/api': '' },    
      changeOrigin: true,              
    },
  },
});

