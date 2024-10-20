import { ref, computed, watchEffect } from 'vue'
import {
  HUNDRED_PERCENT,
  MINUTES_IN_HOUR,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE,
  MILLISECONDS_IN_SECOND
} from '@/constants'

function calculateSecondsSinceMidnight() {
  const now = new Date()
  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

let timer = null

const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
)

watchEffect(() => {
  if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
    secondsSinceMidnight.value = 0
  }
})

export function startTimer() {
  secondsSinceMidnight.value = calculateSecondsSinceMidnight()

  timer = setInterval(() => {
    secondsSinceMidnight.value += 5 * 60
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  clearInterval(timer)
}
