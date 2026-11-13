import { useState } from 'react';
import {
  Sparkles,
  Link2,
  Settings2,
  Youtube,
  Music2,
  Instagram,
  Clock,
  Type,
  ChevronDown,
  Loader2,
  Play,
  AlertTriangle,
  CheckCircle2,
  Film,
  TrendingUp,
  Eye,
  Send,
  Clock3,
  Flame,
} from 'lucide-react';
import type { CaptionStyle, Clip, DurationPreset, TargetPlatform, VideoJob } from '@/types';
import { AI_MODELS, CAPTION_STYLES, DURATION_PRESETS, INITIAL_JOBS, PLATFORMS, SAMPLE_CLIPS } from '@/data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Toggle } from '@/components/ui/Toggle';
import { Modal } from '@/components/ui/Modal';

interface HomeProps {
  selectedModel: string;
  onNavigate: (page: 'models' | 'pricing' | 'payment') => void;
}

const platformIcon: Record<TargetPlatform, typeof Youtube> = {
  youtube: Youtube,
  tiktok: Music2,
  instagram: Instagram,
};

function statusBadge(status: VideoJob['status']) {
  if (status === 'ready')
    return <Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>Ready</Badge>;
  if (status === 'failed')
    return <Badge variant="error" icon={<AlertTriangle className="h-3 w-3" />}>Failed</Badge>;
  return <Badge variant="brand" icon={<Loader2 className="h-3 w-3 animate-spin" />}>Processing</Badge>;
}

function viralityColor(score: number) {
  if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-400/20';
  if (score >= 75) return 'text-brand-300 bg-brand-500/10 border-brand-400/20';
  return 'text-amber-300 bg-amber-500/10 border-amber-400/20';
}

export function Home({ selectedModel, onNavigate }: HomeProps) {
  const [url, setUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [platforms, setPlatforms] = useState<Record<TargetPlatform, boolean>>({
    youtube: true,
    tiktok: true,
    instagram: false,
  });
  const [duration, setDuration] = useState<DurationPreset['id']>('s30');
  const [captionStyle, setCaptionStyle] = useState<CaptionStyle>('dynamic');
  const [autoPublish, setAutoPublish] = useState(false);
  const [jobs, setJobs] = useState<VideoJob[]>(INITIAL_JOBS);
  const [generating, setGenerating] = useState(false);
  const [clipsModalJob, setClipsModalJob] = useState<VideoJob | null>(null);

  const activeModel = AI_MODELS.find((m) => m.id === selectedModel) ?? AI_MODELS[1];

  const handleGenerate = () => {
    if (!url.trim()) return;
    setGenerating(true);
    const newJob: VideoJob = {
      id: `job-${Date.now()}`,
      url,
      title: 'New submission — analyzing content...',
      channel: 'You',
      thumbnail: `https://picsum.photos/seed/${Date.now()}/480/270`,
      status: 'processing',
      progress: 5,
      clipCount: 0,
      durationLabel: '--:--',
      createdAt: 'just now',
      modelId: selectedModel,
    };
    setJobs((prev) => [newJob, ...prev]);
    setUrl('');

    // Simulate progress
    let p = 5;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setJobs((prev) =>
          prev.map((j) =>
            j.id === newJob.id
              ? { ...j, progress: 100, status: 'ready', clipCount: Math.floor(Math.random() * 6) + 5, title: 'How AI Is Reshaping Creative Work in 2026', durationLabel: '38:14' }
              : j,
          ),
        );
        setGenerating(false);
      } else {
        setJobs((prev) => prev.map((j) => (j.id === newJob.id ? { ...j, progress: Math.floor(p) } : j)));
      }
    }, 700);
  };

  const togglePlatform = (id: TargetPlatform) =>
    setPlatforms((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero / Input */}
      <section className="relative animate-slide-up">
        <div className="mb-6 text-center">
          <Badge variant="brand" className="mb-3" icon={<Sparkles className="h-3 w-3" />}>
            AI-Powered Short-Form Engine
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Paste a link. Get <span className="gradient-text">viral shorts</span>.
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
            Drop any long-form video URL and ClipFlow AI extracts, captions, and crops ready-to-publish clips in seconds.
          </p>
        </div>

        {/* Input box */}
        <div className="mx-auto max-w-3xl">
          <div className="group relative rounded-2xl glass-strong p-2 shadow-card transition-all duration-300 focus-within:border-brand-400/40 focus-within:shadow-glow-brand">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Link2 className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="Paste YouTube, Vimeo, or video URL..."
                  className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`inline-flex h-12 items-center gap-2 rounded-xl border px-3.5 text-sm font-medium transition-all ${
                    showSettings
                      ? 'border-brand-400/30 bg-brand-500/10 text-brand-200'
                      : 'border-ink-600 text-slate-400 hover:text-slate-200 hover:border-ink-500'
                  }`}
                >
                  <Settings2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showSettings ? 'rotate-180' : ''}`} />
                </button>
                <Button size="lg" onClick={handleGenerate} loading={generating} icon={!generating && <Sparkles className="h-4 w-4" />}>
                  {generating ? 'Generating...' : 'Generate Shorts'}
                </Button>
              </div>
            </div>
          </div>

          {/* Active model chip */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Using engine:</span>
            <button
              onClick={() => onNavigate('models')}
              className="inline-flex items-center gap-1.5 rounded-md bg-ink-800 px-2 py-1 font-medium text-brand-300 transition-colors hover:bg-ink-700"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              {activeModel.name}
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">{activeModel.priceLabel}</span>
            </button>
          </div>

          {/* Advanced settings drawer */}
          {showSettings && (
            <div className="mt-4 rounded-2xl glass p-5 animate-scale-in">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Platform selector */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Send className="h-4 w-4 text-brand-300" /> Target Platforms
                  </label>
                  <div className="space-y-2">
                    {PLATFORMS.map((p) => {
                      const Icon = platformIcon[p.id as TargetPlatform];
                      return (
                        <button
                          key={p.id}
                          onClick={() => togglePlatform(p.id as TargetPlatform)}
                          className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                            platforms[p.id as TargetPlatform]
                              ? 'border-brand-400/30 bg-brand-500/10 text-white'
                              : 'border-ink-600 text-slate-400 hover:border-ink-500'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {p.label}
                          <span
                            className={`ml-auto h-4 w-4 rounded-full border-2 transition-colors ${
                              platforms[p.id as TargetPlatform] ? 'border-brand-400 bg-brand-400' : 'border-ink-500'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Clock className="h-4 w-4 text-brand-300" /> Duration
                  </label>
                  <div className="space-y-2">
                    {DURATION_PRESETS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        className={`flex w-full flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-all ${
                          duration === d.id
                            ? 'border-brand-400/30 bg-brand-500/10'
                            : 'border-ink-600 hover:border-ink-500'
                        }`}
                      >
                        <span className={`text-sm font-medium ${duration === d.id ? 'text-white' : 'text-slate-300'}`}>
                          {d.label}
                        </span>
                        <span className="text-xs text-slate-500">{d.range}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Caption style */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
                    <Type className="h-4 w-4 text-brand-300" /> Caption Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAPTION_STYLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setCaptionStyle(s.id as CaptionStyle)}
                        className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                          captionStyle === s.id
                            ? 'border-brand-400/30 bg-brand-500/10 text-white'
                            : 'border-ink-600 text-slate-400 hover:border-ink-500'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-ink-600 bg-ink-800/50 p-3">
                    <Toggle
                      checked={autoPublish}
                      onChange={setAutoPublish}
                      label="Auto-publish when ready"
                      description="Push to connected channels automatically"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Active Projects */}
      <section className="mt-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Active Projects</h2>
            <p className="text-sm text-slate-500">Recent video submissions and their processing status</p>
          </div>
          <Badge variant="default">{jobs.length} jobs</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onViewClips={() => setClipsModalJob(job)} />
          ))}
        </div>
      </section>

      {/* Clips Modal */}
      <ClipsModal job={clipsModalJob} onClose={() => setClipsModalJob(null)} />
    </div>
  );
}

function JobCard({ job, onViewClips }: { job: VideoJob; onViewClips: () => void }) {
  return (
    <div className="group overflow-hidden rounded-2xl glass shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-brand-400/20">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-ink-800">
        <img src={job.thumbnail} alt={job.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
        <div className="absolute left-3 top-3">{statusBadge(job.status)}</div>
        <div className="absolute bottom-3 right-3 rounded-md bg-ink-950/80 px-2 py-0.5 text-xs font-medium text-slate-200 backdrop-blur-sm">
          {job.durationLabel}
        </div>
        {job.status === 'ready' && (
          <div className="absolute bottom-3 left-3 rounded-md bg-ink-950/80 px-2 py-0.5 text-xs font-semibold text-brand-300 backdrop-blur-sm">
            {job.clipCount} clips
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="truncate text-sm font-semibold text-white">{job.title}</h3>
        <p className="mt-0.5 truncate text-xs text-slate-500">{job.channel} · {job.createdAt}</p>

        {job.status === 'processing' && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-slate-400">Processing...</span>
              <span className="font-semibold text-brand-300">{job.progress}%</span>
            </div>
            <ProgressBar value={job.progress} animated />
          </div>
        )}

        {job.status === 'failed' && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300">
            <AlertTriangle className="h-3.5 w-3.5" />
            Could not process this video. Try again.
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          {job.status === 'ready' ? (
            <Button size="sm" onClick={onViewClips} icon={<Play className="h-3.5 w-3.5" />} className="w-full">
              View Clips
            </Button>
          ) : job.status === 'processing' ? (
            <Button size="sm" variant="secondary" disabled className="w-full">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              In Progress
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="w-full">
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ClipsModal({ job, onClose }: { job: VideoJob | null; onClose: () => void }) {
  if (!job) return null;
  const clips: Clip[] = SAMPLE_CLIPS;

  return (
    <Modal open={!!job} onClose={onClose} title={<span>Generated Clips — {job.title}</span>} maxWidth="max-w-5xl">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>{clips.length} clips ready</Badge>
        <Badge variant="brand" icon={<Film className="h-3 w-3" />}>Pro-Vibe 3.0</Badge>
        <Badge variant="default" icon={<Clock3 className="h-3 w-3" />}>{job.durationLabel} source</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clips.map((clip) => {
          const Icon = platformIcon[clip.platform];
          return (
            <div key={clip.id} className="group overflow-hidden rounded-2xl border border-ink-600 bg-ink-800/60 transition-all hover:border-brand-400/30 hover:bg-ink-800">
              {/* Vertical clip preview */}
              <div className="relative mx-auto aspect-[9/16] max-w-[200px] overflow-hidden bg-ink-900">
                <img src={clip.thumbnail} alt={clip.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/30" />
                {/* Virality score */}
                <div className={`absolute right-2 top-2 rounded-lg border px-2 py-1 text-xs font-bold backdrop-blur-sm ${viralityColor(clip.viralityScore)}`}>
                  <Flame className="mr-1 inline h-3 w-3" />
                  {clip.viralityScore}
                </div>
                {/* Duration */}
                <div className="absolute bottom-2 left-2 rounded-md bg-ink-950/80 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  0:{clip.durationSec.toString().padStart(2, '0')}
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient shadow-glow-brand">
                    <Play className="h-4 w-4 text-white" fill="white" />
                  </div>
                </div>
                {/* Caption preview */}
                <div className="absolute bottom-7 left-2 right-2 text-center">
                  <span className="rounded bg-ink-950/90 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                    {clip.captionPreview}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-3">
                <p className="line-clamp-2 text-xs font-medium text-slate-200">{clip.title}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                  <Icon className="h-3 w-3" />
                  <span className="capitalize">{clip.platform}</span>
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span>High retention predicted</span>
                </div>
                <Button size="sm" className="mt-3 w-full" icon={<Send className="h-3.5 w-3.5" />}>
                  Publish to Channel
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-ink-600 bg-ink-800/50 px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Eye className="h-4 w-4" />
          Publish all {clips.length} clips to their target platforms?
        </div>
        <Button size="sm" icon={<Send className="h-3.5 w-3.5" />}>Publish All</Button>
      </div>
    </Modal>
  );
}
