export const workshopData = {
  // 全站基础信息：用于页面标题、顶部导航/页脚、Hero 首屏、SEO 结构化数据等公共位置。
  title: 'SafeWorldModels',
  fullTitle: 'Safe World Models for Trustworthy Embodied AI',
  subtitle: 'ECCV 2026 Workshop',
  eventLabel: 'Workshop at ECCV 2026',
  conference: 'European Conference on Computer Vision (ECCV 2026)',
  location: 'Malmö, Sweden',
  dateDisplay: 'September 9 (Morning), 2026',

  // 日程区块：ScheduleSection.vue 顶部日期、时区，以及日程表时间展示。
  scheduleDate: 'September 9 (Morning), 2026',
  scheduleTimezone: 'CEST',

  // 联系区块：ContactFaqSection.vue 左侧联系卡片中的邮箱。
  contactEmail: 'd.zhang17@imperial.ac.uk',

  // 联系区块：ContactFaqSection.vue 右侧 Updates 信息卡。
  // items[].label 是默认展示的短标题，items[].description 会在 hover/focus 时展开。
  updatesPanel: {
    eyebrow: 'Updates',
    title: 'Latest Information',
    summary:
      'Important dates, speaker announcements, and competition updates will be posted on this workshop site.',
    items: [
      {
        label: 'Program announcements',
        description:
          'Session details, invited talk titles, and panel updates will be added as the workshop program is finalized.'
      },
      {
        label: 'Submission and camera-ready deadlines',
        description:
          'Deadline changes and author instructions will be reflected here alongside the official important dates.'
      },
      {
        label: 'Competition schedule updates',
        description:
          'Simulation, real-world evaluation, and winner announcement timing will be updated as the competition progresses.'
      }
    ]
  },

  // 主办信息：Hero/Footer 等位置展示机构与实验室信息。
  hostInstitution: 'Imperial College London',
  hostLab: 'Multi-Scale Embodied Intelligence (MSEI) Lab',
  hostLabUrl: 'https://www.intelligentrobotics-acrossscales.com/',
  format: 'Half-day hybrid event',

  // Hero 首屏按钮：cta 是主按钮，secondaryCta 是次按钮。
  cta: {
    label: 'Call for Papers',
    href: '#cfp'
  },
  secondaryCta: {
    label: 'Competition',
    href: '#competition'
  },

  // 外部/锚点链接：RegistrationSection.vue、CallForPapers.vue、页脚等会复用。
  links: {
    registration: '#',
    submission: 'https://openreview.net/group?id=thecvf.com/ECCV/2026/Workshop/TEAI&referrer=%5BHomepage%5D(%2F)#tab-your-consoles',
    template: '#',
    conference: 'https://eccv.ecva.net/'
  },

  // HeroSection.vue：首屏介绍文字。
  hero: {
    description:
      'This workshop centers on world models — learned dynamical representations that enable structured latent simulation of future visual and physical states. We focus on their safety-critical implications through two complementary roles: (i) Predictive Reliability in Agents, where world models enable internal simulation prior to execution for hazard anticipation and risk-aware decisions; and (ii) Safety-Critical Evaluation and Generation, where world models serve as generative engines for stress-testing through corner-case synthesis. The workshop brings together researchers in computer vision, robotics, and control to advance uncertainty-aware, physically consistent world models for high-stakes domains such as autonomous driving, biomedical robotics, and human-robot collaboration.'
  },

  // HeroSection.vue：首屏奖项/亮点徽章。
  awards: [
    { icon: 'trophy', label: 'Best Paper Award' },
    { icon: 'trophy', label: 'Best Paper Runner-Up' },
    { icon: 'trophy', label: 'Best Poster Award' },
    { icon: 'mic', label: 'Oral Presentation' }
  ],

  // CallForPapers.vue：征稿主题分类与每类下的 topic 列表。
  topicCategories: [
    {
      title: 'World Models & Embodied AI',
      number: '1',
      topics: [
        'World models for embodied agents: latent dynamics, simulators, and forward/counterfactual rollouts',
        'World Model as policy RL environment',
        'Physical consistency in latent models: geometry, object permanence, and long-horizon stability',
        'Detecting and mitigating physical hallucinations in learned simulators',
        'World models for contact-rich manipulation and embodied interaction'
      ]
    },
    {
      title: 'Safety & Uncertainty',
      number: '2',
      topics: [
        'Safety-critical planning with world models: risk-aware decision making and collision avoidance',
        'Uncertainty quantification and calibration of predictive dynamics',
        'Safety validation and stress testing for real-world robot deployment',
        'Counterfactual reasoning and planning'
      ]
    },
    {
      title: 'Generative Evaluation',
      number: '3',
      topics: [
        'Generative world models for corner-case synthesis and stress testing',
        'Adversarial scenario generation for autonomy and robustness evaluation',
        'Hybrid evaluation pipelines: integrating simulators (e.g., CARLA) with learned world models'
      ]
    },
    {
      title: 'Benchmarks & Applications',
      number: '4',
      topics: [
        'Benchmarks, metrics, and datasets for safe world-model evaluation',
        'Applications in autonomous driving, industrial automation, and human-robot collaboration',
        'Sim-to-real and real-to-sim validation',
        'Uncertainty-aware predictive modeling'
      ]
    }
  ],

  // CallForPapers.vue：投稿格式、评审方式、录用展示数量等信息卡。
  submissionInfo: {
    format: 'ECCV workshop template',
    templateUrl: 'https://www.overleaf.com/read/fkngkknmbycc#8e2acb',
    fullPaperSubmission: 'Up to 14 pages, excluding references. Accepted papers will be included in the proceedings, listed separately, and presented as A1 posters.',
    posterPaperSubmission: '2–6 pages. These will be presented only as A1 posters.',
    review: 'Double-blind peer review',
  },

  // CallForPapers.vue / RegistrationSection.vue：重要日期列表，date 使用 ISO 字符串便于倒计时和排序。
  importantDates: [
    { label: 'Paper Submission Deadline', date: '2026-07-15T23:59:59' },
    { label: 'Notification of Acceptance', date: '2026-08-05T23:59:59' },
    { label: 'Camera-Ready Deadline', date: '2026-08-12T23:59:59' },
    {
      label: 'Workshop Date',
      date: '2026-09-09T09:00:00',
      displayDate: 'September 9 (Morning), 2026'
    }
  ],

  // ScheduleSection.vue：会议日程表。talkTitle 为空或 TBD 时按组件逻辑弱化展示。
  schedule: [
    { time: '08:30–08:40', title: 'Introduction and Opening Remarks', speaker: 'Workshop Chairs' },
    { time: '08:40–09:00', title: 'Invited Talk 1', speaker: 'Jiajun Wu, Stanford University', talkTitle: 'TBD' },
    { time: '09:00–09:20', title: 'Invited Talk 2', speaker: 'Sergio Valcarcel Macua, Microsoft', talkTitle: 'TBD' },
    { time: '09:20–10:50', title: 'Oral Presentations', speaker: '6 accepted papers, 15 min each incl. Q&A' },
    { time: '10:50–11:10', title: 'Coffee Break & Poster Viewing', speaker: '' },
    { time: '11:10–11:30', title: 'Invited Talk 3', speaker: 'Rudra Poudel, Toshiba Europe', talkTitle: 'Local World Models: Adapting Foundation Models for X' },
    { time: '11:30–11:50', title: 'Invited Talk 4', speaker: 'Abhinav Valada, University of Freiburg', talkTitle: 'Open-World Embodied Intelligence: Learning from Perception to Action' },
    { time: '11:50–12:35', title: 'Panel Discussion', speaker: 'From Synthesis to Deployment: Bridging Academic and Industry Focuses on World Models' },
    { time: '12:35–12:45', title: 'Competition Winner Announcement', speaker: '' },
    { time: '12:45–13:05', title: 'Online Invited Talk', speaker: 'Sergey Levine, UC Berkeley', talkTitle: 'TBD' },
    { time: '13:05–13:10', title: 'Closing Remarks', speaker: '' }
  ],

  // ScheduleSection.vue: venue-wide ECCV logistics displayed below the workshop program.
  conferenceSchedule: [
    { time: '8:00 - 17:00', event: 'Registration / Badge Pickup', location: 'Malmo Arena Lobby' },
    { time: '8:00 - 17:00', event: "Mother's Room", location: 'tbd' },
    { time: '8:00 - 17:00', event: 'Quiet Room', location: 'tbd' },
    { time: '8:00 - 17:00', event: 'Prayer Room', location: 'tbd' },
    { time: 'tbd', event: 'Poster Pickup', location: 'tbd' },
    { time: '8:00 - 18:00', event: 'WORKSHOPS / TUTORIALS', location: 'tbd' },
    { time: '8:00 - 18:00', event: 'Posters', location: 'Malmo Massan Exhibit Hall' },
    { time: '10:00 - 11:00', event: 'Coffee Break', location: 'Malmo Massan Exhibit Hall' },
    { time: '12:00 - 13:45', event: 'Lunch', location: 'Malmo Arena - Arena Room' },
    { time: '15:00 - 16:00', event: 'Coffee Break', location: 'Malmo Massan Exhibit Hall' }
  ],

  // SpeakersSection.vue：邀请嘉宾卡片。头像图片由 name 字段匹配本地 assets/person 文件。
  speakers: [
    {
      name: 'Sergey Levine',
      affiliation: 'UC Berkeley, USA',
      area: 'Reinforcement Learning; Robot Learning',
      talkTitle: 'TBD',
      initials: 'SL',
      bio: 'Associate Professor at UC Berkeley, leads the Robotic AI & Learning (RAIL) Lab. 200k+ Google Scholar citations.'
    },
    {
      name: 'Jiajun Wu',
      affiliation: 'Stanford University, USA',
      area: 'Computer Vision; World Models',
      talkTitle: 'TBD',
      initials: 'JW',
      bio: 'Assistant Professor of Computer Science at Stanford. Research spans computer vision, robotics, and computational cognitive science.'
    },
    {
      name: 'Sergio Valcarcel Macua',
      affiliation: 'Microsoft Research, UK',
      area: 'Robotics; Embodied AI',
      talkTitle: 'TBD',
      initials: 'SM',
      bio: 'Principal Research Scientist at Microsoft Research (Cambridge). Focuses on world models, reinforcement learning, and representation learning.'
    },
    {
      name: 'Abhinav Valada',
      affiliation: 'University of Freiburg, Germany',
      area: 'Robotics; Autonomous Systems',
      talkTitle: 'Open-World Embodied Intelligence: Learning from Perception to Action',
      initials: 'AV',
      bio: 'Full Professor at University of Freiburg, directs the Robot Learning Lab. DFG Emmy Noether AI Fellow.'
    },
    {
      name: 'Rudra P.K. Poudel',
      affiliation: 'Toshiba Europe, UK',
      area: 'Machine Learning; Computer Vision; Robotics',
      talkTitle: 'Local World Models: Adapting Foundation Models for X',
      initials: 'RP',
      bio: 'Lead AI Scientist at Toshiba Europe (Cambridge). Over 20 years of academic and industrial research experience.'
    },
    {
      name: 'Hongyang Li',
      affiliation: 'University of Hong Kong, China',
      area: 'Computer Vision; Embodied AI',
      talkTitle: 'TBD',
      initials: 'HL',
      bio: 'Assistant Professor at HKU, founder of OpenDriveLab. Led the UniAD project (CVPR 2023 Best Paper).'
    },
    {
      name: 'Ingmar Posner',
      affiliation: 'University of Oxford, UK',
      area: 'Robotics; Embodied AI',
      talkTitle: 'TBD',
      initials: 'IP',
      bio: 'Professor at University of Oxford, founding Deputy Director of the Oxford Robotics Institute. Co-founded Oxbotica.'
    },
    {
      name: 'Ding Zhao',
      affiliation: 'Carnegie Mellon University, USA',
      area: 'Reinforcement Learning; Trustworthy AI',
      talkTitle: 'TBD',
      initials: 'DZ',
      bio: 'Associate Professor at CMU, leads the Safe AI Laboratory. Focuses on trustworthy and safety-critical AI.'
    }
  ],

  // PanelSection.vue：圆桌讨论标题、简介和引导问题。
  panelDiscussion: {
    title: 'From Synthesis to Deployment: Bridging Academic and Industry Focuses on World Models',
    description: 'A moderated panel bridging the gap between academic advances in world-model synthesis and industry requirements for deployment.',
    questions: [
      'Where is the gap between academic advances in generative world models and the reliability requirements of real-world deployment?',
      'What are the most deployment-critical failure modes, and how should academia and industry jointly measure and report them?',
      'How can synthetic data generation and corner-case modeling meaningfully reduce real-world risk?',
      'How should we design stress tests and corner-case generation to reflect real operational risks?',
      'What shared benchmarks, evaluation protocols, and reporting standards are needed for high-stakes applications?'
    ]
  },

  // CompetitionSection.vue：竞赛介绍、阶段卡片和时间线。
  competition: {
    title: 'Embodied World (Action) Model Evaluation',
    description: 'A two-phase competition with a simulation phase and a real-world phase, focusing on the evaluation of embodied AI world (action) models. The simulation evaluation is expected to begin in June, while the real-world evaluation is expected to begin in mid-July. The final score will be computed as a weighted combination of the simulation and real-world evaluation results.',
    entryUrl: 'https://robodojo-benchmark.com/eccv-2026-safeworldmodels-challenge',
    phases: [
      {
        title: 'Simulation Evaluation',
        description: 'Based on the RoboDojo platform, participants will conduct simulation-based evaluations with support for cloud-based evaluation.'
      },
      {
        title: 'Real-World Evaluation',
        description: 'Participants will conduct real-robot evaluations, also with support for cloud-based evaluation.'
      }
    ],
    timeline: [
      { label: 'Registration Start', date: 'Jun. 20th' },
      { label: 'Simulation Code Release', date: 'Before Jun. 25th' },
      { label: 'Simulation Submission Start', date: 'Jul. 1st' },
      { label: 'Real-World Submission Start', date: 'Aug. 1st' },
      { label: 'Challenge End', date: 'Sep. 1st' },
    ]
  },

  // OrganizersSection.vue：组织者卡片。email 为空时通常不展示邮箱入口。
  organizers: [
    { name: 'Dandan Zhang', affiliation: 'Imperial College London, UK', email: 'd.zhang17@imperial.ac.uk', area: 'Embodied Intelligence, Human-Robot Interaction, Medical Robotics', initials: 'DZ', role: 'Lead Organizer' },
    { name: 'Haibao Yu', affiliation: 'Carnegie Mellon University, USA', email: '', area: 'Spatial Intelligence, Generative Simulation, Embodied AI', initials: 'HY', role: 'Co-Organizer' },
    { name: 'Jianing Qiu', affiliation: 'Mohamed bin Zayed University of AI, UAE', email: '', area: 'Foundation Models, Agents, Human-AI Interaction', initials: 'JQ', role: 'Co-Organizer' },
    { name: 'Jiankai Sun', affiliation: 'Stanford University, USA', email: '', area: 'Embodied AI, Multimodal LLMs, World Models', initials: 'JS', role: 'Co-Organizer' },
    { name: 'Weitao Zhou', affiliation: 'Tsinghua University, China', email: '', area: 'Autonomous Driving, RL, Safety-Critical Planning', initials: 'WZ', role: 'Co-Organizer' },
    { name: 'Tianxing Chen', affiliation: 'The University of Hong Kong, China', email: '', area: 'Embodied AI, Robot Foundation Models, Manipulation', initials: 'TC', role: 'Co-Organizer' },
    { name: 'Ping Luo', affiliation: 'The University of Hong Kong, China', email: '', area: 'Vision-Language Models, Autonomous Driving', initials: 'PL', role: 'Co-Organizer' },
    { name: 'Lan Wei', affiliation: 'Imperial College London, UK', email: '', area: 'Diffusion-based Image Generation, VLA Models', initials: 'LW', role: 'Co-Organizer' },
    { name: 'Wen Fan', affiliation: 'Imperial College London, UK', email: '', area: 'Vision-based Tactile Sensing, Multimodal Robotic Manipulation', initials: 'WF', role: 'Co-Organizer' },
    { name: 'Wenhao Ding', affiliation: 'NVIDIA Research, USA', email: '', area: 'Safety Validation, RL, Closed-loop Simulation', initials: 'WD', role: 'Co-Organizer' },
    { name: 'Haohong Lin', affiliation: 'Tesla, USA', email: '', area: 'RL, Foundation Model Reasoning, Autonomous Systems', initials: 'HL', role: 'Co-Organizer' },
    { name: 'Lei Yang', affiliation: 'Nanyang Technological University, Singapore', email: '', area: 'Cooperative Autonomous Driving, Scalable World Models', initials: 'LY', role: 'Co-Organizer' }
  ],

  programCommittee: [
    { name: 'Bowen Jing', affiliation: 'Tuojing AI, China', initials: 'BJ' },
    { name: 'Chenchen Ge', affiliation: 'Southeast University, China', initials: 'CG' },
    { name: 'Ziying Song', affiliation: 'Nanyang Technological University, Singapore', initials: 'ZS' },
    { name: 'Qi Song', affiliation: 'Tsinghua University, China', initials: 'QS' },
    { name: 'Yuechen Luo', affiliation: 'Tsinghua University, China', initials: 'YL' },
    { name: 'Lingjun Zhang', affiliation: 'Tsinghua University, China', initials: 'LZ' },
    { name: 'Hanwen Shen', affiliation: 'Stevens Institute of Technology, USA', initials: 'HS' },
    { name: 'Yuner Zhang', affiliation: 'Carnegie Mellon University, USA', initials: 'YZ' },
    { name: 'Yushen Zuo', affiliation: 'SimpleAI, China', initials: 'YZ' },
    { name: 'Jinhao Zhang', affiliation: 'Harbin Institute of Technology (Shenzhen), China', initials: 'JZ' },
    { name: 'Sheng Wang', affiliation: 'TermiTech, China', initials: 'SW' }
  ],

  // ContactFaqSection.vue：页面底部联系区下方 FAQ 折叠问答。
  faqs: [
    {
      question: 'Can I submit work that was previously rejected from another conference?',
      answer: 'Yes. Resubmissions are welcome if the work remains unpublished and complies with the workshop anonymity and formatting requirements.'
    },
    {
      question: 'What is the submission format?',
      answer: 'Full paper submissions: up to 14 pages, excluding references. Accepted papers will be included in the proceedings, listed separately, and presented as A1 posters. Poster papers: 2–6 pages. These will be presented only as A1 posters.'
    },
    {
      question: 'Is there an additional registration fee for the workshop?',
      answer: 'No additional workshop fee is currently planned. Attendance is covered by standard ECCV 2026 registration.'
    },
    {
      question: 'Will the workshop be hybrid?',
      answer: 'Yes, the workshop will be held in a hybrid format (in-person and online). At least half of the organizers will attend in person.'
    },
    {
      question: 'Can I submit a poster without a full paper?',
      answer: 'Yes. Poster papers should be 2–6 pages and will be presented only as A1 posters.'
    }
  ],

  // SiteFooter.vue：页脚版权和会议信息。
  footer: {
    copyright: '© 2026 Safe World Models Workshop Organizers. All rights reserved.',
    sponsor: 'Workshop at the European Conference on Computer Vision (ECCV 2026) in Malmö, Sweden.'
  }
}
