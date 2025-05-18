// src/components/Hero.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ModelViewer from './ModelViewer';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)]">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute -top-32 -left-32 w-72 h-72 bg-[var(--color-background)] opacity-10 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--color-background)] opacity-10 rounded-full filter blur-2xl"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          className="w-full md:w-1/2 space-y-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Print Your Ideas in{' '}
            <span className="text-[var(--color-accent)] bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)]">
              3D
            </span>
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Instant quotes • Eco-friendly materials • AI-driven optimization
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center bg-[var(--color-accent)] hover:bg-[var(--color-accent)/90] text-[var(--color-background)] px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transform transition hover:-translate-y-1"
            >
              Upload Your Model
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center border-2 border-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-primary)] px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Try Demo
              <ArrowRightIcon className="h-5 w-5 ml-2 text-[var(--color-background)]" />
            </Link>
          </div>
        </motion.div>

        {/* 3D Viewer */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full h-[500px] bg-[var(--color-background)] rounded-2xl overflow-hidden shadow-2xl border-4 border-[var(--color-background)/30]">
            <ModelViewer />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="w-3 h-3 bg-[var(--color-background)] rounded-full"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </section>
  );
}
