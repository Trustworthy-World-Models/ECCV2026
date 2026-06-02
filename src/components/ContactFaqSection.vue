<script setup>
/**
 * 联系方式 & FAQ 区域
 * 包含分享弹窗的触发逻辑
 */
const props = defineProps({
  workshop: { type: Object, required: true }
})

const emit = defineEmits(['open-share'])

// 触发分享弹窗
function openShare() {
  emit('open-share')
}
</script>

<template>
  <section class="section">
    <div class="container contact-grid">
      <div class="contact-top-row">
        <div class="card" style="flex-grow: 1;">
          <p class="eyebrow">Contact</p>
          <h2>Get in Touch</h2>
          <p>
            For submission questions, sponsorship inquiries, or program updates, contact the
            lead organizer directly.
          </p>
          <a class="contact-email" :href="`mailto:${props.workshop.contactEmail}`">
            {{ props.workshop.contactEmail }}
          </a>

          <div class="share-links">
            <button class="share-link-btn" @click="openShare">
              <span class="share-link-icon share-link-icon-x">𝕏</span>
              Share on X
            </button>
            <button class="share-link-btn" @click="openShare">
              <span class="share-link-icon share-link-icon-linkedin">in</span>
              Share on LinkedIn
            </button>
            <button class="share-link-btn" @click="openShare">
              <span class="share-link-icon share-link-icon-email">✉</span>
              Share by Email
            </button>
          </div>
        </div>

        <div v-if="props.workshop.updatesPanel.items.length > 0" class="card updates-card">
          <p class="eyebrow">{{ props.workshop.updatesPanel.eyebrow }}</p>
          <h2>{{ props.workshop.updatesPanel.title }}</h2>
          <p>{{ props.workshop.updatesPanel.summary }}</p>
          <ul class="updates-list" :aria-label="props.workshop.updatesPanel.title">
            <li
              v-for="(item, index) in props.workshop.updatesPanel.items"
              :key="item.label"
              tabindex="0"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="updates-copy">
                <strong>{{ item.label }}</strong>
                <p>{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="card card-span">
        <p class="eyebrow">FAQ</p>
        <h2>Frequently Asked Questions</h2>
        <div class="faq-list">
          <details v-for="item in props.workshop.faqs" :key="item.question" class="faq-item">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>
