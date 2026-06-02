<script setup>
defineProps({
  workshop: { type: Object, required: true }
})
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Competition</p>
        <h2>{{ workshop.competition.title }}</h2>
        <p>{{ workshop.competition.description }}</p>
        <a
          v-if="workshop.competition.entryUrl"
          class="button button-outline competition-entry"
          :href="workshop.competition.entryUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Competition Entry
        </a>
      </div>

      <div class="competition-content">
        <div
          v-for="(phase, idx) in workshop.competition.phases"
          :key="phase.title"
          class="phase-card"
        >
          <span class="phase-badge">Phase {{ idx + 1 }}</span>
          <h3>{{ phase.title }}</h3>
          <p>{{ phase.description }}</p>
        </div>
      </div>

      <div class="competition-timeline">
        <h3>Competition Timeline (AoE)</h3>
        <div class="timeline-steps">
          <div
            v-for="item in workshop.competition.timeline"
            :key="item.label"
            class="timeline-step"
          >
            <span class="timeline-dot"></span>
            <span>{{ item.label }}</span>
            <strong>{{ item.date }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
