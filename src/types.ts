export type PageId = 'home' | 'models' | 'pricing' | 'payment';

export type JobStatus = 'processing' | 'ready' | 'failed';

export interface VideoJob {
  id: string;
  url: string;
  title: string;
  channel: string;
  thumbnail: string;
  status: JobStatus;
  progress: number;
  clipCount: number;
  durationLabel: string;
  createdAt: string;
  modelId: string;
}

export interface Clip {
  id: string;
  jobId: string;
  title: string;
  thumbnail: string;
  viralityScore: number;
  durationSec: number;
  captionPreview: string;
  platform: TargetPlatform;
}

export type TargetPlatform = 'youtube' | 'tiktok' | 'instagram';

export type CaptionStyle = 'dynamic' | 'hormozi' | 'minimalist' | 'bold' | 'karaoke';

export interface DurationPreset {
  id: string;
  label: string;
  range: string;
}

export interface AIModel {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pricePerMinute: number;
  priceLabel: string;
  speed: number;
  accuracy: number;
  features: string[];
  badge?: string;
  highlight?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export type PaymentMethod = 'card' | 'paypal' | 'crypto';
