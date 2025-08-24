<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

const signup = () =>
  loginWithRedirect({
    authorizationParams: { screen_hint: "signup" },
  });

const doLogout = () =>
  logout({
    logoutParams: { returnTo: window.location.origin }, // <-- важно для v2
  });
</script>

<template>
  <div class="flex items-center gap-3">
    <span v-if="isAuthenticated" class="opacity-70"
      >Привет, {{ user?.email }}</span
    >
    <button
      v-if="!isAuthenticated"
      class="px-3 py-1 rounded border"
      @click="signup"
    >
      Регистрация
    </button>
    <button
      v-if="!isAuthenticated"
      class="px-3 py-1 rounded border"
      @click="() => loginWithRedirect()"
    >
      Войти
    </button>
    <button v-else class="px-3 py-1 rounded border" @click="doLogout">
      Выйти
    </button>
  </div>
</template>
