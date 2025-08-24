<script setup lang="ts">
const form = reactive({
  name: "",
  phone: "",
  preferredTime: "",
  comment: "",
});
const sent = ref(false);
const sending = ref(false);
const errorMsg = ref("");

const submit = async () => {
  errorMsg.value = "";
  if (!form.name || !form.phone) {
    errorMsg.value = "Заполните имя и телефон.";
    return;
  }
  sending.value = true;
  const { error } = await useFetch("/api/public/trial", {
    method: "POST",
    body: form,
  });
  sending.value = false;
  if (error.value) {
    errorMsg.value = error.value.statusMessage || "Ошибка отправки";
  } else {
    sent.value = true;
  }
};
</script>

<template>
  <main class="max-w-2xl mx-auto p-6 space-y-8">
    <!-- Шапка -->
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        Music Club CRM — Запись на пробный урок
      </h1>
      <AuthButtons />
    </header>

    <!-- Форма записи -->
    <section class="rounded-2xl border p-5">
      <h2 class="text-xl font-semibold mb-4">Оставьте заявку</h2>

      <div v-if="!sent" class="grid gap-3">
        <input
          v-model="form.name"
          placeholder="Ваше имя"
          class="border rounded px-3 py-2"
        />
        <input
          v-model="form.phone"
          placeholder="Телефон"
          class="border rounded px-3 py-2"
        />
        <input
          v-model="form.preferredTime"
          placeholder="Удобное время (необязательно)"
          class="border rounded px-3 py-2"
        />
        <textarea
          v-model="form.comment"
          placeholder="Комментарий"
          class="border rounded px-3 py-2 min-h-24"
        />
        <div class="text-red-600 text-sm" v-if="errorMsg">{{ errorMsg }}</div>
        <button
          :disabled="sending"
          @click="submit"
          class="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        >
          {{ sending ? "Отправляем…" : "Отправить заявку" }}
        </button>
      </div>

      <div v-else class="text-green-700">
        Заявка отправлена! Мы свяжемся с вами в ближайшее время.
      </div>
    </section>
  </main>
  
</template>
