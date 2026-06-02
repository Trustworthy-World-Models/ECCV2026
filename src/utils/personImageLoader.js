const speakerImageModules = import.meta.glob('../assets/speaker/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default'
})

const organizerImageModules = import.meta.glob('../assets/organizer/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default'
})

const programCommitteeImageModules = import.meta.glob('../assets/program/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default'
})

const speakerImageMap = buildNameImageMap(speakerImageModules)
const organizerImageMap = buildNameImageMap(organizerImageModules)
const programCommitteeImageMap = buildNameImageMap(programCommitteeImageModules)
const preloadLinkSet = new Set()

function normalizeName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function fileNameFromPath(path) {
  const rawName = path.split('/').pop() || ''
  return rawName.replace(/\.[^.]+$/, '').trim()
}

function buildNameImageMap(modules) {
  const map = new Map()
  for (const [path, url] of Object.entries(modules)) {
    map.set(normalizeName(fileNameFromPath(path)), url)
  }
  return map
}

function scheduleIdleTask(task, timeout = 2500) {
  if (typeof window === 'undefined') return

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(task, { timeout })
    return
  }

  window.setTimeout(task, 200)
}

function canIdleWarmUp() {
  if (typeof navigator === 'undefined') return false
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!connection) return true
  if (connection.saveData) return false
  return !connection.effectiveType || /4g|wifi/i.test(connection.effectiveType)
}

function preloadLink(url, fetchPriority = 'low') {
  if (!url || preloadLinkSet.has(url) || typeof document === 'undefined') return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  link.fetchPriority = fetchPriority
  document.head.appendChild(link)
  preloadLinkSet.add(url)
}

function warmUpImage(url) {
  if (!url || typeof Image === 'undefined') return
  const img = new Image()
  img.decoding = 'async'
  img.fetchPriority = 'low'
  img.src = url
}

function warmUpInBatches(urls, batchSize = 2) {
  let pointer = 0

  const runBatch = () => {
    if (pointer >= urls.length) return
    const nextBatch = urls.slice(pointer, pointer + batchSize)
    pointer += batchSize

    for (const url of nextBatch) {
      preloadLink(url)
      warmUpImage(url)
    }

    scheduleIdleTask(runBatch)
  }

  runBatch()
}

function getImageUrls(list, getter) {
  return list.map((item) => getter(item.name)).filter(Boolean)
}

export function getSpeakerAvatar(name) {
  return speakerImageMap.get(normalizeName(name)) || ''
}

export function getOrganizerAvatar(name) {
  return organizerImageMap.get(normalizeName(name)) || ''
}

export function getProgramCommitteeAvatar(name) {
  return programCommitteeImageMap.get(normalizeName(name)) || ''
}

export function primePeopleImages(workshop) {
  if (!workshop) return

  const criticalUrls = [
    ...getImageUrls(workshop.speakers.slice(0, 2), getSpeakerAvatar),
    ...getImageUrls(workshop.organizers.slice(0, 2), getOrganizerAvatar),
    ...getImageUrls((workshop.programCommittee || []).slice(0, 1), getProgramCommitteeAvatar)
  ]
  const idleUrls = [
    ...getImageUrls(workshop.speakers.slice(2), getSpeakerAvatar),
    ...getImageUrls(workshop.organizers.slice(2), getOrganizerAvatar),
    ...getImageUrls((workshop.programCommittee || []).slice(1), getProgramCommitteeAvatar)
  ]

  for (const url of criticalUrls) {
    preloadLink(url, 'high')
    warmUpImage(url)
  }

  scheduleIdleTask(() => {
    if (!canIdleWarmUp()) return
    warmUpInBatches(idleUrls)
  })
}
