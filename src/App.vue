<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import CallForPapers from './components/CallForPapers.vue'
import ScheduleSection from './components/ScheduleSection.vue'
import SpeakersSection from './components/SpeakersSection.vue'
import OrganizersSection from './components/OrganizersSection.vue'
import CompetitionSection from './components/CompetitionSection.vue'
import PanelSection from './components/PanelSection.vue'
import RegistrationSection from './components/RegistrationSection.vue'
import SponsorSection from './components/SponsorSection.vue'
import ContactFaqSection from './components/ContactFaqSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import ShareModal from './components/ShareModal.vue'
import { workshopData } from './data/workshopData'
import { primePeopleImages } from './utils/personImageLoader'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'cfp', label: 'Call for Papers' },
  { id: 'registration', label: 'Attend' },
  { id: 'program', label: 'Schedule' },
  { id: 'speakers', label: 'Speakers' },
  { id: 'competition', label: 'Competition' },
  { id: 'organizers', label: 'Organizers' },
  { id: 'contact', label: 'Contact' },
  { id: 'sponsors', label: 'Sponsors' }
]

const headerSections = sections.filter((section) => !['about', 'sponsors'].includes(section.id))

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const shareModalVisible = ref(false)

const pageTitle = computed(() => `${workshopData.fullTitle} @ ECCV 2026`)
const pageDescription = computed(
  () =>
    `ECCV 2026 Workshop on ${workshopData.fullTitle}. ${workshopData.dateDisplay}, ${workshopData.location}.`
)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function handleScroll() {
  isScrolled.value = window.scrollY > 16
}

function injectStructuredData() {
  const existing = document.getElementById('structured-data')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.id = 'structured-data'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: workshopData.fullTitle,
    description: pageDescription.value,
    startDate: '2026-09-09T08:30:00+02:00',
    endDate: '2026-09-09T13:10:00+02:00',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'ECCV 2026',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Malmö',
        addressCountry: 'Sweden'
      }
    },
    organizer: workshopData.organizers.map((o) => ({
      '@type': 'Person',
      name: o.name,
      affiliation: o.affiliation
    })),
    superEvent: {
      '@type': 'Event',
      name: workshopData.conference
    }
  })
  document.head.appendChild(script)
}

onMounted(() => {
  document.title = pageTitle.value
  const descriptionTag = document.querySelector('meta[name="description"]')
  if (descriptionTag) descriptionTag.setAttribute('content', pageDescription.value)
  injectStructuredData()
  primePeopleImages(workshopData)
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="site-shell">
    <SiteHeader
      :workshop="workshopData"
      :sections="headerSections"
      :mobile-menu-open="mobileMenuOpen"
      :is-scrolled="isScrolled"
      @close-menu="closeMobileMenu"
      @toggle-menu="toggleMobileMenu"
    />

    <main>
      <HeroSection id="about" :workshop="workshopData" />
      <CallForPapers id="cfp" :workshop="workshopData" />
      <RegistrationSection id="registration" :workshop="workshopData" />
      <ScheduleSection id="program" :workshop="workshopData" />
      <SpeakersSection id="speakers" :workshop="workshopData" />
      <CompetitionSection id="competition" :workshop="workshopData" />
      <PanelSection id="panel" :workshop="workshopData" />
      <OrganizersSection id="organizers" :workshop="workshopData" />
      <ContactFaqSection
        id="contact"
        :workshop="workshopData"
        @open-share="shareModalVisible = true"
      />
      <SponsorSection id="sponsors" :workshop="workshopData" />
    </main>

    <SiteFooter :sections="sections" :workshop="workshopData" />

    <!-- 分享弹窗 -->
    <ShareModal
      :visible="shareModalVisible"
      :workshop="workshopData"
      @close="shareModalVisible = false"
    />
  </div>
</template>
