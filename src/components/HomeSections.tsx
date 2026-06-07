// Rich home-page sections for the 3D printing service.
'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Disclosure } from '@headlessui/react';
import {
  ArrowUpTrayIcon,
  AdjustmentsHorizontalIcon,
  CubeTransparentIcon,
  TruckIcon,
  ChevronDownIcon,
  CheckBadgeIcon,
  BoltIcon,
  ShieldCheckIcon,
  CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';
import {
  BuildingOffice2Icon,
  HeartIcon,
  AcademicCapIcon,
  SparklesIcon,
  CpuChipIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  CubeIcon,
} from '@heroicons/react/24/solid';
import { MATERIALS, COLORS } from 'src/lib/pricing';
import { formatINR } from 'src/utils/formatters';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

const SectionHeading: FC<{ eyebrow?: string; title: string; subtitle?: string }> = ({
  eyebrow,
  title,
  subtitle,
}) => (
  <div className="text-center max-w-2xl mx-auto mb-14">
    {eyebrow && (
      <span className="text-[var(--color-primary)] font-semibold tracking-wide uppercase text-sm">
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-foreground)] mt-2">{title}</h2>
    {subtitle && <p className="text-[var(--color-muted)] mt-4 text-lg">{subtitle}</p>}
  </div>
);

/* ---------------- Stats bar ---------------- */
const STATS = [
  { value: '50,000+', label: 'Parts printed' },
  { value: '6', label: 'Material families' },
  { value: `${COLORS.length}+`, label: 'Color options' },
  { value: '1 Day', label: 'Avg. lead time' },
  { value: '4.9/5', label: 'Customer rating' },
  { value: '99.2%', label: 'On-time delivery' },
];

export const StatsBar: FC = () => (
  <section className="bg-[var(--color-secondary)] text-white">
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
      {STATS.map((s) => (
        <motion.div key={s.label} {...fadeUp}>
          <p className="text-3xl font-extrabold">{s.value}</p>
          <p className="text-sm text-white/80 mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ---------------- How it works ---------------- */
const STEPS = [
  { icon: ArrowUpTrayIcon, title: 'Upload your model', desc: 'Drag & drop an STL or OBJ file. We auto-analyze its geometry instantly.' },
  { icon: AdjustmentsHorizontalIcon, title: 'Configure & quote', desc: 'Pick material, color, infill and finish — the price updates live.' },
  { icon: CubeTransparentIcon, title: 'We print it', desc: 'Production-grade FDM & resin printing with strict quality checks.' },
  { icon: TruckIcon, title: 'Fast delivery', desc: 'Most orders ship the next business day, free over ₹499.' },
];

export const HowItWorks: FC = () => (
  <section className="py-24 bg-[var(--color-background)]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Simple process"
        title="From idea to doorstep in 4 steps"
        subtitle="No quotes to wait for, no back-and-forth. Upload, configure, and order in minutes."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((s, i) => (
          <motion.div key={s.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="card p-6 text-center relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
              {i + 1}
            </div>
            <div className="h-14 w-14 rounded-full bg-[var(--color-surface)] flex items-center justify-center mx-auto mt-3 mb-4">
              <s.icon className="h-7 w-7 text-[var(--color-primary)]" />
            </div>
            <h3 className="font-semibold text-[var(--color-foreground)]">{s.title}</h3>
            <p className="text-sm text-[var(--color-muted)] mt-2">{s.desc}</p>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/upload" className="btn-primary inline-block">Get your instant quote →</Link>
      </div>
    </div>
  </section>
);

/* ---------------- Materials showcase ---------------- */
const MATERIAL_BLURB: Record<string, string> = {
  PLA: 'Easy, detailed & eco-friendly — perfect for prototypes and display models.',
  ABS: 'Tough & heat-resistant — great for functional, durable parts.',
  PETG: 'Strong, food-safe & flexible — ideal for mechanical and outdoor use.',
  NYLON: 'High strength & wear resistance — engineering-grade components.',
  RESIN: 'Ultra-fine detail — miniatures, jewelry and dental models.',
  TPU: 'Rubber-like & flexible — gaskets, grips and wearables.',
};

export const MaterialsShowcase: FC = () => (
  <section className="py-24 bg-[var(--color-surface)]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading
        eyebrow="Materials"
        title="Engineering materials for every job"
        subtitle="From everyday prototypes to functional end-use parts — pick what fits your project."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(MATERIALS).map((m, i) => (
          <motion.div key={m.key} {...fadeUp} transition={{ delay: i * 0.05 }} className="card p-6 bg-[var(--color-background)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-[var(--color-foreground)]">{m.key}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-muted)]">{m.tech}</span>
            </div>
            <p className="text-sm text-[var(--color-muted)] mb-4">{MATERIAL_BLURB[m.key]}</p>
            <div className="flex items-center justify-between text-sm border-t border-[var(--color-border)] pt-3">
              <span className="text-[var(--color-muted)]">Density {m.density} g/cm³</span>
              <span className="font-semibold text-[var(--color-primary)]">from {formatINR(m.price)}/g</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Color palette */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">{COLORS.length}+ colors to choose from</h3>
        <p className="text-[var(--color-muted)] mb-6">Match your brand or your imagination.</p>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {COLORS.map((c) => (
            <span
              key={c.key}
              title={c.name}
              style={{ backgroundColor: c.hex }}
              className="w-8 h-8 rounded-full border border-[var(--color-border)] shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Why choose us ---------------- */
const WHY = [
  { icon: BoltIcon, title: 'Instant quotation', desc: 'Real volume-based pricing the moment you upload — no waiting on emails.' },
  { icon: CheckBadgeIcon, title: 'Production quality', desc: 'Calibrated printers and per-order QA on every single part.' },
  { icon: ShieldCheckIcon, title: 'IP protection', desc: 'Your files are confidential and never shared. Your ideas stay yours.' },
  { icon: CurrencyRupeeIcon, title: 'Fair pricing', desc: 'Transparent breakdown and volume discounts for makers & businesses.' },
];

export const WhyChooseUs: FC = () => (
  <section className="py-24 bg-[var(--color-background)]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading eyebrow="Why Print3DCo" title="Built for makers and businesses alike" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY.map((w, i) => (
          <motion.div key={w.title} {...fadeUp} transition={{ delay: i * 0.1 }} className="card p-6">
            <w.icon className="h-9 w-9 text-[var(--color-primary)] mb-3" />
            <h3 className="font-semibold text-[var(--color-foreground)]">{w.title}</h3>
            <p className="text-sm text-[var(--color-muted)] mt-2">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Industries ---------------- */
const INDUSTRIES = [
  { icon: RocketLaunchIcon, label: 'Aerospace' },
  { icon: WrenchScrewdriverIcon, label: 'Automotive' },
  { icon: HeartIcon, label: 'Medical & Dental' },
  { icon: AcademicCapIcon, label: 'Education' },
  { icon: SparklesIcon, label: 'Jewelry' },
  { icon: BuildingOffice2Icon, label: 'Architecture' },
  { icon: CpuChipIcon, label: 'Robotics' },
  { icon: CubeIcon, label: 'Consumer Goods' },
];

export const IndustriesSection: FC = () => (
  <section className="py-24 bg-[var(--color-surface)]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionHeading eyebrow="Industries" title="Trusted across industries" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {INDUSTRIES.map((ind, i) => (
          <motion.div
            key={ind.label}
            {...fadeUp}
            transition={{ delay: i * 0.05 }}
            className="card p-6 bg-[var(--color-background)] flex flex-col items-center gap-3 text-center hover:-translate-y-1 transition"
          >
            <ind.icon className="h-8 w-8 text-[var(--color-secondary)]" />
            <span className="font-medium text-[var(--color-foreground)]">{ind.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- FAQ ---------------- */
const FAQS = [
  { q: 'Which file formats can I upload?', a: 'We accept STL and OBJ files up to 50 MB. After upload we automatically compute the model volume to generate your quote.' },
  { q: 'How is the price calculated?', a: 'Price is based on the real volume of your model, the selected material density and rate, infill percentage, print quality and finish — multiplied by quantity. You see a full breakdown before ordering.' },
  { q: 'What is the typical turnaround time?', a: 'Most orders ship within 1 business day. Larger or batch orders may take longer; you will see an estimate at checkout.' },
  { q: 'Do you offer discounts for bulk orders?', a: 'Yes. Use coupon codes like SAVE10 or SAVE20, and check our Pricing page for volume plans tailored to businesses.' },
  { q: 'Is my design kept confidential?', a: 'Absolutely. Your uploaded files and designs are private, never shared, and protected by our IP policy.' },
  { q: 'Which material should I pick?', a: 'PLA for detailed prototypes, ABS/PETG for functional parts, Nylon for strength, Resin for fine detail, and TPU for flexible parts. Hover the material in the configurator for guidance.' },
];

export const FaqSection: FC = () => (
  <section className="py-24 bg-[var(--color-background)]">
    <div className="max-w-3xl mx-auto px-6">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      <div className="space-y-3">
        {FAQS.map((f) => (
          <Disclosure key={f.q}>
            {({ open }) => (
              <div className="card overflow-hidden">
                <Disclosure.Button className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-[var(--color-foreground)]">
                  {f.q}
                  <ChevronDownIcon className={`h-5 w-5 text-[var(--color-primary)] transition ${open ? 'rotate-180' : ''}`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-5 pb-4 text-sm text-[var(--color-muted)]">
                  {f.a}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Final CTA band ---------------- */
export const CtaBand: FC = () => (
  <section className="py-20 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-extrabold mb-4">
        Ready to bring your idea to life?
      </motion.h2>
      <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="text-white/90 text-lg mb-8">
        Upload your 3D model and get an instant, accurate quote in seconds.
      </motion.p>
      <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/upload" className="bg-white text-[var(--color-primary)] font-semibold px-8 py-4 rounded-full hover:opacity-90 transition">
          Get Instant Quote
        </Link>
        <Link href="/materials" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-[var(--color-primary)] transition">
          Explore Materials
        </Link>
      </motion.div>
    </div>
  </section>
);
