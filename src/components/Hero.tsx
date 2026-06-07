// src/components/Hero.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ModelViewer from './ModelViewer';
import {
  ArrowRightIcon,
  BoltIcon,
  StarIcon,
  CheckBadgeIcon,
  PlayCircleIcon,
} from '@heroicons/react/24/solid';

const STATS = [
  { value: '50K+', label: 'Parts printed' },
  { value: '1 Day', label: 'Lead time' },
  { value: '36+', label: 'Colors' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-primary)] to-[var(--color-accent)] text-white">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* Glow blobs */}
      <motion.div
        className="absolute -top-40 -left-32 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-40 -right-24 w-[28rem] h-[28rem] bg-[var(--color-accent)] opacity-20 rounded-full blur-3xl"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 items-center gap-12">
        {/* Text */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 px-4 py-1.5 rounded-full text-sm font-medium">
            <BoltIcon className="h-4 w-4 text-[var(--color-accent)]" />
            Instant 3D printing quotes — upload &amp; order in minutes
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Turn your 3D models into
            <span className="block">
              <span className="bg-gradient-to-r from-white to-[var(--color-accent)] bg-clip-text text-transparent">
                real, precise parts
              </span>
            </span>
          </h1>

          <p className="text-lg text-white/90 max-w-xl">
            Upload an STL or OBJ file and get an instant, volume-based price. Choose from
            6 engineering materials, 36+ colors, and finishes — printed and shipped to your
            door in as little as one business day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition"
            >
              Get Instant Quote
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[var(--color-primary)] transition"
            >
              <PlayCircleIcon className="h-5 w-5" />
              See Demo
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="flex text-[var(--color-star)]">
                {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className="h-4 w-4" />)}
              </div>
              <span className="text-white/90">4.9/5 from 124+ orders</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <CheckBadgeIcon className="h-5 w-5 text-[var(--color-accent)]" />
              IP-protected &amp; confidential
            </div>
          </div>
        </motion.div>

        {/* 3D Viewer */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="relative w-full h-[420px] sm:h-[500px] bg-white/95 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/40">
            <ModelViewer />
            <span className="absolute top-4 left-4 text-xs font-medium text-[var(--color-muted)] bg-white/80 backdrop-blur px-3 py-1 rounded-full">
              Drag to rotate
            </span>
          </div>

          {/* Floating chips */}
          <motion.div
            className="absolute -left-4 top-10 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="h-9 w-9 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <BoltIcon className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div className="text-left">
              <p className="text-xs text-[var(--color-muted)]">Instant quote</p>
              <p className="text-sm font-bold text-[var(--color-foreground)]">₹ in seconds</p>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-2 bottom-8 bg-white rounded-2xl shadow-xl px-4 py-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-base font-extrabold text-[var(--color-primary)]">{s.value}</p>
                  <p className="text-[10px] text-[var(--color-muted)]">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] sm:h-[90px]">
          <path
            d="M0,64 C240,120 480,0 720,32 C960,64 1200,128 1440,72 L1440,120 L0,120 Z"
            fill="var(--color-background)"
          />
        </svg>
      </div>
    </section>
  );
}
