<script setup>
defineProps({
  workshop: { type: Object, required: true }
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Panel Discussion</p>
        <h2>{{ workshop.panelDiscussion.title }}</h2>
      </div>

      <div class="panel-content">
        <p class="panel-description">{{ workshop.panelDiscussion.description }}</p>

        <div class="panel-questions">
          <div
            v-for="(q, idx) in workshop.panelDiscussion.questions"
            :key="idx"
            class="panel-question"
          >
            <span class="panel-q-icon">Q</span>
            <span>{{ q }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
