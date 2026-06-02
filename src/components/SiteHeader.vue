<script setup>
defineProps({
  workshop: { type: Object, required: true },
  sections: { type: Array, required: true },
  mobileMenuOpen: { type: Boolean, required: true },
  isScrolled: { type: Boolean, required: true }
})

defineEmits(['toggle-menu', 'close-menu'])
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="container nav-wrap">
      <a class="brand" href="#about" @click="$emit('close-menu')">
        <span class="brand-badge">ECCV 2026</span>
        <span>{{ workshop.title }}</span>
      </a>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <a v-for="section in sections" :key="section.id" :href="`#${section.id}`">
          {{ section.label }}
        </a>
      </nav>

      <button
        class="menu-button"
        type="button"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle menu"
        @click="$emit('toggle-menu')"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <transition name="menu-fade">
      <nav v-if="mobileMenuOpen" class="mobile-nav container" aria-label="Mobile navigation">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          @click="$emit('close-menu')"
        >
          {{ section.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>
