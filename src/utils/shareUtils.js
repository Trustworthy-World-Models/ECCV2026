/**
 * 分享文案生成工具
 * 根据 workshop 数据生成不同平台的分享文案
 */

/**
 * 生成 X (Twitter) 分享文案
 * @param {Object} workshop - workshop 数据
 * @param {string} url - 当前页面 URL
 * @returns {string} 分享文案
 */
export function generateXShareText(workshop, url) {
  const speakers = workshop.speakers
    .slice(0, 4)
    .map((s) => s.name)
    .join(', ')

  return [
    `🔬 ${workshop.fullTitle}`,
    '',
    `📅 ${workshop.dateDisplay}`,
    `📍 ${workshop.location}`,
    `🏛️ ${workshop.conference}`,
    '',
    `🎤 Invited Speakers: ${speakers} & more`,
    '',
    `🔗 ${url}`,
    '',
    '#ECCV2026 #ComputerVision #EmbodiedAI #WorldModels #SafeAI'
  ].join('\n')
}

/**
 * 生成 LinkedIn 分享文案
 * @param {Object} workshop - workshop 数据
 * @param {string} url - 当前页面 URL
 * @returns {string} 分享文案
 */
export function generateLinkedInShareText(workshop, url) {
  const speakers = workshop.speakers.map((s) => `${s.name} (${s.affiliation})`).join('\n• ')

  const topics = workshop.topicCategories.map((t) => t.title).join(', ')

  return [
    `🔬 Excited to share: ${workshop.fullTitle}`,
    '',
    `📅 ${workshop.dateDisplay} | 📍 ${workshop.location}`,
    `🏛️ ${workshop.conference}`,
    '',
    `📌 Topics: ${topics}`,
    '',
    `🎤 Invited Speakers:`,
    `• ${speakers}`,
    '',
    `📝 Paper Submission Deadline: ${formatDate(workshop.importantDates[0]?.date)}`,
    '',
    `🔗 More details: ${url}`,
    '',
    '#ECCV2026 #ComputerVision #EmbodiedAI #WorldModels #SafeAI #MachineLearning'
  ].join('\n')
}

/**
 * 生成邮件分享内容
 * @param {Object} workshop - workshop 数据
 * @param {string} url - 当前页面 URL
 * @returns {{ subject: string, body: string }} 邮件主题和正文
 */
export function generateEmailContent(workshop, url) {
  const subject = `${workshop.fullTitle} @ ECCV 2026`

  const body = [
    `Hi,`,
    '',
    `I'd like to share this ECCV 2026 workshop with you:`,
    '',
    `${workshop.fullTitle}`,
    `${workshop.dateDisplay} | ${workshop.location}`,
    '',
    `${workshop.hero.description.substring(0, 300)}...`,
    '',
    `More details: ${url}`,
    '',
    `Best regards`
  ].join('\n')

  return { subject, body }
}

/**
 * 格式化日期字符串
 * @param {string} dateStr - ISO 日期字符串
 * @returns {string} 格式化后的日期
 */
function formatDate(dateStr) {
  if (!dateStr) return 'TBD'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否成功
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 降级方案：使用 textarea
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      return true
    } catch {
      return false
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

/**
 * 获取 X (Twitter) 发帖 URL
 * @param {string} text - 预填文案
 * @returns {string} URL
 */
export function getXPostUrl(text) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}

/**
 * 获取 LinkedIn 分享 URL
 * @param {string} url - 要分享的链接
 * @returns {string} URL
 */
export function getLinkedInShareUrl(url) {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
}
