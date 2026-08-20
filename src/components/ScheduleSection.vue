<script setup>
defineProps({
  workshop: { type: Object, required: true }
})

function isBreak(title) {
  const lower = title.toLowerCase()
  return lower.includes('break') || lower.includes('coffee') || lower.includes('poster viewing')
}
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Schedule</p>
        <h2>Workshop Program</h2>
        <p>Half-day hybrid event on {{ workshop.scheduleDate }} ({{ workshop.scheduleTimezone }})</p>
      </div>

      <div class="schedule-wrapper">
        <div class="schedule-header">
          <strong>{{ workshop.scheduleDate }}</strong>
          <span>Timezone: {{ workshop.scheduleTimezone }} (Sweden)</span>
        </div>

        <table class="schedule-table">
          <tbody>
            <tr
              v-for="slot in workshop.schedule"
              :key="slot.time + slot.title"
              :class="{ 'schedule-break': isBreak(slot.title) }"
            >
              <td class="schedule-time">{{ slot.time }}</td>
              <td>
                <div class="schedule-title">{{ slot.title }}</div>
                <div v-if="slot.speaker" class="schedule-speaker">{{ slot.speaker }}</div>
                <div v-if="slot.talkTitle" class="schedule-speaker" style="font-style: italic">
                  "{{ slot.talkTitle }}"
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="schedule-wrapper conference-schedule-wrapper">
        <div class="schedule-header">
          <strong>ECCV Daily Schedule</strong>
          <span>{{ workshop.scheduleDate }}</span>
        </div>

        <div class="schedule-table-scroll">
          <table class="schedule-table conference-schedule-table">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">Event</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in workshop.conferenceSchedule"
                :key="`${item.time}-${item.event}`"
                :class="{ 'schedule-break': isBreak(item.event) }"
              >
                <td class="schedule-time">{{ item.time }}</td>
                <td class="schedule-title">{{ item.event }}</td>
                <td class="schedule-location">{{ item.location }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
