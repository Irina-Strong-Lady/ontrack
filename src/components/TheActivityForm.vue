<script setup>
import { ref, nextTick, inject } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { id } from "@/functions";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { createActivityKey } from "@/keys";

const createActivity = inject(createActivityKey);

const name = ref("");

async function submit() {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0,
  });
  name.value = "";

  await nextTick();
  window.scrollTo(0, document.body.scrollHeight);
}
</script>

<template>
  <form
    @submit.prevent="submit"
    class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4"
  >
    <input
      type="text"
      v-model="name"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="name.trim() === ''">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>
