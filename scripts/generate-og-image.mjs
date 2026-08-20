/**
 * 生成静态 OG 预览图脚本
 * 运行: node scripts/generate-og-image.mjs
 */
import { createCanvas } from '@napi-rs/canvas'
import { writeFileSync } from 'fs'

// 尝试使用 canvas 生成，如果失败则创建一个简单的替代方案
async function generateOGImage() {
  const width = 1200
  const height = 630

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  // 背景渐变
  const grad = ctx.createLinearGradient(0, 0, 1200, 630)
  grad.addColorStop(0, '#0f172a')
  grad.addColorStop(0.5, '#1e3a5f')
  grad.addColorStop(1, '#1e40af')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1200, 630)

  // 装饰线
  ctx.fillStyle = '#f59e0b'
  ctx.fillRect(70, 86, 220, 6)

  // 文字
  ctx.font = '600 22px sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
  ctx.fillText('ECCV 2026 WORKSHOP', 70, 140)

  ctx.font = '900 58px sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('Safe World Models for', 70, 220)
  ctx.fillText('Trustworthy Embodied AI', 70, 285)

  ctx.font = '600 28px sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.fillText('September 9 (Morning), 2026 • Malmö, Sweden', 70, 350)

  ctx.font = '400 20px sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('World models for safety-critical embodied AI: predictive reliability,', 70, 420)
  ctx.fillText('stress-testing, uncertainty quantification, and safe deployment.', 70, 450)

  ctx.font = '600 18px sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillText('Best Paper Award • Runner-Up • Oral Presentation', 70, 520)

  // 底部
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
  ctx.fillRect(0, 570, 1200, 60)
  ctx.font = '600 18px sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('Call for Papers • Invited Speakers • Competition • Registration', 70, 605)

  const buffer = canvas.toBuffer('image/png')
  writeFileSync('public/social-preview.png', buffer)
  console.log('OG preview image generated: public/social-preview.png')
}

generateOGImage().catch(console.error)
