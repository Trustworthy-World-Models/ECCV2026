<script setup>
import { getOrganizerAvatar, getProgramCommitteeAvatar } from '../utils/personImageLoader'

defineProps({
  workshop: { type: Object, required: true }
})
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Organizers</p>
      </div>

      <div class="committee-block">
        <h3 class="committee-title">Organizing Committee</h3>
        <p class="committee-description">
          Our team spans the UK, USA, China, UAE, and Singapore,
          combining expertise in vision, robotics, and safety validation.
        </p>
        <div class="organizers-grid">
          <article v-for="organizer in workshop.organizers" :key="organizer.name" class="organizer-card">
            <div class="avatar-sm">
              <img
                v-if="getOrganizerAvatar(organizer.name)"
                :src="getOrganizerAvatar(organizer.name)"
                :alt="`${organizer.name} portrait`"
                class="avatar-image avatar-image-sm"
                width="52"
                height="52"
                loading="lazy"
                decoding="async"
              />
              <span v-else>{{ organizer.initials }}</span>
            </div>
            <h4>{{ organizer.name }}</h4>
            <p class="organizer-affiliation">{{ organizer.affiliation }}</p>
            <p v-if="organizer.area" class="organizer-area">{{ organizer.area }}</p>
          </article>
        </div>
      </div>

      <div v-if="workshop.programCommittee?.length" class="committee-block">
        <h3 class="committee-title">Program Committee</h3>
        <p class="committee-description">
          Our program committee brings together researchers and practitioners from academia and
          industry to support a thoughtful and rigorous review process.
        </p>
        <div class="program-committee-grid">
          <article v-for="member in workshop.programCommittee" :key="member.name" class="organizer-card">
            <div class="avatar-sm">
              <img
                v-if="getProgramCommitteeAvatar(member.name)"
                :src="getProgramCommitteeAvatar(member.name)"
                :alt="`${member.name} portrait`"
                class="avatar-image avatar-image-sm"
                width="52"
                height="52"
                loading="lazy"
                decoding="async"
              />
              <span v-else>{{ member.initials }}</span>
            </div>
            <h4>{{ member.name }}</h4>
            <p class="organizer-affiliation">{{ member.affiliation }}</p>
            <p v-if="member.area" class="organizer-area">{{ member.area }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
