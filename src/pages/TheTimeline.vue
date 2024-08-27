<script setup>
import { ref, watchPostEffect, nextTick } from "vue";
import TimelineItem from "@/components/TimelineItem.vue";
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from "@/constants";
import { currentPage } from "@/router";
import { currentHour } from "@/functions";
import { timelineItems } from "@/timeline-items";

defineExpose({ scrollToHour });

const timelineItemRefs = ref([]);

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick();
    scrollToHour(null, false);
  }
});

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= currentHour();
  const el =
    hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el;
  el.scrollIntoView({ behavior: isSmooth ? "smooth" : "instant" });
}
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
