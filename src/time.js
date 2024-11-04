import { ref, computed } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_HOUR
} from '@/constants'

const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => (now.value - midnight.value) / MILLISECONDS_IN_SECOND)

export function today() {
  return new Date()
}

export function tomorrow() {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

export function endOfHour(date) {
  const endOHour = new Date(date)
  endOHour.setTime(endOHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)

  endOHour.setMinutes(0, 0, 0)

  return endOHour
}

export function isToday(date) {
  return date.toDateString() === today().toDateString()
}

export function toSeconds(milliseconds) {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}

export const now = ref(today())

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

export function startCurrentDateTimer() {
  setInterval(() => (now.value = today()), MILLISECONDS_IN_SECOND)
}
