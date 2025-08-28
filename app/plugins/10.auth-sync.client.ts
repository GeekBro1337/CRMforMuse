import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
  const { isAuthenticated, user } = useAuth0();
  const store = useAuthStore();
  let synced = false;

  watch(
    [isAuthenticated, user],
    async () => {
      store.setAuthData(user.value, isAuthenticated.value);

      if (!synced && isAuthenticated.value && user.value) {
        synced = true;
        try {
          await $fetch("/api/auth/sync", {
            method: "POST",
            body: {
              sub: user.value.sub,
              email: user.value.email,
              name: user.value.name,
            },
          });
        } catch (err) {
          console.error("Profile sync failed", err);
          synced = false;
        }
      }
    },
    { immediate: true }
  );
});
