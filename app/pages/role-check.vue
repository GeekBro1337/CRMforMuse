<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

let isAuthenticated, user;

if (process.client) {
  const auth0 = await import("@auth0/auth0-vue");
  const { useAuth0 } = auth0;
  const auth0Client = useAuth0();

  isAuthenticated = auth0Client.isAuthenticated;
  user = auth0Client.user;

  auth.setAuthData(user.value, isAuthenticated.value);
}
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">👤 Проверка роли</h1>

    <div v-if="auth.isAuthenticated">
      <p>
        Имя: <strong>{{ auth.user?.name }}</strong>
      </p>
      <p>
        Email: <strong>{{ auth.user?.email }}</strong>
      </p>
      <p>
        Роли: <strong>{{ auth.roles.join(", ") || "Нет" }}</strong>
      </p>

      <div class="mt-4">
        <p v-if="auth.hasRole('Admin')" class="text-red-500">
          ✅ Ты Администратор
        </p>
        <p v-else-if="auth.hasRole('Manager')" class="text-blue-500">
          ✅ Ты Менеджер
        </p>
        <p v-else-if="auth.hasRole('Teacher')" class="text-green-500">
          ✅ Ты Преподаватель
        </p>
        <p v-else-if="auth.hasRole('Student')" class="text-purple-500">
          ✅ Ты Ученик
        </p>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-500">Ты ещё не авторизован.</p>
    </div>
  </div>
</template>
