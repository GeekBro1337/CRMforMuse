import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(() => {
  const { isAuthenticated, user } = useAuth0();
  const store = useAuthStore();

  // первичная синхронизация + реакция на изменения
  watch(
    [isAuthenticated, user],
    () => {
      store.setAuthData(user.value, isAuthenticated.value);
    },
    { immediate: true }
  );
});
