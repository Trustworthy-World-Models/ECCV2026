<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  deadline: {
    type: String,
    required: true
  }
})

const millisecondsRemaining = ref(0)
let intervalId

function updateCountdown() {
  const distance = new Date(props.deadline).getTime() - Date.now()
  millisecondsRemaining.value = Math.max(distance, 0)
}

const countdown = computed(() => {
  const totalDays = Math.floor(millisecondsRemaining.value / (1000 * 60 * 60 * 24))
  const hours = Math.floor((millisecondsRemaining.value / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((millisecondsRemaining.value / (1000 * 60)) % 60)

  return {
    days: totalDays,
    hours,
    minutes,
    isExpired: millisecondsRemaining.value <= 0
  }
})

onMounted(() => {
  updateCountdown()
  intervalId = window.setInterval(updateCountdown, 60000)
})

onUnmounted(() => {
  window.clearInterval(intervalId)
})
</script>

<template>
  <div class="countdown-card" :class="{ 'countdown-card--expired': countdown.isExpired }">
    <p class="countdown-label">Submission deadline countdown</p>
    <div class="countdown-values">
      <div>
        <strong>{{ countdown.days }}</strong>
        <span>days</span>
      </div>
      <div>
        <strong>{{ countdown.hours }}</strong>
        <span>hours</span>
      </div>
      <div>
        <strong>{{ countdown.minutes }}</strong>
        <span>minutes</span>
      </div>
    </div>
    <p class="countdown-note">
      {{ countdown.isExpired ? 'Deadline has passed.' : 'Remaining until the paper submission deadline.' }}
    </p>
  </div>
</template>
