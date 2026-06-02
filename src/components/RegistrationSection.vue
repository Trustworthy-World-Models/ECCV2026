<script setup>
import { onUnmounted, ref } from 'vue'

defineProps({
  workshop: { type: Object, required: true }
})

const isToastVisible = ref(false)
let toastTimer = null

function showRegistrationToast() {
  isToastVisible.value = true

  if (toastTimer) {
    window.clearTimeout(toastTimer)
  }

  toastTimer = window.setTimeout(() => {
    isToastVisible.value = false
    toastTimer = null
  }, 2500)
}

onUnmounted(() => {
  if (toastTimer) {
    window.clearTimeout(toastTimer)
  }
})
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="registration-panel">
        <div>
          <h2>Attend via ECCV 2026</h2>
          <p>
            Workshop attendance is handled through the ECCV 2026 main conference registration.
            No additional fee is currently planned beyond the standard conference registration.
            The workshop will be held in hybrid format (in-person and online).
          </p>
        </div>

        <div class="registration-actions">
          <a class="button button-outline" :href="workshop.links.submission" target="_blank">Submission</a>
          <div class="registration-action-row">
            <button class="button button-outline" type="button" @click="showRegistrationToast">
              ECCV Registration
            </button>
            <a class="button button-outline" :href="workshop.links.conference" target="_blank">Conference Info</a>
          </div>
        </div>

        <Transition name="registration-toast">
          <div v-if="isToastVisible" class="registration-toast" role="status" aria-live="polite">
            Registration is not open yet.
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.registration-panel {
  position: relative;
}

.registration-toast {
  position: absolute;
  right: 0;
  bottom: -3.5rem;
  z-index: 10;
  max-width: min(320px, calc(100vw - 2rem));
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
  background: rgba(15, 23, 42, 0.94);
  color: #fff;
  box-shadow: var(--shadow-lg);
  font-size: 0.9rem;
  line-height: 1.4;
}

.registration-toast-enter-active,
.registration-toast-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.registration-toast-enter-from,
.registration-toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 768px) {
  .registration-toast {
    right: auto;
    left: 0;
    bottom: -4.25rem;
  }
}
</style>
