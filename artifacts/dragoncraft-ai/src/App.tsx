import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Download,
  ExternalLink,
  Flame,
  Globe2,
  Layers3,
  LockKeyhole,
  Mic,
  Menu,
  MessageCircle,
  Minus,
  Palette,
  Play,
  Plus,
  QrCode,
  Rocket,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Twitter,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { supabase } from '@/lib/supabase';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import type { Session } from '@supabase/supabase-js';

const queryClient = new QueryClient();

type Realm = {
  id: string;
  name: string;
  eyebrow: string;
  copy: string;
  color: string;
  accent: string;
  metric: string;
};

const realms: Realm[] = [
  { id: 'solara', name: 'SOLARA', eyebrow: 'The gilded sky', copy: 'Warmth, velocity, and a brand that knows where it is going.', color: '#ff7058', accent: '#ffc857', metric: '92% clarity' },
  { id: 'nocturne', name: 'NOCTURNE', eyebrow: 'The velvet void', copy: 'Quiet power for founders building in categories that do not exist yet.', color: '#a873ff', accent: '#f20f75', metric: '4.8x recall' },
  { id: 'tidefall', name: 'TIDEFALL', eyebrow: 'The electric deep', copy: 'Signal through the noise. A sharper edge for ambitious launches.', color: '#55d7cf', accent: '#7e63e8', metric: '31% lift' },
];

const galleryItems = [
  { title: 'Morrow / financial rituals', type: 'Brand world', tag: 'Nocturne', tone: 'rose', description: 'A quiet, cinematic identity for the rituals behind better money.' },
  { title: 'Kiteform / spatial computing', type: 'Launch system', tag: 'Solara', tone: 'sun', description: 'A kinetic product story built to make the future feel touchable.' },
  { title: 'Tide / climate intelligence', type: 'Conversion page', tag: 'Tidefall', tone: 'aqua', description: 'Data with a pulse, translated into a world people want to enter.' },
  { title: 'Rook / founder network', type: 'Editorial identity', tag: 'Nocturne', tone: 'violet', description: 'The anti-network network: sparse, magnetic, unmistakably human.' },
];

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay, ease: [0.21, 0.8, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function DragonMark({ small = false }: { small?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center ${small ? 'h-8 w-8' : 'h-10 w-10'}`} data-testid="brand-dragon-mark">
      <div className="absolute inset-0 rotate-45 rounded-[9px] border border-[#ffc857]/60 bg-[#f20f75]/20" />
      <svg viewBox="0 0 36 36" className={`relative ${small ? 'h-5 w-5' : 'h-6 w-6'} text-[#fff2d5]`} fill="none" aria-label="DragonCraft mark">
        <path d="M8 25c2.4-5 5-8.6 9.2-10.9 2.6-1.4 4.1-3.6 4.7-6.3 3.1 2.2 4.7 5.1 4.7 8.4 0 5.8-4.2 10.2-10.1 10.2-3.2 0-5.7-.5-8.5-1.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 21.6c2.9-.2 5.3-1.2 7.3-3.1M22.1 10.3l3.4-2.8-.4 4.9M9.4 25.2l-3.5 2.1" stroke="#ffc857" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="23.4" cy="13.9" r="1" fill="#ffc857" />
      </svg>
    </div>
  );
}

function DragonIllustration({ color = '#ff7058', accent = '#ffc857' }: { color?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 560 470" className="h-full w-full" fill="none" aria-label="Abstract neon dragon illustration">
      <defs>
        <linearGradient id="dragonLine" x1="120" y1="50" x2="420" y2="420" gradientUnits="userSpaceOnUse">
          <stop stopColor={accent} />
          <stop offset=".46" stopColor={color} />
          <stop offset="1" stopColor="#f20f75" />
        </linearGradient>
        <radialGradient id="dragonOrb" cx="50%" cy="50%" r="50%">
          <stop stopColor={accent} stopOpacity=".9" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="350" cy="213" r="126" fill="url(#dragonOrb)" opacity=".22" />
      <path d="M115 349c61-42 94-80 106-124 10-37 3-69-18-92 48 7 84 31 108 72 17 30 24 57 23 81 13-23 20-50 19-80 39 38 56 79 52 122-4 47-25 80-63 103" stroke="url(#dragonLine)" strokeWidth="4" strokeLinecap="round" />
      <path d="M193 138c7-35 28-61 62-77 0 31 15 53 45 67 17-9 35-12 52-9-22 21-35 44-40 70-29-18-55-26-80-24-15 1-28-8-39-27Z" stroke="url(#dragonLine)" strokeWidth="4" strokeLinejoin="round" />
      <path d="M283 119c26 7 47 23 62 48M230 126l-24-32M249 116l-7-36M328 143l28-34" stroke="url(#dragonLine)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M256 207c31-22 64-24 99-7-18 16-26 37-24 64-27-15-51-20-75-14" stroke="url(#dragonLine)" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="304" cy="190" r="7" fill={accent} />
      <circle cx="304" cy="190" r="16" stroke={accent} strokeOpacity=".42" />
      <path d="M330 209c14 11 24 25 28 43M270 205l-25 25" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M108 348c-31 21-44 41-40 60 36-4 66-15 91-31M455 317c24 15 37 36 39 62-30-3-54-13-72-30" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <path d="M172 376c30 13 58 17 84 13M348 389c32 3 58-3 79-17" stroke="#fff2d5" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Header({ onSignIn, onForge, signedIn }: { onSignIn: () => void; onForge: () => void; signedIn: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-2 flex items-center justify-center gap-2 rounded-xl border border-[#ffc857]/25 bg-[#ffc857]/[.07] px-3 py-2 text-center font-mono text-[9px] uppercase tracking-[.12em] text-[#ffc857]">
          <Sparkles size={12} /> Legendary welcome — 60 days of full access, free
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-[#fff2d5]/10 bg-[#180c31]/75 px-4 py-3 shadow-[0_12px_40px_rgba(10,3,25,.25)] backdrop-blur-xl sm:px-5">
        <a href="#hero" className="flex items-center gap-3" data-testid="link-brand">
          <DragonMark small />
          <span className="font-display text-[15px] font-bold tracking-[-.03em] text-[#fff2d5]">DRAGON<span className="text-[#ffc857]">CRAFT</span><sup className="ml-0.5 align-top font-mono text-[7px] text-[#f20f75]">AI</sup></span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {['Studio', 'Realms', 'Gallery', 'Pricing'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-mono text-[10px] uppercase tracking-[.14em] text-[#b9abc9] transition-colors hover:text-[#fff2d5]" data-testid={`link-nav-${item.toLowerCase()}`}>{item}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={onSignIn} className="px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-[#d8cce2] transition-colors hover:text-[#fff2d5]" data-testid="button-sign-in">{signedIn ? 'Account' : 'Sign in'}</button>
          <button onClick={onForge} className="dc-btn-primary rounded-lg px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[.12em]" data-testid="button-header-forge">Enter the forge <ArrowRight size={13} /></button>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-lg border border-[#fff2d5]/15 p-2 text-[#fff2d5] md:hidden" aria-label="Toggle navigation" data-testid="button-mobile-menu">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="dc-glass mx-auto mt-2 max-w-[1160px] rounded-2xl p-4 md:hidden">
            <div className="grid gap-1">
              {['Studio', 'Realms', 'Gallery', 'Pricing'].map((item) => <a onClick={closeMobile} key={item} href={`#${item.toLowerCase()}`} className="rounded-lg px-3 py-3 font-mono text-[11px] uppercase tracking-[.14em] text-[#d8cce2] hover:bg-[#fff2d5]/10" data-testid={`link-mobile-nav-${item.toLowerCase()}`}>{item}</a>)}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#fff2d5]/10 pt-3">
                <button onClick={() => { closeMobile(); onSignIn(); }} className="rounded-lg border border-[#fff2d5]/20 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-[#fff2d5]" data-testid="button-mobile-sign-in">{signedIn ? 'Account' : 'Sign in'}</button>
                <button onClick={() => { closeMobile(); onForge(); }} className="dc-btn-primary rounded-lg py-3 font-mono text-[10px] uppercase tracking-[.1em]" data-testid="button-mobile-forge">Forge a world</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ realm, setRealm, onForge, onSignIn }: { realm: Realm; setRealm: (realm: Realm) => void; onForge: () => void; onSignIn: () => void }) {
  return (
    <section id="hero" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="dc-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -right-40 top-28 h-96 w-96 rounded-full bg-[#f20f75]/15 blur-[100px]" />
      <div className="dc-section grid items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-5">
        <div className="relative z-10">
          <Reveal><div className="dc-kicker mb-6 flex items-center gap-2"><span className="h-px w-7 bg-[#ffc857]" /> A creative studio for the unreasonably ambitious</div></Reveal>
          <Reveal delay={.08}><h1 className="max-w-[700px] font-display text-[clamp(3.3rem,8vw,6.7rem)] font-bold leading-[.88] tracking-[-.075em] text-[#fff2d5]">Build a brand<br /><span className="dc-sunset-text">worth entering.</span></h1></Reveal>
          <Reveal delay={.16}><p className="mt-7 max-w-[510px] text-[16px] leading-7 text-[#b9abc9] sm:text-[18px]">DragonCraft turns a sharp idea into a living brand realm — identity, story, and a landing page that makes the right people stop scrolling.</p></Reveal>
          <Reveal delay={.24}><div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onForge} className="dc-btn-primary rounded-xl px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[.12em]" data-testid="button-hero-forge">Start forging <ArrowRight size={15} /></button>
            <a href="#battle" className="dc-btn-secondary rounded-xl px-5 py-3.5 font-mono text-[11px] uppercase tracking-[.12em]" data-testid="link-hero-watch"><Play size={14} fill="currentColor" /> See the difference</a>
          </div></Reveal>
          <Reveal delay={.32}><div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[#a89bbf]">
            <div className="flex items-center gap-2"><div className="flex -space-x-2">{['AL', 'MK', 'JS'].map((initial, index) => <span key={initial} className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#180c31] text-[9px] font-bold text-[#180c31] ${index === 0 ? 'bg-[#ffc857]' : index === 1 ? 'bg-[#ff7058]' : 'bg-[#79dbd1]'}`}>{initial}</span>)}</div><span className="font-mono text-[10px]">2,400+ worlds forged</span></div>
            <div className="flex items-center gap-1 text-[#ffc857]"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><span className="ml-1 font-mono text-[10px] text-[#a89bbf]">4.9 / 5</span></div>
          </div></Reveal>
        </div>
        <Reveal delay={.18} className="relative">
          <div className="relative mx-auto max-w-[570px]">
            <div className="absolute -inset-8 rounded-full opacity-35 blur-3xl" style={{ background: `radial-gradient(circle, ${realm.color}, transparent 62%)` }} />
            <div className="dc-glass-strong relative min-h-[470px] overflow-hidden rounded-[28px] p-4 sm:min-h-[530px] sm:p-6">
              <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 52% 48%, ${realm.color}, transparent 40%)` }} />
              <div className="relative flex items-center justify-between border-b border-[#fff2d5]/10 pb-4">
                <div><p className="font-mono text-[9px] uppercase tracking-[.16em] text-[#a89bbf]">Realm scanner / 001</p><p className="mt-1 font-display text-sm text-[#fff2d5]">Choose your atmosphere</p></div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.1em] text-[#79dbd1]"><span className="dc-pulse h-1.5 w-1.5 rounded-full bg-[#79dbd1]" /> Live</div>
              </div>
              <div className="relative flex min-h-[330px] items-center justify-center py-2">
                <div className="dc-orbit absolute h-[310px] w-[310px] rounded-full border border-dashed border-[#ffc857]/25 sm:h-[370px] sm:w-[370px]" />
                <div className="absolute h-[240px] w-[240px] rounded-full border border-[#fff2d5]/10 sm:h-[285px] sm:w-[285px]" />
                <div className="dc-float relative z-10 h-[300px] w-full max-w-[440px]"><DragonIllustration color={realm.color} accent={realm.accent} /></div>
                <div className="absolute bottom-7 left-2 rounded-xl border border-[#fff2d5]/15 bg-[#180c31]/72 px-3 py-2 backdrop-blur-md sm:left-8"><p className="font-mono text-[8px] uppercase tracking-[.13em] text-[#a89bbf]">Signal strength</p><p className="mt-1 font-display text-lg text-[#ffc857]">{realm.metric}</p></div>
                <div className="absolute right-2 top-8 rounded-xl border border-[#fff2d5]/15 bg-[#180c31]/72 px-3 py-2 backdrop-blur-md sm:right-8"><p className="font-mono text-[8px] uppercase tracking-[.13em] text-[#a89bbf]">Core mood</p><p className="mt-1 font-display text-sm text-[#fff2d5]">{realm.name}</p></div>
              </div>
              <div className="relative flex flex-wrap gap-2 border-t border-[#fff2d5]/10 pt-4">
                {realms.map((item) => <button key={item.id} onClick={() => setRealm(item)} className={`rounded-lg border px-3 py-2 font-mono text-[9px] uppercase tracking-[.11em] transition-all ${item.id === realm.id ? 'border-[#ffc857]/70 bg-[#ffc857]/10 text-[#ffc857]' : 'border-[#fff2d5]/10 text-[#a89bbf] hover:border-[#fff2d5]/30 hover:text-[#fff2d5]'}`} data-testid={`button-hero-realm-${item.id}`}>{item.name}</button>)}
                <button onClick={onSignIn} className="ml-auto flex items-center gap-1.5 rounded-lg px-2 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-[#fff2d5] hover:text-[#ffc857]" data-testid="button-save-realm">Save realm <ArrowDownRight size={12} /></button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ['Brand identity', 'Conversion copy', 'Realm strategy', 'Landing systems', 'Founder signal', 'Launch velocity'];
  return <div className="overflow-hidden border-y border-[#fff2d5]/10 bg-[#10071f]/55 py-4"><div className="dc-marquee flex w-max">{[...words, ...words].map((word, index) => <div key={`${word}-${index}`} className="flex items-center gap-7 px-5"><span className="font-mono text-[10px] uppercase tracking-[.19em] text-[#a89bbf]">{word}</span><span className="text-[#f20f75]">+</span></div>)}</div></div>;
}

function StudioSection({ onForge, requireAccess }: { onForge: () => void; requireAccess: (authorizedAction: () => void) => void }) {
  const [prompt, setPrompt] = useState('');
  const [generated, setGenerated] = useState(false);
  return (
    <section id="studio" className="relative py-24 sm:py-32">
      <div className="dc-section">
        <Reveal><div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="dc-kicker">01 / The studio</p><h2 className="mt-4 max-w-[630px] font-display text-4xl font-bold leading-[.96] tracking-[-.06em] text-[#fff2d5] sm:text-6xl">Your rough idea.<br /><span className="text-[#a89bbf]">Our strange little superpower.</span></h2></div><p className="max-w-[280px] text-sm leading-6 text-[#a89bbf]">No prompt gymnastics. Just tell us what you are building, and we will find the realm it deserves.</p></div></Reveal>
        <div className="grid gap-4 lg:grid-cols-[1.03fr_.97fr]">
          <Reveal className="h-full"><div className="dc-glass-strong relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-3xl p-6 sm:p-8"><div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#f20f75]/15 blur-3xl" /><div className="relative flex items-center justify-between"><div className="flex items-center gap-2"><span className="rounded-md border border-[#ffc857]/30 bg-[#ffc857]/10 p-1.5 text-[#ffc857]"><Sparkles size={14} /></span><span className="font-mono text-[10px] uppercase tracking-[.15em] text-[#fff2d5]">Signal forge</span></div><span className="font-mono text-[9px] text-[#a89bbf]">v.2.4</span></div><div className="relative mt-14"><p className="font-display text-2xl leading-tight text-[#fff2d5] sm:text-3xl">“Make something for<br /><span className="text-[#ffc857]">people who notice.”</span></p><p className="mt-4 max-w-[360px] text-sm leading-6 text-[#a89bbf]">Describe your product in one sentence. The forge will shape the signal, voice, and visual atmosphere around it.</p></div><div className="relative mt-auto pt-10"><div className="flex items-center gap-2 rounded-xl border border-[#fff2d5]/14 bg-[#10071f]/45 p-2 pl-4"><input value={prompt} onChange={(event) => { setPrompt(event.target.value); setGenerated(false); }} onKeyDown={(event) => { if (event.key === 'Enter' && prompt.trim()) requireAccess(() => setGenerated(true)); }} placeholder="A calmer way to manage team energy..." className="min-w-0 flex-1 bg-transparent text-sm text-[#fff2d5] outline-none placeholder:text-[#77698e]" data-testid="input-studio-prompt" /><button onClick={() => prompt.trim() && requireAccess(() => setGenerated(true))} className="dc-btn-primary rounded-lg p-3" aria-label="Generate realm" data-testid="button-generate-realm"><ArrowRight size={16} /></button></div>{generated && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.08em] text-[#79dbd1]" data-testid="status-studio-generated"><CheckCircle2 size={13} /> Signal captured. Your realm is taking shape.</motion.p>}</div></div></Reveal>
          <Reveal delay={.12}><div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1"><div className="dc-glass rounded-3xl p-6 sm:p-7"><div className="flex items-start justify-between"><div><p className="dc-kicker">The ritual</p><h3 className="mt-3 font-display text-2xl font-bold text-[#fff2d5]">Three passes.<br />Zero blank canvas.</h3></div><Palette className="text-[#ff7058]" size={25} /></div><div className="mt-7 grid grid-cols-3 gap-2">{['Listen', 'Shape', 'Launch'].map((step, index) => <div key={step} className="border-t border-[#fff2d5]/20 pt-3"><span className="font-mono text-[9px] text-[#ffc857]">0{index + 1}</span><p className="mt-2 font-display text-sm text-[#fff2d5]">{step}</p></div>)}</div></div><div className="dc-glass rounded-3xl p-6 sm:p-7"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f20f75]/15 text-[#f20f75]"><Zap size={18} /></div><div><p className="font-display text-lg text-[#fff2d5]">Built for momentum</p><p className="font-mono text-[9px] uppercase tracking-[.12em] text-[#a89bbf]">Average first draft: 11 min</p></div></div><div className="mt-7 flex items-end gap-2"><p className="font-display text-4xl text-[#ffc857]">7.4k</p><p className="mb-1 font-mono text-[10px] text-[#a89bbf]">launches this month</p></div><button onClick={onForge} className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] text-[#fff2d5] hover:text-[#ffc857]" data-testid="button-studio-open-forge">Open your forge <ArrowRight size={13} /></button></div></div></Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ onForge, requireAccess }: { onForge: () => void; requireAccess: (authorizedAction: () => void) => void }) {
  const [listening, setListening] = useState(false);
  const [captured, setCaptured] = useState(false);

  const startListening = () => {
    requireAccess(() => {
    setListening(true);
    window.setTimeout(() => {
      setListening(false);
      setCaptured(true);
    }, 1200);
    });
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="dc-section">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="dc-kicker">02 / The two realms</p>
              <h2 className="mt-4 max-w-[690px] font-display text-4xl font-bold leading-[.94] tracking-[-.06em] text-[#fff2d5] sm:text-6xl">
                One idea.
                <br />
                <span className="text-[#a89bbf]">Two ways to make it real.</span>
              </h2>
            </div>
            <p className="max-w-[290px] text-sm leading-6 text-[#a89bbf]">
              Forge a memorable mark, then give it a home that knows how to convert.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="dc-glass-strong relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#f20f75]/20 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="dc-kicker">Realm A / identity</p>
                  <h3 className="mt-3 font-display text-3xl text-[#fff2d5]">Dragon Logo Forge</h3>
                </div>
                <Palette className="text-[#ff7058]" size={25} />
              </div>
              <p className="relative mt-5 max-w-[390px] text-sm leading-6 text-[#a89bbf]">
                Generate a logo, palette, type system, and social banners from one sharp prompt.
                Switch between fire, cyber, minimalist, and anime ink atmospheres.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-2">
                {['Fire Dragon', 'Cyber Neon', 'Minimalist', 'Anime Ink'].map((style) => (
                  <span key={style} className="rounded-full border border-[#fff2d5]/15 bg-[#fff2d5]/[.05] px-3 py-2 font-mono text-[9px] uppercase tracking-[.11em] text-[#d8cce2]">
                    {style}
                  </span>
                ))}
              </div>
              <button onClick={onForge} className="relative mt-9 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] text-[#ffc857]" data-testid="button-logo-forge">
                Open the logo forge <ArrowRight size={13} />
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="dc-glass-strong relative h-full overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-[#55d7cf]/15 blur-3xl" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="dc-kicker">Realm B / conversion</p>
                  <h3 className="mt-3 font-display text-3xl text-[#fff2d5]">Dragon Web Architect</h3>
                </div>
                <Code2 className="text-[#79dbd1]" size={25} />
              </div>
              <p className="relative mt-5 max-w-[390px] text-sm leading-6 text-[#a89bbf]">
                Turn the same signal into a responsive landing page or micro-storefront with clean HTML and Tailwind source.
              </p>
              <div className="relative mt-8 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-[#fff2d5]/12 bg-[#10071f]/35 p-3">
                  <Smartphone className="text-[#79dbd1]" size={17} />
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[.1em] text-[#d8cce2]">Mobile ready</p>
                </div>
                <div className="rounded-xl border border-[#fff2d5]/12 bg-[#10071f]/35 p-3">
                  <Download className="text-[#ffc857]" size={17} />
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[.1em] text-[#d8cce2]">Source export</p>
                </div>
              </div>
              <button onClick={onForge} className="relative mt-7 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] text-[#79dbd1]" data-testid="button-web-architect">
                Build a micro-site <ArrowRight size={13} />
              </button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.18}>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-3xl border border-[#ffc857]/25 bg-gradient-to-br from-[#ffc857]/10 via-[#f20f75]/[.07] to-transparent p-6 sm:p-8">
              <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-center">
                <div>
                  <p className="dc-kicker">Direct signal / multilingual</p>
                  <h3 className="mt-3 font-display text-2xl text-[#fff2d5]">AI Dragon Voice-to-Design</h3>
                  <p className="mt-3 max-w-[450px] text-sm leading-6 text-[#a89bbf]">
                    Hold the mic and describe your business in Arabic, English, or any language. The forge turns your voice into a complete first direction.
                  </p>
                </div>
                <button onClick={startListening} className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border ${listening ? 'border-[#ffc857] bg-[#ffc857]/20 text-[#ffc857]' : 'border-[#f20f75]/50 bg-[#f20f75]/15 text-[#ff7058]'} transition-all`} aria-label="Start voice to design" data-testid="button-voice-design">
                  <Mic size={28} className={listening ? 'animate-pulse' : ''} />
                </button>
              </div>
              {captured && <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-[#79dbd1]" data-testid="status-voice-captured"><CheckCircle2 size={14} /> Voice captured — your two realms are syncing.</p>}
            </div>
            <div className="dc-glass rounded-3xl p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="dc-kicker">Share the signal</p>
                  <h3 className="mt-3 font-display text-2xl text-[#fff2d5]">Anime QR card</h3>
                </div>
                <QrCode className="text-[#ffc857]" size={25} />
              </div>
              <p className="mt-4 text-sm leading-6 text-[#a89bbf]">A living digital business card that links directly to your new realm or WhatsApp.</p>
              <button onClick={() => setCaptured(true)} className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] text-[#ffc857]" data-testid="button-qr-card">
                Preview card <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RealmsSection({ activeRealm, onSelect }: { activeRealm: Realm; onSelect: (realm: Realm) => void }) {
  return (
    <section id="realms" className="relative overflow-hidden py-24 sm:py-32">
      <div className="dc-section"><Reveal><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="dc-kicker">02 / The realms</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.06em] text-[#fff2d5] sm:text-6xl">Pick a weather<br /><span className="text-[#a89bbf]">for your ambition.</span></h2></div><p className="max-w-[320px] text-sm leading-6 text-[#a89bbf]">A realm is more than a palette. It is a point of view your audience can feel before they read a word.</p></div></Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">{realms.map((realm, index) => <Reveal key={realm.id} delay={index * .09}><button onClick={() => onSelect(realm)} className={`dc-realm-card active:text-left relative flex min-h-[310px] w-full flex-col overflow-hidden rounded-3xl border p-6 text-left ${activeRealm.id === realm.id ? 'active' : 'border-[#fff2d5]/12 bg-[#2b1253]/35'}`} data-testid={`card-realm-${realm.id}`}><div className="absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl" style={{ background: realm.color, opacity: .18 }} /><div className="relative flex items-start justify-between"><div><p className="font-mono text-[9px] uppercase tracking-[.15em]" style={{ color: realm.accent }}>{realm.eyebrow}</p><h3 className="mt-3 font-display text-3xl font-bold tracking-[-.06em] text-[#fff2d5]">{realm.name}</h3></div><div className="rounded-full border border-[#fff2d5]/15 p-2 text-[#a89bbf]">{activeRealm.id === realm.id ? <Check size={14} className="text-[#ffc857]" /> : <Plus size={14} />}</div></div><div className="relative mt-auto"><div className="mb-4 h-px w-full bg-[#fff2d5]/10" /><p className="max-w-[245px] text-sm leading-6 text-[#b9abc9]">{realm.copy}</p><div className="mt-5 flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.13em] text-[#a89bbf]">Atmosphere</span><span className="font-mono text-[10px]" style={{ color: realm.accent }}>{realm.metric}</span></div></div></button></Reveal>)}</div>
        <Reveal delay={.2}><div className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#ffc857]/25 bg-[#ffc857]/[.06] px-5 py-4 sm:flex-row"><div className="flex items-center gap-3"><Flame size={18} className="text-[#ff7058]" /><p className="text-sm text-[#fff2d5]">You are currently orbiting <span className="font-display text-[#ffc857]">{activeRealm.name}</span>.</p></div><span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#a89bbf]">Tap any realm to recalibrate</span></div></Reveal>
      </div>
    </section>
  );
}

function BattleSection() {
  const [showDetails, setShowDetails] = useState(false);
  const rows = [
    ['Feels like you', 'A voice with a pulse', 'Polished, not personal'],
    ['Built around a point of view', 'A visual system with tension', 'A template with your logo'],
    ['Launches in days', 'Conversion story included', 'A handoff and good luck'],
    ['Gets sharper over time', 'Your realm remembers', 'Starts over every project'],
  ];
  return (
    <section id="battle" className="relative py-24 sm:py-32">
      <div className="dc-section"><Reveal><div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end"><div><p className="dc-kicker">03 / Dragon Battle</p><h2 className="mt-4 font-display text-4xl font-bold leading-[.94] tracking-[-.06em] text-[#fff2d5] sm:text-6xl">Put your ideas<br /><span className="dc-sunset-text">head to head.</span></h2></div><div><p className="max-w-[530px] text-lg leading-7 text-[#b9abc9]">Compare two directions side by side and see which one carries more signal before you ship it.</p><button onClick={() => setShowDetails(!showDetails)} className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] text-[#ffc857]" data-testid="button-battle-details">{showDetails ? 'Hide the receipts' : 'Show the receipts'} <ChevronDown size={13} className={showDetails ? 'rotate-180' : ''} /></button></div></div></Reveal>
        <Reveal delay={.13}><div className="mt-12 overflow-hidden rounded-3xl border border-[#fff2d5]/13 bg-[#2b1253]/30"><div className="grid grid-cols-[1.15fr_1fr_1fr] border-b border-[#fff2d5]/10 bg-[#10071f]/40 px-4 py-4 font-mono text-[9px] uppercase tracking-[.12em] text-[#a89bbf] sm:px-7"><div>What your audience feels</div><div className="text-[#ffc857]">DragonCraft</div><div>Typical builder</div></div>{rows.map((row, index) => <div key={row[0]} className="grid grid-cols-[1.15fr_1fr_1fr] border-b border-[#fff2d5]/[.07] px-4 py-5 last:border-0 sm:px-7"><div className="pr-3 text-sm text-[#fff2d5]">{row[0]}</div><div className="flex gap-2 pr-3 text-sm leading-5 text-[#ffc857]"><CheckCircle2 className="mt-0.5 shrink-0" size={15} />{row[1]}</div><div className="flex gap-2 text-sm leading-5 text-[#77698e]"><Minus className="mt-0.5 shrink-0" size={15} />{row[2]}</div>{showDetails && index === 3 && <div className="col-span-3 mt-3 border-t border-[#ffc857]/20 pt-3 font-mono text-[9px] uppercase tracking-[.1em] text-[#79dbd1]">Field note: brands with a remembered point of view earn the second visit.</div>}</div>)}</div></Reveal>
      </div>
    </section>
  );
}

function EvolutionSection() {
  const steps = [
    { n: '01', title: 'The spark', copy: 'Drop in the messy version. We listen for the tension inside it.', icon: Sparkles },
    { n: '02', title: 'The shape', copy: 'Your point of view becomes language, color, rhythm, and a name people remember.', icon: Layers3 },
    { n: '03', title: 'The flight', copy: 'Publish a conversion-ready world, then keep evolving as your signal gets stronger.', icon: Rocket },
  ];
  return <section className="relative overflow-hidden py-24 sm:py-32"><div className="dc-section"><Reveal><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="dc-kicker">04 / The evolution</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.06em] text-[#fff2d5] sm:text-6xl">From flicker<br /><span className="text-[#a89bbf]">to wildfire.</span></h2></div><p className="max-w-[300px] text-sm leading-6 text-[#a89bbf]">A little momentum, captured in a repeatable ritual you can bring to every launch.</p></div></Reveal><div className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-5">{steps.map((step, index) => { const Icon = step.icon; return <Reveal key={step.n} delay={index * .12}><div className="relative"><div className="mb-6 flex items-center justify-between"><span className="font-mono text-[11px] text-[#ffc857]">{step.n}</span>{index < 2 && <span className="hidden h-px flex-1 bg-[#fff2d5]/15 md:ml-5 md:block" />}</div><div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f20f75]/35 bg-[#f20f75]/10 text-[#ff7058]"><Icon size={23} /></div><h3 className="font-display text-2xl text-[#fff2d5]">{step.title}</h3><p className="mt-3 max-w-[290px] text-sm leading-6 text-[#a89bbf]">{step.copy}</p></div></Reveal>})}</div></div></section>;
}

function GallerySection({ onSelect }: { onSelect: (index: number) => void }) {
  return <section id="gallery" className="relative py-24 sm:py-32"><div className="dc-section"><Reveal><div className="flex items-end justify-between gap-5"><div><p className="dc-kicker">05 / Field notes</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.06em] text-[#fff2d5] sm:text-6xl">Worlds already<br /><span className="text-[#a89bbf]">in the wild.</span></h2></div><a href="#pricing" className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[.13em] text-[#ffc857] sm:flex" data-testid="link-gallery-pricing">See your options <ArrowRight size={13} /></a></div></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2">{galleryItems.map((item, index) => <Reveal key={item.title} delay={index * .07}><button onClick={() => onSelect(index)} className={`group relative min-h-[270px] w-full overflow-hidden rounded-3xl border border-[#fff2d5]/13 p-6 text-left ${item.tone === 'rose' ? 'bg-[#612151]' : item.tone === 'sun' ? 'bg-[#8d3e38]' : item.tone === 'aqua' ? 'bg-[#174b59]' : 'bg-[#39216b]'}`} data-testid={`card-gallery-${index}`}><div className="absolute inset-0 opacity-55 transition-transform duration-700 group-hover:scale-110" style={{ background: item.tone === 'rose' ? 'radial-gradient(circle at 76% 22%, #ff9b84, transparent 19%), linear-gradient(135deg, transparent 38%, #2a103f 39%, #ca3e78 70%, #ffc857)' : item.tone === 'sun' ? 'radial-gradient(circle at 48% 24%, #ffc857, transparent 20%), linear-gradient(135deg, #e04472, #ff9b57 55%, #703373)' : item.tone === 'aqua' ? 'radial-gradient(circle at 75% 25%, #79dbd1, transparent 18%), linear-gradient(145deg, #173565, #147b82 55%, #e16b68)' : 'radial-gradient(circle at 30% 35%, #f20f75, transparent 18%), linear-gradient(135deg, #17123e, #5f3ba3 60%, #ff7058)' }} /><div className="absolute -right-12 bottom-3 h-48 w-48 rounded-full border border-[#fff2d5]/30 opacity-50" /><div className="absolute -right-1 bottom-6 h-36 w-36 rounded-full border border-[#fff2d5]/20 opacity-60" /><div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between"><div className="flex justify-between"><span className="rounded-full border border-[#fff2d5]/25 bg-[#180c31]/25 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.12em] text-[#fff2d5]">{item.type}</span><ExternalLink size={16} className="text-[#fff2d5]/70 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><div><p className="font-mono text-[9px] uppercase tracking-[.14em] text-[#fff2d5]/75">{item.tag} realm</p><h3 className="mt-2 max-w-[270px] font-display text-2xl leading-[.98] text-[#fff2d5]">{item.title}</h3></div></div></button></Reveal>)}</div></div></section>;
}

function PricingSection({ onChoose }: { onChoose: (plan: string) => void }) {
  const plans = [
    { name: 'Novice Dragon', price: 'Free', copy: 'Your first 60 days in the realm, with no card required.', features: ['Standard AI Logo Forge', 'Micro-landing page previews', 'Basic transparent exports'], action: 'Start my 60 days' },
    { name: 'Ancient Dragon', price: '$0.99', copy: 'A tiny annual key to unlock the full creative arsenal.', features: ['4K SVG / PNG vector exports', 'Pro Anime Ink + Cyberpunk styles', 'AI copywriting + full HTML/CSS source', 'Crypto / USDT-ready payments'], action: 'Unlock Ancient', featured: true },
  ];
  return <section id="pricing" className="relative py-24 sm:py-32"><div className="dc-section"><Reveal><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="dc-kicker">06 / The offering</p><h2 className="mt-4 font-display text-4xl font-bold tracking-[-.06em] text-[#fff2d5] sm:text-6xl">Choose your<br /><span className="text-[#a89bbf]">starting spell.</span></h2></div><div className="flex items-center gap-2 rounded-full border border-[#79dbd1]/25 bg-[#79dbd1]/[.06] px-3 py-2 font-mono text-[9px] uppercase tracking-[.11em] text-[#79dbd1]"><LockKeyhole size={12} /> No card for the first flight</div></div></Reveal><div className="mx-auto mt-12 grid max-w-[920px] items-start gap-4 md:grid-cols-2">{plans.map((plan, index) => <Reveal key={plan.name} delay={index * .09}><div className={`relative rounded-3xl border p-6 sm:p-7 ${plan.featured ? 'border-[#f20f75]/70 bg-gradient-to-b from-[#63205e] to-[#2b1253] shadow-[0_20px_70px_rgba(242,15,117,.16)] md:-mt-5 md:pb-9' : 'border-[#fff2d5]/13 bg-[#2b1253]/32'}`}>{plan.featured && <div className="absolute -top-3 left-6 rounded-full bg-[#ffc857] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[.12em] text-[#180c31]">Full access key</div>}<div className="flex items-start justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#a89bbf]">{plan.name}</p><p className="mt-4 font-display text-4xl text-[#fff2d5]">{plan.price}<span className="font-sans text-sm text-[#a89bbf]">{plan.price !== 'Free' && ' / year'}</span></p></div><div className={`rounded-full p-2 ${plan.featured ? 'bg-[#f20f75]/20 text-[#ff7058]' : 'bg-[#fff2d5]/[.07] text-[#ffc857]'}`}><Zap size={16} /></div></div><p className="mt-5 min-h-12 text-sm leading-6 text-[#a89bbf]">{plan.copy}</p><div className="my-6 h-px bg-[#fff2d5]/10" /><ul className="space-y-3">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-[#e1d7e3]"><Check size={14} className="text-[#79dbd1]" />{feature}</li>)}</ul><button onClick={() => onChoose(plan.name)} className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[.12em] ${plan.featured ? 'dc-btn-primary' : 'dc-btn-secondary'}`} data-testid={`button-pricing-${plan.name.toLowerCase().replaceAll(' ', '-')}`}>{plan.action} <ArrowRight size={14} /></button></div></Reveal>)}</div></div></section>;
}

function SignInModal({
  onClose,
  onForge,
  session,
  loading,
  error,
  onGoogleSignIn,
  onSignOut,
}: {
  onClose: () => void;
  onForge: () => void;
  session: Session | null;
  loading: boolean;
  error: string;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
}) {
  const displayName = session?.user.user_metadata?.full_name || session?.user.email || 'DragonCraft member';
  return <div className="dc-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="signin-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.div initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="dc-glass-strong relative w-full max-w-[430px] rounded-3xl p-7 sm:p-9"><button onClick={onClose} className="absolute right-4 top-4 rounded-lg p-2 text-[#a89bbf] hover:bg-[#fff2d5]/10 hover:text-[#fff2d5]" aria-label="Close sign in" data-testid="button-close-sign-in"><X size={17} /></button><DragonMark /><p className="dc-kicker mt-7">{session ? 'Your signal is synced' : 'Your realm is waiting'}</p><h2 id="signin-title" className="mt-3 font-display text-3xl font-bold tracking-[-.05em] text-[#fff2d5]">{session ? 'Welcome back.' : 'Enter the forge.'}</h2><p className="mt-3 text-sm leading-6 text-[#a89bbf]">{session ? `Signed in as ${displayName}. Your protected tools are unlocked.` : 'Sign in with Google to save your realms, keep your sparks, and use the AI forge.'}</p>{session ? <div className="mt-7 rounded-2xl border border-[#79dbd1]/25 bg-[#79dbd1]/[.08] p-5" data-testid="status-signed-in"><CheckCircle2 className="text-[#79dbd1]" size={23} /><p className="mt-3 font-display text-lg text-[#fff2d5]">Access granted.</p><p className="mt-1 text-sm text-[#a89bbf]">Your Logo Forge, Web Architect, voice tools, and Forge Guide are ready.</p><div className="mt-5 flex gap-2"><button onClick={onForge} className="dc-btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em]" data-testid="button-signed-in-start-forge">Open the forge <ArrowRight size={13} /></button><button onClick={onSignOut} className="rounded-xl border border-[#fff2d5]/20 px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#a89bbf] hover:text-[#fff2d5]" data-testid="button-sign-out">Sign out</button></div></div> : <><button onClick={onGoogleSignIn} disabled={loading} className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-[#fff2d5]/20 bg-[#fff2d5]/[.07] px-4 py-3.5 font-mono text-[10px] uppercase tracking-[.12em] text-[#fff2d5] transition-colors hover:bg-[#fff2d5]/[.12] disabled:cursor-wait disabled:opacity-60" data-testid="button-google-sign-in"><Globe2 size={16} /> {loading ? 'Connecting to Google...' : 'Continue with Google'}</button>{error && <p className="mt-4 rounded-xl border border-[#ff7058]/30 bg-[#ff7058]/[.08] p-3 text-xs leading-5 text-[#ffb29c]" role="alert" data-testid="status-auth-error">{error}</p>}<p className="mt-5 text-center font-mono text-[9px] leading-5 text-[#77698e]">Google sign-in is required before using DragonCraft AI generation tools.</p></>}</motion.div></div>;
}

function ForgeModal({ realm, onClose, onSelectRealm }: { realm: Realm; onClose: () => void; onSelectRealm: (realm: Realm) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  return (
    <div
      className="dc-modal-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="dc-glass-strong relative my-8 w-full max-w-[700px] overflow-hidden rounded-3xl"
      >
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
          style={{ background: realm.color, opacity: 0.18 }}
        />
        <div className="relative flex items-center justify-between border-b border-[#fff2d5]/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <DragonMark small />
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.15em] text-[#a89bbf]">
                New realm / {realm.name}
              </p>
              <p className="font-display text-sm text-[#fff2d5]">The signal forge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#a89bbf] hover:bg-[#fff2d5]/10 hover:text-[#fff2d5]"
            aria-label="Close forge"
            data-testid="button-close-forge"
          >
            <X size={17} />
          </button>
        </div>

        <div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="dc-kicker">Pass 0{step} / 03</p>
            <div className="mt-6 space-y-4">
              {['Your spark', 'Your atmosphere', 'Your first flight'].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => setStep(index + 1)}
                    className={`flex w-full items-center gap-3 text-left ${
                      step === index + 1 ? 'text-[#fff2d5]' : 'text-[#77698e]'
                    }`}
                    data-testid={`button-forge-step-${index + 1}`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[9px] ${
                        step > index + 1
                          ? 'border-[#79dbd1] bg-[#79dbd1]/10 text-[#79dbd1]'
                          : step === index + 1
                            ? 'border-[#ffc857] bg-[#ffc857]/10 text-[#ffc857]'
                            : 'border-[#fff2d5]/15'
                      }`}
                    >
                      {step > index + 1 ? <Check size={13} /> : `0${index + 1}`}
                    </span>
                    <span className="font-display text-sm">{item}</span>
                  </button>
                ),
              )}
            </div>
            <div className="mt-12 hidden rounded-2xl border border-[#fff2d5]/10 bg-[#10071f]/35 p-4 md:block">
              <p className="font-mono text-[9px] uppercase tracking-[.12em] text-[#a89bbf]">
                Selected weather
              </p>
              <p className="mt-2 font-display text-xl" style={{ color: realm.accent }}>
                {realm.name}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#a89bbf]">{realm.copy}</p>
            </div>
          </div>

          <div className="min-h-[260px]">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-display text-3xl leading-tight text-[#fff2d5]">
                  What are you
                  <br />
                  <span className="text-[#ffc857]">bringing to life?</span>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#a89bbf]">
                  A name is nice. A sharp sentence is better.
                </p>
                <textarea
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="We are building..."
                  className="dc-input mt-7 min-h-[125px] resize-none rounded-xl p-4 text-sm placeholder:text-[#77698e]"
                  data-testid="input-forge-spark"
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-display text-3xl leading-tight text-[#fff2d5]">
                  Set the
                  <br />
                  <span style={{ color: realm.accent }}>temperature.</span>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#a89bbf]">
                  We tuned this demo to {realm.name}. You can switch realms from the
                  scanner anytime.
                </p>
                <div className="mt-7 grid gap-2">
                  {realms.map((option) => (
                    <button
                      onClick={() => onSelectRealm(option)}
                      key={option.id}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left ${
                        option.id === realm.id
                          ? 'border-[#ffc857]/60 bg-[#ffc857]/10'
                          : 'border-[#fff2d5]/12 bg-[#10071f]/25'
                      }`}
                      data-testid={`button-forge-atmosphere-${option.id}`}
                    >
                      <span className="font-display text-sm text-[#fff2d5]">{option.name}</span>
                      <Circle
                        size={13}
                        fill={option.id === realm.id ? option.accent : 'transparent'}
                        color={option.id === realm.id ? option.accent : '#77698e'}
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="font-display text-3xl leading-tight text-[#fff2d5]">
                  Ready to
                  <br />
                  <span className="dc-sunset-text">make an entrance?</span>
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#a89bbf]">
                  Your forge is warmed up. Start with a free realm scan, then decide
                  what deserves to become real.
                </p>
                <div className="mt-7 rounded-2xl border border-[#79dbd1]/25 bg-[#79dbd1]/[.07] p-4">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.12em] text-[#79dbd1]">
                    <CheckCircle2 size={14} /> Starter sequence prepared
                  </div>
                  <p className="mt-3 text-sm text-[#e1d7e3]">
                    {name || 'Your new idea'} / {realm.name} / first pass
                  </p>
                </div>
              </motion.div>
            )}
            <div className="mt-8 flex justify-between gap-3 border-t border-[#fff2d5]/10 pt-5">
              <button
                onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em] text-[#a89bbf] hover:text-[#fff2d5]"
                data-testid="button-forge-back"
              >
                {step > 1 && <ChevronLeft size={14} />} {step > 1 ? 'Back' : 'Cancel'}
              </button>
              <button
                onClick={() => (step < 3 ? setStep(step + 1) : onClose())}
                className="dc-btn-primary rounded-xl px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[.12em]"
                data-testid="button-forge-next"
              >
                {step < 3 ? 'Continue' : 'Enter the realm'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function GalleryModal({ index, onClose, onMove }: { index: number; onClose: () => void; onMove: (index: number) => void }) {
  const item = galleryItems[index];
  return <div className="dc-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} className={`relative min-h-[430px] w-full max-w-[760px] overflow-hidden rounded-3xl border border-[#fff2d5]/20 p-7 ${item.tone === 'rose' ? 'bg-[#612151]' : item.tone === 'sun' ? 'bg-[#8d3e38]' : item.tone === 'aqua' ? 'bg-[#174b59]' : 'bg-[#39216b]'}`}><div className="absolute inset-0 opacity-70" style={{ background: item.tone === 'rose' ? 'radial-gradient(circle at 76% 22%, #ff9b84, transparent 24%), linear-gradient(135deg, transparent 34%, #2a103f 35%, #ca3e78 72%, #ffc857)' : item.tone === 'sun' ? 'radial-gradient(circle at 48% 24%, #ffc857, transparent 23%), linear-gradient(135deg, #e04472, #ff9b57 55%, #703373)' : item.tone === 'aqua' ? 'radial-gradient(circle at 75% 25%, #79dbd1, transparent 23%), linear-gradient(145deg, #173565, #147b82 55%, #e16b68)' : 'radial-gradient(circle at 30% 35%, #f20f75, transparent 22%), linear-gradient(135deg, #17123e, #5f3ba3 60%, #ff7058)' }} /><button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-lg border border-[#fff2d5]/20 bg-[#180c31]/30 p-2 text-[#fff2d5]" aria-label="Close gallery" data-testid="button-close-gallery"><X size={17} /></button><div className="relative z-10 flex min-h-[370px] flex-col justify-end"><p className="font-mono text-[10px] uppercase tracking-[.15em] text-[#fff2d5]/75">{item.type} / {item.tag}</p><h2 className="mt-3 max-w-[540px] font-display text-4xl leading-[.95] text-[#fff2d5] sm:text-6xl">{item.title}</h2><p className="mt-5 max-w-[400px] text-sm leading-6 text-[#fff2d5]/75">{item.description}</p><div className="mt-7 flex items-center justify-between"><div className="flex gap-2"><button onClick={() => onMove((index - 1 + galleryItems.length) % galleryItems.length)} className="rounded-full border border-[#fff2d5]/25 p-3 text-[#fff2d5] hover:bg-[#fff2d5]/10" aria-label="Previous project" data-testid="button-gallery-prev"><ChevronLeft size={16} /></button><button onClick={() => onMove((index + 1) % galleryItems.length)} className="rounded-full border border-[#fff2d5]/25 p-3 text-[#fff2d5] hover:bg-[#fff2d5]/10" aria-label="Next project" data-testid="button-gallery-next"><ChevronRight size={16} /></button></div><span className="font-mono text-[10px] text-[#fff2d5]/70">{String(index + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}</span></div></div></motion.div></div>;
}

function Assistant({ requireAccess }: { requireAccess: (authorizedAction: () => void) => void }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  return <div className="fixed bottom-5 right-4 z-30 sm:bottom-7 sm:right-7"><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: 12, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }} className="dc-glass-strong mb-3 w-[calc(100vw-32px)] max-w-[330px] overflow-hidden rounded-2xl"><div className="flex items-center justify-between border-b border-[#fff2d5]/10 px-4 py-3"><div className="flex items-center gap-2"><div className="dc-pulse h-2 w-2 rounded-full bg-[#79dbd1]" /><p className="font-mono text-[10px] uppercase tracking-[.12em] text-[#fff2d5]">Forge guide</p></div><button onClick={() => setOpen(false)} className="text-[#a89bbf]" aria-label="Close forge guide" data-testid="button-close-assistant"><X size={14} /></button></div>{sent ? <div className="p-5"><CheckCircle2 className="text-[#79dbd1]" size={19} /><p className="mt-3 font-display text-lg text-[#fff2d5]">Signal received.</p><p className="mt-1 text-xs leading-5 text-[#a89bbf]">A real human will answer shortly.</p></div> : <div className="p-4"><p className="text-sm leading-6 text-[#d8cce2]">I can help you find the right realm. What are you building?</p><div className="mt-4 flex gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell me the spark..." className="dc-input rounded-lg px-3 py-2 text-xs placeholder:text-[#77698e]" data-testid="input-assistant-message" /><button onClick={() => message.trim() && requireAccess(() => setSent(true))} className="dc-btn-primary rounded-lg px-3" aria-label="Send assistant message" data-testid="button-send-assistant"><Send size={14} /></button></div></div>}</motion.div>}</AnimatePresence><button onClick={() => setOpen(!open)} className="dc-btn-primary dc-pulse flex h-12 w-12 items-center justify-center rounded-full shadow-[0_10px_30px_rgba(242,15,117,.38)]" aria-label="Open forge guide" data-testid="button-open-assistant">{open ? <X size={19} /> : <MessageCircle size={19} />}</button></div>;
}

function Footer({ onSignIn }: { onSignIn: () => void }) {
  return <footer className="border-t border-[#fff2d5]/10 py-10"><div className="dc-section flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><a href="#hero" className="flex items-center gap-3" data-testid="link-footer-brand"><DragonMark small /><span className="font-display text-sm font-bold tracking-[-.03em] text-[#fff2d5]">DRAGON<span className="text-[#ffc857]">CRAFT</span><sup className="ml-0.5 align-top font-mono text-[7px] text-[#f20f75]">AI</sup></span></a><p className="mt-4 max-w-[260px] text-xs leading-5 text-[#77698e]">A creative studio for founders with a world to build.</p></div><div className="flex flex-wrap items-center gap-x-6 gap-y-3"><a href="#studio" className="font-mono text-[9px] uppercase tracking-[.13em] text-[#a89bbf] hover:text-[#fff2d5]" data-testid="link-footer-studio">Studio</a><a href="#realms" className="font-mono text-[9px] uppercase tracking-[.13em] text-[#a89bbf] hover:text-[#fff2d5]" data-testid="link-footer-realms">Realms</a><button onClick={onSignIn} className="font-mono text-[9px] uppercase tracking-[.13em] text-[#a89bbf] hover:text-[#fff2d5]" data-testid="button-footer-sign-in">Sign in</button><a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#a89bbf] hover:text-[#ffc857]" aria-label="DragonCraft on Twitter" data-testid="link-footer-twitter"><Twitter size={16} /></a></div><p className="font-mono text-[9px] uppercase tracking-[.11em] text-[#77698e]">© 2025 DragonCraft AI</p></div></footer>;
}

type AuthIntent = 'forge' | 'studio' | 'voice' | 'assistant' | 'trial';

function Home() {
  const [activeRealm, setActiveRealm] = useState(realms[0]);
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [signInOpen, setSignInOpen] = useState(false);
  const [forgeOpen, setForgeOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [toast, setToast] = useState('');

  const resumePendingAction = (nextSession: Session | null) => {
    setSession(nextSession);
    setAuthLoading(false);
    if (!nextSession) return;

    const intent = window.sessionStorage.getItem('dragoncraft-auth-intent') as AuthIntent | null;
    if (!intent) return;
    window.sessionStorage.removeItem('dragoncraft-auth-intent');
    setSignInOpen(false);

    if (intent === 'forge') {
      setForgeOpen(true);
    } else if (intent === 'trial') {
      setToast('Google verified — your 60-day flight is ready.');
      document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
    } else if (intent === 'studio') {
      setToast('Google verified — the Signal Forge is unlocked.');
      document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
    } else if (intent === 'voice') {
      setToast('Google verified — Voice-to-Design is unlocked.');
    } else {
      setToast('Google verified — Forge Guide is unlocked.');
    }
  };

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setAuthError(error.message);
      resumePendingAction(data.session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) resumePendingAction(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    if (toast) {
      const timer = window.setTimeout(() => setToast(''), 2800);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [toast]);

  const openSignIn = () => {
    window.sessionStorage.removeItem('dragoncraft-auth-intent');
    setAuthError('');
    setSignInOpen(true);
  };

  const requestAuth = (intent: AuthIntent, authorizedAction: () => void) => {
    if (session) {
      authorizedAction();
      return;
    }
    window.sessionStorage.setItem('dragoncraft-auth-intent', intent);
    setAuthError('');
    setSignInOpen(true);
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthLoading(true);
    const redirectUrl = new URL(window.location.href);
    redirectUrl.search = '';
    redirectUrl.hash = '';
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl.toString() },
    });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setToast(`Sign out failed: ${error.message}`);
      return;
    }
    setSignInOpen(false);
    setToast('You have left the realm. Come back soon.');
  };

  const choosePlan = (plan: string) => {
    if (plan === 'Novice Dragon') {
      requestAuth('trial', () => {
        setToast('Novice Dragon mode unlocked — your 60-day flight is free.');
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      openSignIn();
    }
  };

  return <div className="dc-page dc-noise min-h-[100dvh]">
    <Header signedIn={Boolean(session)} onSignIn={openSignIn} onForge={() => requestAuth('forge', () => setForgeOpen(true))} />
    <main>
      <Hero realm={activeRealm} setRealm={setActiveRealm} onForge={() => requestAuth('forge', () => setForgeOpen(true))} onSignIn={openSignIn} />
      <Marquee />
      <StudioSection onForge={() => requestAuth('forge', () => setForgeOpen(true))} requireAccess={(action) => requestAuth('studio', action)} />
      <FeatureSection onForge={() => requestAuth('forge', () => setForgeOpen(true))} requireAccess={(action) => requestAuth('voice', action)} />
      <RealmsSection activeRealm={activeRealm} onSelect={setActiveRealm} />
      <BattleSection />
      <EvolutionSection />
      <GallerySection onSelect={setGalleryIndex} />
      <PricingSection onChoose={choosePlan} />
      <section className="relative overflow-hidden py-28 sm:py-40"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(242,15,117,.18),transparent_37%)]" /><div className="dc-section relative text-center"><Reveal><p className="dc-kicker">07 / Your turn</p><h2 className="mx-auto mt-5 max-w-[850px] font-display text-5xl font-bold leading-[.89] tracking-[-.08em] text-[#fff2d5] sm:text-8xl">Make the internet<br /><span className="dc-sunset-text">look twice.</span></h2><p className="mx-auto mt-7 max-w-[400px] text-sm leading-6 text-[#a89bbf]">The next memorable company starts as a sentence. Bring yours.</p><button onClick={() => requestAuth('forge', () => setForgeOpen(true))} className="dc-btn-primary mt-8 rounded-xl px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[.13em]" data-testid="button-final-forge">Enter the forge <ArrowRight size={15} /></button></Reveal></div></section>
    </main>
    <Footer onSignIn={openSignIn} />
    <a href="https://wa.me/213652742367?text=Hello%20DragonCraft%20Team%21%20I%20need%20support%20with%20my%20project." target="_blank" rel="noreferrer" className="fixed bottom-5 left-4 z-30 flex items-center gap-2 rounded-full border border-[#79dbd1]/30 bg-[#173f46]/85 px-3 py-2.5 text-[#79dbd1] shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1 sm:bottom-7 sm:left-7" data-testid="link-whatsapp-support"><MessageCircle size={16} /><span className="hidden font-mono text-[9px] uppercase tracking-[.1em] sm:inline">Talk to a human</span></a>
    <Assistant requireAccess={(action) => requestAuth('assistant', action)} />
    {toast && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#ffc857]/35 bg-[#2b1253] px-4 py-3 font-mono text-[10px] uppercase tracking-[.08em] text-[#ffc857] shadow-lg" data-testid="status-toast">{toast}</motion.div>}
    <AnimatePresence>{signInOpen && <SignInModal session={session} loading={authLoading} error={authError} onGoogleSignIn={handleGoogleSignIn} onSignOut={handleSignOut} onClose={() => setSignInOpen(false)} onForge={() => { setSignInOpen(false); requestAuth('forge', () => setForgeOpen(true)); }} />}</AnimatePresence>
    <AnimatePresence>{forgeOpen && <ForgeModal realm={activeRealm} onClose={() => setForgeOpen(false)} onSelectRealm={setActiveRealm} />}</AnimatePresence>
    <AnimatePresence>{galleryIndex !== null && <GalleryModal index={galleryIndex} onClose={() => setGalleryIndex(null)} onMove={setGalleryIndex} />}</AnimatePresence>
  </div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;