<script setup>
defineProps({
  workshop: { type: Object, required: true }
})
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="section-heading">
        <h2>Workshop Sponsors</h2>
        <p>We thank our generous sponsors for their support.</p>
      </div>

      <div class="sponsors-grid">
        <div class="sponsor-card">
          <img src="/sponsor.png" alt="Sponsor" class="sponsor-image" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sponsors-grid {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.sponsor-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 200ms;
  width: 100%;
  max-width: 1000px;
}

.sponsor-card:hover {
  box-shadow: var(--shadow);
}

.sponsor-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}
</style>
