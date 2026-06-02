<script setup>
import CountdownTimer from './CountdownTimer.vue'

defineProps({
  workshop: { type: Object, required: true }
})

function formatDate(dateString) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(dateString))
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Call for Papers</p>
        <h2>Submit Your Research</h2>
        <p>
          We invite submissions of original, unpublished research papers on safe and trustworthy
          world models for embodied AI. Topics of interest include but are not limited to:
        </p>
      </div>

      <div class="topic-categories">
        <div v-for="cat in workshop.topicCategories" :key="cat.number" class="topic-card">
          <div class="topic-card-header">
            <span class="topic-number">{{ cat.number }}</span>
            <h3>{{ cat.title }}</h3>
          </div>
          <ul class="topic-list">
            <li v-for="topic in cat.topics" :key="topic">{{ topic }}</li>
          </ul>
        </div>
      </div>

      <div class="cfp-bottom">
        <div class="info-card">
          <h3>Submission Details</h3>
          <div class="submission-details">
            <div class="submission-detail">
              <span>Format</span>
              <strong>
                <a
                  :href="workshop.submissionInfo.templateUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ workshop.submissionInfo.format }}
                </a>
              </strong>
            </div>
            <div class="submission-detail">
              <span>Full paper submissions</span>
              <strong>{{ workshop.submissionInfo.fullPaperSubmission }}</strong>
            </div>
            <div class="submission-detail">
              <span>Poster paper submissions</span>
              <strong>{{ workshop.submissionInfo.posterPaperSubmission }}</strong>
            </div>
          </div>
        </div>

        <div class="info-card">
          <h3>Important Dates</h3>
          <div class="date-list">
            <div v-for="entry in workshop.importantDates" :key="entry.label" class="date-row">
              <span>{{ entry.label }}</span>
              <strong>{{ formatDate(entry.date) }}</strong>
            </div>
          </div>
          <CountdownTimer
            :deadline="workshop.importantDates[0].date"
            style="margin-top: 1rem"
          />
        </div>
      </div>
    </div>
  </section>
</template>
