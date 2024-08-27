<script setup>
import { inject } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import ActivitySecondsToComplete from "@/components/ActivitySecondsToComplete.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { BUTTON_TYPE_DANGER } from "@/constants";
import { isActivityValid } from "@/validators";
import {
  setActivitySecondsToCompleteKey,
  periodSelectOptionsKey,
  deleteActivityKey,
} from "@/keys";

defineProps({
  activity: {
    required: true,
    type: Object,
    validator: isActivityValid,
  },
});

const setActivitySecondsToComplete = inject(setActivitySecondsToCompleteKey);

const periodSelectOptions = inject(periodSelectOptionsKey);

const deleteActivity = inject(deleteActivityKey);
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="periodSelectOptions"
        @select="setActivitySecondsToComplete(activity, $event)"
      />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
