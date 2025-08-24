<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "~/stores/auth";

const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
const auth = useAuthStore();

// синхронизируем роли/юзера в Pinia (на случай первого визита)
if (process.client && user.value) auth.sync(user.value);

const roleLabel = computed(() => {
  if (!auth.roles?.length) return "—";
  // если несколько – покажем первую, можно заменить на join(', ')
  return auth.roles[0];
});

function onLogin() {
  loginWithRedirect();
}

function onLogout() {
  logout({ logoutParams: { returnTo: window.location.origin } });
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
    <div
      class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4"
    >
      <!-- Логотип + название -->
      <div class="flex items-center gap-3">
        <!-- SVG нота -->
        <svg
          viewBox="0 0 24 24"
          class="h-7 w-7 text-indigo-600"
          aria-hidden="true"
          fill="currentColor"
        >
          <path
            d="M19 3v11.55A4 4 0 1 1 17 14V7h-6v7.55A4 4 0 1 1 9 14V5h10z"
          />
        </svg>
        <span class="text-xl font-semibold">Muse CRM</span>
      </div>

      <!-- Правый блок: роль/пользователь + кнопки -->
      <ClientOnly>
        <div class="flex items-center gap-3">
          <div
            v-if="isAuthenticated"
            class="hidden sm:flex flex-col text-right leading-tight"
          >
            <span class="text-sm text-gray-500"
              >Роль: <b>{{ roleLabel }}</b></span
            >
            <span class="text-sm truncate max-w-[240px]">{{
              user?.email
            }}</span>
          </div>

          <button
            v-if="!isAuthenticated"
            @click="onLogin"
            class="px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition"
          >
            Войти
          </button>

          <button
            v-else
            @click="onLogout"
            class="px-3 py-1.5 rounded-lg border hover:bg-gray-50 transition"
          >
            Выйти
          </button>
        </div>
      </ClientOnly>
    </div>
  </header>
</template>
