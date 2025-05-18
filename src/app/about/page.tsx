// src/app/about/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  FlagIcon,
  CalendarIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const timeline = [
  { year: '2015', label: 'Founded', icon: FlagIcon, desc: 'Began as a small maker studio driven by passion and creativity.' },
  { year: '2017', label: 'Scaled Up', icon: UsersIcon, desc: 'Opened a 10,000 sqft facility to meet growing demand and expand capabilities.' },
  { year: '2019', label: 'Global Reach', icon: GlobeAltIcon, desc: 'Served clients across 5 continents with diverse industry needs.' },
  { year: '2021', label: 'Innovation Lab', icon: AcademicCapIcon, desc: 'Established an in-house R&D center for next-gen materials and processes.' },
  { year: '2023', label: 'Enterprise Solutions', icon: CalendarIcon, desc: 'Collaborated with Fortune 500 companies on large-scale manufacturing.' },
];

const team = [
  { name: 'Aisha Khan', role: 'CEO & Co-Founder', img: 'https://i.pravatar.cc/150?img=47' },
  { name: 'David Liu', role: 'Head of Engineering', img: 'https://i.pravatar.cc/150?img=65' },
  { name: 'Maria Garcia', role: 'Lead Designer', img: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Alex Smith', role: 'Operations Manager', img: 'https://i.pravatar.cc/150?img=32' },
];

const values = [
  { title: 'Quality First', icon: ShieldCheckIcon, desc: 'Every part undergoes rigorous QA to exceed industry standards.' },
  { title: 'Innovation', icon: SparklesIcon, desc: 'Continuous R&D drives new materials, methods, and efficiencies.' },
  { title: 'Sustainability', icon: GlobeAltIcon, desc: 'Eco-friendly practices and recyclable materials reduce footprint.' },
];

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-28">
        <motion.div
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-[var(--color-background)] opacity-10 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-32 -left-32 w-56 h-56 bg-[var(--color-background)] opacity-10 rounded-full filter blur-2xl"
          animate={{ scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="relative container mx-auto px-6 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Print3DCo
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl opacity-90 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Pioneering additive manufacturing with strategic innovation, unmatched quality, and global service.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {[
            { title: 'Our Mission', text: 'Empower creators worldwide with sustainable, state-of-the-art 3D solutions.' },
            { title: 'Our Vision', text: 'To lead the industry as the premier additive manufacturing partner for every scale.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-10 bg-[var(--color-background)] rounded-3xl shadow-lg border-t-4 border-[var(--color-primary)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
            >
              <h2 className="text-3xl font-semibold mb-3 text-[var(--color-foreground)]">{item.title}</h2>
              <p className="text-[var(--color-foreground)/80] leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[var(--color-background)]/50">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-semibold text-center mb-12 text-[var(--color-foreground)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Journey
          </motion.h2>
          <div className="flex flex-col md:flex-row md:space-x-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                className="flex-1 mb-12 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[var(--color-secondary)]/20 rounded-full">
                  <item.icon className="h-8 w-8 text-[var(--color-secondary)]" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2 text-[var(--color-foreground)]">{item.year}</h3>
                <p className="text-center text-[var(--color-foreground)]/70 mb-1">{item.label}</p>
                <p className="text-center text-[var(--color-foreground)]/60 leading-relaxed px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.h2
          className="text-3xl font-semibold text-center mb-12 text-[var(--color-foreground)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, idx) => (
            <motion.div
              key={idx}
              className="text-center p-6 bg-[var(--color-background)] rounded-3xl shadow-lg border border-[var(--color-secondary)]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="mx-auto mb-4 w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--color-secondary)]/40">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-1">{m.name}</h3>
              <p className="text-[var(--color-foreground)]/80">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[var(--color-background)]/50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl font-semibold text-[var(--color-foreground)] mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Core Values
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                className="p-8 bg-[var(--color-background)] rounded-3xl shadow-lg border border-[var(--color-secondary)]/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[var(--color-secondary)]/20 rounded-full">
                  <v.icon className="h-8 w-8 text-[var(--color-secondary)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-foreground)]">{v.title}</h3>
                <p className="text-[var(--color-foreground)]/80 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[var(--color-secondary)] text-[var(--color-background)] text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Join Us On This Journey
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-background/80 mb-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Whether you’re a hobbyist, entrepreneur, or enterprise, partner with Print3DCo to unlock the full potential of 3D printing.
        </motion.p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-[var(--color-background)] hover:bg-[var(--color-background)/90] text-[var(--color-secondary)] font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1"
        >
          Contact Us
          <ArrowRightIcon className="h-5 w-5 ml-2 animate-arrow-forward" />
        </Link>
      </section>
    </div>
  );
}
