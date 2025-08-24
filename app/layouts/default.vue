<template>
  <div class="min-h-dvh flex flex-col">
    <AppHeader />
    <!-- компонент в app/components/AppHeader.client.vue -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
