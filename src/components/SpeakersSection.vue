<script setup>
import { getSpeakerAvatar } from '../utils/personImageLoader'

defineProps({
  workshop: { type: Object, required: true }
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Invited Speakers</p>
        <h2>Keynotes &amp; Featured Talks</h2>
        <p>
          Confirmed speakers from academia and industry spanning the USA, UK, Europe, and Asia.
        </p>
      </div>

      <div class="speakers-grid">
        <article v-for="speaker in workshop.speakers" :key="speaker.name" class="speaker-card">
          <div class="avatar">
            <img
              v-if="getSpeakerAvatar(speaker.name)"
              :src="getSpeakerAvatar(speaker.name)"
              :alt="`${speaker.name} portrait`"
              class="avatar-image"
              width="72"
              height="72"
              loading="lazy"
              decoding="async"
            />
            <span v-else>{{ speaker.initials }}</span>
          </div>
          <h3>{{ speaker.name }}</h3>
          <p class="speaker-affiliation">{{ speaker.affiliation }}</p>
          <span class="speaker-area">{{ speaker.area }}</span>
          <div v-if="speaker.talkTitle !== 'TBD'" class="speaker-talk">
            "{{ speaker.talkTitle }}"
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
