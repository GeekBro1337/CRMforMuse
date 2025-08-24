// /plugins/auth0.client.ts
import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const pub = useRuntimeConfig().public;

  nuxtApp.vueApp.use(
    createAuth0({
      domain: pub.AUTH0_DOMAIN,
      clientId: pub.AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: pub.AUTH0_AUDIENCE || "",
      },
      cacheLocation: "localstorage",
      useRefreshTokens: true,
    })
  );
});
