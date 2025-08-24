// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@pinia/nuxt", "@pinia/nuxt"],

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2025-07-16",

  // ⬇️ ВАЖНО: пробрасываем ENV в клиент и сервер
  runtimeConfig: {
    // серверные (не попадут в браузер)
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    DATABASE_URL: process.env.DATABASE_URL,

    // публичные (доступны в браузере — нужны SDK Auth0)
    public: {
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE || "",
    },
  },
});
