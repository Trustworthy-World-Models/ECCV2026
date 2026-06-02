<script setup>
defineProps({
  workshop: { type: Object, required: true }
})

const heroBackgroundImage = [
  'linear-gradient(90deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.68) 44%, rgba(15, 23, 42, 0.3) 100%)',
  `url("${import.meta.env.BASE_URL}bg.png")`
].join(', ')
</script>

<template>
  <section class="hero" :style="{ backgroundImage: heroBackgroundImage }">
    <div class="container">
      <div class="hero-top-bar">
        <span class="hero-venue-badge">{{ workshop.conference }}</span>
      </div>

      <h1>{{ workshop.fullTitle }}</h1>
      <p class="hero-subtitle">{{ workshop.hero.description }}</p>

      <div class="hero-meta-row">
        <span>{{ workshop.dateDisplay }}</span>
        <span>{{ workshop.location }}</span>
        <span>{{ workshop.format }}</span>
      </div>

      <div class="hero-awards">
        <div class="award-item">
          <span class="award-icon">&#127942;</span>
          <span>Best Paper Award <span class="award-amount">$500</span></span>
        </div>
        <div class="award-item">
          <span class="award-icon">&#127942;</span>
          <span>Best Paper Runner-Up <span class="award-amount">$300</span></span>
        </div>
        <div class="award-item">
          <span class="award-icon">&#127942;</span>
          <span>Best Poster Award <span class="award-amount">$300</span></span>
        </div>
        <div class="award-item">
          <span class="award-icon">&#127908;</span>
          <span>Oral Presentation</span>
        </div>
      </div>
    </div>
  </section>
</template>
