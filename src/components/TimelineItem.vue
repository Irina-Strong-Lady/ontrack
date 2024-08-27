<script setup>
import { inject } from "vue";
import BaseSelect from "./BaseSelect.vue";
import TimelineStopWatch from "./TimelineStopWatch.vue";
import TimelineHour from "./TimelineHour.vue";
import { isTimelineItemValid, isUndefined } from "@/validators";
import { activitySelectOptionsKey, setTimelineItemActivityKey } from "@/keys";

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const emit = defineEmits({
  scrollToHour: isUndefined,
});

const activitySelectOptions = inject(activitySelectOptionsKey);

const setTimelineItemActivity = inject(setTimelineItemActivityKey);
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopWatch :timeline-item="timelineItem" />
  </li>
</template>
