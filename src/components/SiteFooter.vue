<script setup>
defineProps({
  sections: { type: Array, required: true },
  workshop: { type: Object, required: true }
})
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h2>{{ workshop.fullTitle }}</h2>
        <p>{{ workshop.footer.sponsor }}</p>
        <p>
          Contact:
          <a :href="`mailto:${workshop.contactEmail}`">{{ workshop.contactEmail }}</a>
        </p>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">
          {{ section.label }}
        </a>
      </nav>

      <p class="footer-copy">{{ workshop.footer.copyright }}</p>
    </div>
  </footer>
</template>
