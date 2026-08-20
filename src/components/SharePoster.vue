<script setup>
/**
 * 分享海报组件
 * 用于 html2canvas 截取的海报 DOM 模板
 * 使用固定像素尺寸，确保渲染一致性
 */
import { onMounted, ref } from 'vue'
import { getSpeakerAvatar, getOrganizerAvatar } from '../utils/personImageLoader'
import QRCode from 'qrcode'

const props = defineProps({
  workshop: { type: Object, required: true }
})

const posterRef = ref(null)
const qrCodeDataUrl = ref('')
const sponsorDataUrl = ref('')

// 格式化日期为简短格式
function formatShortDate(dateStr) {
  if (!dateStr) return 'TBD'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// 生成 QR Code
async function generateQRCode() {
  try {
    const url = window.location.href
    qrCodeDataUrl.value = await QRCode.toDataURL(url, {
      width: 160,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
  } catch (e) {
    console.warn('QR Code 生成失败:', e)
  }
}

// 预加载赞助商图片为 DataURL 供 html2canvas 渲染
async function loadSponsorImage() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}sponsor.png`)
    const blob = await res.blob()
    const reader = new FileReader()
    reader.onloadend = () => {
      sponsorDataUrl.value = reader.result
    }
    reader.readAsDataURL(blob)
  } catch (e) {
    console.warn('Failed to load sponsor image:', e)
  }
}

onMounted(() => {
  generateQRCode()
  loadSponsorImage()
})

// 暴露 posterRef 给父组件
defineExpose({ posterRef })
</script>

<template>
  <!-- 海报容器：固定 1200x1800px，隐藏在视口外 -->
  <div ref="posterRef" class="share-poster">
    <!-- Hero 区域 -->
    <div class="poster-hero">
      <!-- 装饰元素 -->
      <div class="poster-hero-decoration">
        <div class="poster-deco-circle poster-deco-circle-1"></div>
        <div class="poster-deco-circle poster-deco-circle-2"></div>
        <div class="poster-deco-line poster-deco-line-1"></div>
        <div class="poster-deco-line poster-deco-line-2"></div>
      </div>

      <div class="poster-hero-content">
        <div class="poster-badge">ECCV 2026 WORKSHOP</div>
        <h1 class="poster-title">{{ workshop.fullTitle }}</h1>
        <div class="poster-meta">
          <span class="poster-meta-item">📅 {{ workshop.dateDisplay }}</span>
          <span class="poster-meta-item">📍 {{ workshop.location }}</span>
          <span class="poster-meta-item">🏛️ {{ workshop.format }}</span>
        </div>
        <div class="poster-awards">
          <span class="poster-award">🏆 Best Paper Award</span>
          <span class="poster-award">🏆 Best Paper Runner-Up</span>
          <span class="poster-award">🏆 Best Poster Award</span>
          <span class="poster-award">🎤 Oral Presentation</span>
        </div>
      </div>
    </div>

    <!-- Overview 区域 -->
    <div class="poster-section">
      <div class="poster-section-header">
        <div class="poster-section-bar"></div>
        <h2>Overview</h2>
      </div>
      <p class="poster-overview-text">
        {{ workshop.hero.description.substring(0, 350) }}...
      </p>
    </div>

    <!-- Topics 区域 -->
    <div class="poster-section">
      <div class="poster-section-header">
        <div class="poster-section-bar"></div>
        <h2>Topics</h2>
      </div>
      <div class="poster-topics-grid">
        <div
          v-for="topic in workshop.topicCategories"
          :key="topic.title"
          class="poster-topic-card"
        >
          <div class="poster-topic-number">{{ topic.number }}</div>
          <div class="poster-topic-title">{{ topic.title }}</div>
        </div>
      </div>
    </div>

    <!-- Important Dates 区域 -->
    <div class="poster-section">
      <div class="poster-section-header">
        <div class="poster-section-bar"></div>
        <h2>Important Dates</h2>
      </div>
      <div class="poster-dates">
        <div
          v-for="dateItem in workshop.importantDates"
          :key="dateItem.label"
          class="poster-date-row"
        >
          <span class="poster-date-label">{{ dateItem.label }}</span>
          <span class="poster-date-value">
            {{ dateItem.displayDate || formatShortDate(dateItem.date) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Invited Speakers 区域 -->
    <div class="poster-section">
      <div class="poster-section-header">
        <div class="poster-section-bar"></div>
        <h2>Invited Speakers</h2>
      </div>
      <div class="poster-speakers-grid">
        <div
          v-for="speaker in workshop.speakers"
          :key="speaker.name"
          class="poster-speaker-item"
        >
          <div class="poster-speaker-avatar">
            <div
              v-if="getSpeakerAvatar(speaker.name)"
              class="poster-avatar-img"
              :style="{ backgroundImage: `url(${getSpeakerAvatar(speaker.name)})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
            ></div>
            <span v-else class="poster-avatar-initials">{{ speaker.initials }}</span>
          </div>
          <div class="poster-speaker-name">{{ speaker.name }}</div>
          <div class="poster-speaker-affiliation">{{ speaker.affiliation.split(',')[0] }}</div>
        </div>
      </div>
    </div>

    <!-- Organizers 区域 -->
    <div class="poster-section">
      <div class="poster-section-header">
        <div class="poster-section-bar"></div>
        <h2>Organizers</h2>
      </div>
      <div class="poster-organizers-grid">
        <div
          v-for="org in workshop.organizers"
          :key="org.name"
          class="poster-organizer-item"
        >
          <div class="poster-organizer-avatar">
            <div
              v-if="getOrganizerAvatar(org.name)"
              class="poster-org-avatar-img"
              :style="{ backgroundImage: `url(${getOrganizerAvatar(org.name)})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
            ></div>
            <span v-else class="poster-org-initials">{{ org.initials }}</span>
          </div>
          <div class="poster-organizer-name">{{ org.name }}</div>
          <div class="poster-organizer-aff">{{ org.affiliation.split(',')[0] }}</div>
        </div>
      </div>
    </div>

    <!-- Sponsors 区域 -->
    <div class="poster-section" v-if="sponsorDataUrl">
      <div class="poster-section-header">
        <div class="poster-section-bar"></div>
        <h2>Sponsors</h2>
      </div>
      <div style="width: 100%; display: flex; justify-content: center;">
        <img :src="sponsorDataUrl" alt="Sponsor" style="width: 100%; max-width: 1000px; height: auto; display: block; object-fit: contain;" />
      </div>
    </div>

    <!-- Contact 区域 -->
    <div class="poster-footer">
      <div class="poster-footer-left">
        <div class="poster-section-header">
          <div class="poster-section-bar poster-section-bar-light"></div>
          <h2 class="poster-footer-heading">Contact</h2>
        </div>
        <div class="poster-contact-info">
          <div class="poster-contact-row">📧 {{ workshop.contactEmail }}</div>
          <div class="poster-contact-row">🏠 {{ workshop.hostInstitution }}</div>
          <div class="poster-contact-row">🔬 {{ workshop.hostLab }}</div>
        </div>
      </div>
      <div class="poster-footer-right">
        <img v-if="qrCodeDataUrl" :src="qrCodeDataUrl" alt="QR Code" class="poster-qr" />
        <div class="poster-qr-label">Scan for details</div>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="poster-copyright">
      {{ workshop.footer.copyright }}
    </div>
  </div>
</template>
