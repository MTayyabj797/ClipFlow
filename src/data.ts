import type { AIModel, Clip, DurationPreset, Plan, VideoJob } from './types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'lite',
    name: 'ClipFlow Lite',
    tagline: 'Fast & reliable',
    description:
      'Optimized for standard talking-head content. Great turnaround speed for creators who need clips quickly.',
    pricePerMinute: 0,
    priceLabel: 'Included',
    speed: 5,
    accuracy: 3,
    features: ['Standard smart-crop', 'Auto captions', '720p export', 'Basic hook detection'],
  },
  {
    id: 'pro',
    name: 'Pro-Vibe 3.0',
    tagline: 'Most popular',
    description:
      'Superior face-tracking, emotion detection, and AI hook generation tuned for maximum retention.',
    pricePerMinute: 0.1,
    priceLabel: '+$0.10 / min',
    speed: 4,
    accuracy: 5,
    features: ['Advanced face-tracking', 'Emotion-aware cuts', 'Dynamic hook generation', '1080p export', 'Animated captions'],
    badge: 'Recommended',
    highlight: true,
  },
  {
    id: 'ultra',
    name: 'OmniShorts Ultra',
    tagline: 'Cinematic grade',
    description:
      'Hollywood-grade cinematic reframing, intelligent b-roll insertion, and multi-speaker awareness for premium output.',
    pricePerMinute: 0.25,
    priceLabel: '+$0.25 / min',
    speed: 3,
    accuracy: 5,
    features: ['Cinematic reframing', 'Auto b-roll insertion', 'Multi-speaker tracking', '4K-ready mastering', 'Premium caption FX'],
  },
];

export const PLANS: Plan[] = [
  {
    id: 'creator',
    name: 'Creator',
    monthly: 19,
    annual: 182,
    tagline: 'For solo creators getting started',
    features: [
      '60 minutes / month',
      'Basic caption templates',
      '720p export',
      'ClipFlow Lite model',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthly: 49,
    annual: 470,
    tagline: 'For growing channels that need volume',
    features: [
      '200 minutes / month',
      'Advanced AI models',
      'Direct auto-publish',
      '1080p60 export',
      'All caption styles',
      'Priority rendering',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'agency',
    name: 'Agency',
    monthly: 149,
    annual: 1430,
    tagline: 'For teams and agencies at scale',
    features: [
      '600 minutes / month',
      '5 team collaboration seats',
      'Custom branding & watermarks',
      'Priority queue',
      'All AI models included',
      'Dedicated success manager',
    ],
  },
];

export const DURATION_PRESETS: DurationPreset[] = [
  { id: 's15', label: '15–30s', range: 'High-impact hooks' },
  { id: 's30', label: '30–60s', range: 'Story beats' },
  { id: 's60', label: '60–90s', range: 'Deep dives' },
];

export const CAPTION_STYLES = [
  { id: 'dynamic', label: 'Dynamic' },
  { id: 'hormozi', label: 'Alex Hormozi' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'bold', label: 'Bold Pop' },
  { id: 'karaoke', label: 'Karaoke' },
] as const;

export const PLATFORMS = [
  { id: 'youtube', label: 'YouTube Shorts' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram Reels' },
] as const;

const thumb = (seed: string, w = 480, h = 270) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const INITIAL_JOBS: VideoJob[] = [
  {
    id: 'job-1',
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'How I Built a $10M Startup From Scratch',
    channel: 'Alex Founders',
    thumbnail: thumb('founder10m'),
    status: 'ready',
    progress: 100,
    clipCount: 8,
    durationLabel: '42:18',
    createdAt: '2h ago',
    modelId: 'pro',
  },
  {
    id: 'job-2',
    url: 'https://youtube.com/watch?v=abc123',
    title: 'The Science of Deep Work — Full Lecture',
    channel: 'Mindset Lab',
    thumbnail: thumb('deepwork'),
    status: 'processing',
    progress: 64,
    clipCount: 0,
    durationLabel: '1:12:40',
    createdAt: '12m ago',
    modelId: 'pro',
  },
  {
    id: 'job-3',
    url: 'https://vimeo.com/789012',
    title: 'Podcast Ep. 42 — The Future of AI Agents',
    channel: 'Latent Space',
    thumbnail: thumb('aipodcast'),
    status: 'failed',
    progress: 38,
    clipCount: 0,
    durationLabel: '58:02',
    createdAt: '1d ago',
    modelId: 'lite',
  },
  {
    id: 'job-4',
    url: 'https://youtube.com/watch?v=xyz789',
    title: '30-Day Fitness Transformation Guide',
    channel: 'PeakFit',
    thumbnail: thumb('fitness30'),
    status: 'ready',
    progress: 100,
    clipCount: 12,
    durationLabel: '25:30',
    createdAt: '3d ago',
    modelId: 'ultra',
  } as VideoJob,
];

export const SAMPLE_CLIPS: Clip[] = [
  {
    id: 'clip-1',
    jobId: 'job-1',
    title: '"Nobody tells you this about raising money"',
    thumbnail: thumb('clip1', 320, 568),
    viralityScore: 94,
    durationSec: 28,
    captionPreview: 'NOBODY tells you THIS about raising money...',
    platform: 'youtube',
  },
  {
    id: 'clip-2',
    jobId: 'job-1',
    title: 'The 3am realization that changed everything',
    thumbnail: thumb('clip2', 320, 568),
    viralityScore: 88,
    durationSec: 41,
    captionPreview: 'The 3AM realization that changed EVERYTHING',
    platform: 'tiktok',
  },
  {
    id: 'clip-3',
    jobId: 'job-1',
    title: 'Why your first hire is the most important',
    thumbnail: thumb('clip3', 320, 568),
    viralityScore: 76,
    durationSec: 52,
    captionPreview: 'Why your FIRST HIRE is the most important',
    platform: 'instagram',
  },
  {
    id: 'clip-4',
    jobId: 'job-1',
    title: 'I turned $500 into $2M — here\'s the play',
    thumbnail: thumb('clip4', 320, 568),
    viralityScore: 91,
    durationSec: 34,
    captionPreview: 'I turned $500 into $2M — here\'s THE PLAY',
    platform: 'youtube',
  },
];
