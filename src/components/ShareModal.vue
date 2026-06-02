<script setup>
/**
 * 分享弹窗组件
 * 展示海报预览 + 分享文案，支持一键复制并跳转对应平台
 */
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import html2canvas from 'html2canvas'
import SharePoster from './SharePoster.vue'
import {
  generateXShareText,
  generateLinkedInShareText,
  generateEmailContent,
  copyToClipboard,
  getXPostUrl,
  getLinkedInShareUrl
} from '../utils/shareUtils'

const props = defineProps({
  visible: { type: Boolean, default: false },
  workshop: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const posterComponent = ref(null)
const posterImageUrl = ref('')
const isGenerating = ref(false)
const copySuccess = ref('')
const shareUrl = ref('')

// 当前选中的平台 tab
const activePlatform = ref('x')

// 平台配置
const platforms = [
  { key: 'x', label: 'X (Twitter)', icon: '𝕏', color: '#000000' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'in', color: '#0A66C2' },
  { key: 'email', label: 'Email', icon: '✉', color: '#64748b' }
]

// 根据当前平台生成对应文案
const currentShareText = computed(() => {
  if (activePlatform.value === 'x') {
    return generateXShareText(props.workshop, shareUrl.value)
  }
  if (activePlatform.value === 'linkedin') {
    return generateLinkedInShareText(props.workshop, shareUrl.value)
  }
  if (activePlatform.value === 'email') {
    const { subject, body } = generateEmailContent(props.workshop, shareUrl.value)
    return `Subject: ${subject}\n\n${body}`
  }
  return ''
})

// 获取跳转 URL
const platformUrl = computed(() => {
  if (activePlatform.value === 'x') {
    return getXPostUrl(currentShareText.value)
  }
  if (activePlatform.value === 'linkedin') {
    return getLinkedInShareUrl(shareUrl.value)
  }
  if (activePlatform.value === 'email') {
    const { subject, body } = generateEmailContent(props.workshop, shareUrl.value)
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return '#'
})

// 生成海报图片
async function generatePosterImage() {
  if (!posterComponent.value?.posterRef || isGenerating.value) return
  isGenerating.value = true

  try {
    await nextTick()
    // 等待图片加载
    await waitForImages(posterComponent.value.posterRef)

    const canvas = await html2canvas(posterComponent.value.posterRef, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#0f172a',
      logging: false
    })
    posterImageUrl.value = canvas.toDataURL('image/png')
  } catch (e) {
    console.error('海报生成失败:', e)
  } finally {
    isGenerating.value = false
  }
}

// 等待海报内所有图片加载完成
function waitForImages(container) {
  const images = container.querySelectorAll('img')
  const promises = Array.from(images).map(
    (img) =>
      new Promise((resolve) => {
        if (img.complete) {
          resolve()
        } else {
          img.onload = resolve
          img.onerror = resolve
        }
      })
  )
  return Promise.all(promises)
}

// 下载海报
function downloadPoster() {
  if (!posterImageUrl.value) return
  const link = document.createElement('a')
  link.download = `${props.workshop.title}-ECCV2026-poster.png`
  link.href = posterImageUrl.value
  link.click()
}

// 复制文案
async function copyShareText() {
  const success = await copyToClipboard(currentShareText.value)
  if (success) {
    copySuccess.value = 'text'
    setTimeout(() => {
      copySuccess.value = ''
    }, 2000)
  }
}

// 复制文案并跳转平台
async function copyAndJump() {
  const success = await copyToClipboard(currentShareText.value)
  if (success) {
    copySuccess.value = 'jump'
    setTimeout(() => {
      copySuccess.value = ''
      window.open(platformUrl.value, '_blank')
    }, 800)
  } else {
    window.open(platformUrl.value, '_blank')
  }
}

// 关闭弹窗
function closeModal() {
  emit('close')
}

// ESC 关闭
function handleKeydown(e) {
  if (e.key === 'Escape' && props.visible) {
    closeModal()
  }
}

// 监听弹窗打开，自动生成海报
watch(
  () => props.visible,
  async (val) => {
    if (val) {
      shareUrl.value = window.location.href
      await nextTick()
      // 延迟生成，确保 DOM 已渲染
      setTimeout(() => {
        generatePosterImage()
      }, 300)
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="share-modal-overlay" @click.self="closeModal">
        <div class="share-modal">
          <!-- 弹窗头部 -->
          <div class="share-modal-header">
            <h3>📤 Share This Workshop</h3>
            <button class="share-modal-close" @click="closeModal" aria-label="Close">✕</button>
          </div>

          <!-- 弹窗内容 -->
          <div class="share-modal-body">
            <!-- 左侧：海报预览 -->
            <div class="share-modal-preview">
              <div v-if="isGenerating" class="share-modal-loading">
                <div class="share-loading-spinner"></div>
                <span>Generating poster...</span>
              </div>
              <img
                v-else-if="posterImageUrl"
                :src="posterImageUrl"
                alt="Workshop Share Poster"
                class="share-modal-poster-img"
              />
              <div v-else class="share-modal-loading">
                <span>Preparing poster...</span>
              </div>

              <!-- 下载按钮 -->
              <button
                class="share-download-btn"
                :disabled="!posterImageUrl || isGenerating"
                @click="downloadPoster"
              >
                📥 Download Poster
              </button>
            </div>

            <!-- 右侧：文案 + 操作 -->
            <div class="share-modal-actions">
              <!-- 平台切换 Tab -->
              <div class="share-platform-tabs">
                <button
                  v-for="p in platforms"
                  :key="p.key"
                  :class="['share-platform-tab', { active: activePlatform === p.key }]"
                  @click="activePlatform = p.key"
                >
                  <span class="share-tab-icon" :style="{ background: p.color }">{{ p.icon }}</span>
                  {{ p.label }}
                </button>
              </div>

              <!-- 文案预览 -->
              <div class="share-text-preview">
                <div class="share-text-label">
                  <span>Share Text</span>
                  <button class="share-copy-text-btn" @click="copyShareText">
                    <template v-if="copySuccess === 'text'">✅ Copied!</template>
                    <template v-else>📋 Copy Text</template>
                  </button>
                </div>
                <pre class="share-text-content">{{ currentShareText }}</pre>
              </div>

              <!-- 操作提示 -->
              <div class="share-hint">
                <template v-if="activePlatform === 'email'">
                  💡 Click the button below to open your email client with the pre-filled content.
                </template>
                <template v-else>
                  💡 Click the button below to copy the share text and jump to {{ activePlatform === 'x' ? 'X (Twitter)' : 'LinkedIn' }}. Paste the text and attach the downloaded poster image to your post.
                </template>
              </div>

              <!-- 跳转按钮 -->
              <button
                class="share-jump-btn"
                :style="{ background: platforms.find(p => p.key === activePlatform)?.color }"
                @click="copyAndJump"
              >
                <template v-if="copySuccess === 'jump'">✅ Text Copied! Redirecting...</template>
                <template v-else-if="activePlatform === 'email'">
                  ✉ Open Email Client
                </template>
                <template v-else>
                  📋 Copy Text & Open {{ activePlatform === 'x' ? 'X' : 'LinkedIn' }}
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- 海报模板（隐藏在视口外供截取） -->
    <SharePoster
      v-if="visible"
      ref="posterComponent"
      :workshop="workshop"
    />
  </Teleport>
</template>
