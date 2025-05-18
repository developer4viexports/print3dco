// src/app/services/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CubeIcon,
  SparklesIcon,
  Cog6ToothIcon,
  PhotoIcon,
  ArrowsRightLeftIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function ServicesPage() {
  /* Data arrays */
  const printingServices = [
    {
      title: 'FDM Printing',
      description:
        'Affordable fused deposition modeling in PLA, ABS, PETG—ideal for functional prototypes and end-use parts.',
      icon: <CubeIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
      link: '/services/printing/fdm',
    },
    {
      title: 'SLA Printing',
      description:
        'High-resolution stereolithography for intricate details and smooth surface finishes.',
      icon: <SparklesIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
      link: '/services/printing/sla',
    },
    {
      title: 'SLS Printing',
      description:
        'Durable selective laser sintering in nylon and composites—perfect for functional assemblies.',
      icon: <Cog6ToothIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
      link: '/services/printing/sls',
    },
    {
      title: 'Resin Printing',
      description:
        'Photopolymer resin printing for ultra-fine resolution and smooth textures.',
      icon: <PhotoIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
      link: '/services/printing/resin',
    },
    {
      title: 'Metal Printing',
      description:
        'Direct metal laser sintering (DMLS) in stainless, aluminum, titanium alloys.',
      icon: <Cog6ToothIcon className="h-12 w-12 text-[var(--color-secondary)]" />,
      link: '/services/printing/metal',
    },
  ];

  const modelingServices = [
    { title: 'CAD Modeling', icon: <CubeIcon className="h-10 w-10 text-[var(--color-secondary)]" />, link: '/services/modeling/cad' },
    { title: 'Reverse Engineering', icon: <ArrowsRightLeftIcon className="h-10 w-10 text-[var(--color-secondary)]" />, link: '/services/modeling/reverse' },
    { title: '3D Scanning', icon: <PhotoIcon className="h-10 w-10 text-[var(--color-secondary)]" />, link: '/services/modeling/scanning' },
    { title: 'Parametric Design', icon: <AdjustmentsHorizontalIcon className="h-10 w-10 text-[var(--color-secondary)]" />, link: '/services/modeling/parametric' },
    { title: 'Rendering & Visualization', icon: <SparklesIcon className="h-10 w-10 text-[var(--color-secondary)]" />, link: '/services/modeling/rendering' },
    { title: 'Simulation & Analysis', icon: <CheckCircleIcon className="h-10 w-10 text-[var(--color-secondary)]" />, link: '/services/modeling/simulation' },
  ];

  const printerFleet = [
    { name: 'Ultimaker S5', category: 'FDM', specs: '330×240×300 mm · PLA/ABS/PETG · 20 µm layer', icon: <CubeIcon className="h-8 w-8 text-[var(--color-primary)]" /> },
    { name: 'Formlabs Form 3', category: 'SLA', specs: '145×145×185 mm · Multiple Resins · 25 µm layer', icon: <PhotoIcon className="h-8 w-8 text-[var(--color-primary)]" /> },
    { name: 'EOS P 396', category: 'SLS', specs: '340×340×600 mm · Nylon PA12 · 100 µm layer', icon: <Cog6ToothIcon className="h-8 w-8 text-[var(--color-primary)]" /> },
    { name: 'Markforged Metal X', category: 'Metal', specs: '120×120×100 mm · Stainless Steel · 50 µm layer', icon: <Cog6ToothIcon className="h-8 w-8 text-[var(--color-primary)]" /> },
  ];

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-24">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[var(--color-background)] opacity-10 rounded-full filter blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--color-background)] opacity-10 rounded-full filter blur-2xl" />
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Our Services</h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90">
            From rapid prototyping to full-scale production and expert CAD modeling—our turnkey 3D services cover every stage of your project.
          </p>
        </div>
      </section>

      {/* Printing Services */}
      <section className="py-20 container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >3D Printing Services</motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {printingServices.map((svc, i) => (
            <motion.div
              key={svc.title}
              className="group bg-[var(--color-background)] rounded-2xl p-8 border border-[var(--color-secondary)/20] shadow-md hover:shadow-xl hover:border-[var(--color-secondary)] transform hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-[var(--color-secondary)/10] rounded-full mb-6 group-hover:bg-[var(--color-secondary)/20] transition">
                {svc.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--color-secondary)] transition">{svc.title}</h3>
              <p className="text-[var(--color-foreground)/80] leading-relaxed mb-4">{svc.description}</p>
              <Link href={svc.link} className="inline-flex items-center text-[var(--color-accent)] font-medium hover:underline">
                Learn More <ArrowRightIcon className="h-5 w-5 ml-1 animate-arrow-forward" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modeling Services */}
      <section className="py-20 bg-[var(--color-secondary)/10]">
        <div className="container mx-auto px-6">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            3D Modeling & CAD Services
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modelingServices.map((m, i) => (
              <motion.div
                key={m.title}
                className="flex items-center space-x-4 bg-[var(--color-background)] p-6 rounded-xl border border-[var(--color-secondary)/20] shadow-sm hover:shadow-md transition"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              >
                <div className="p-3 bg-[var(--color-secondary)/10] rounded-md">{m.icon}</div>
                <span className="font-medium text-[var(--color-foreground)]">{m.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Printer Fleet */}
      <section className="py-20 container mx-auto px-6">
        <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Our Printer Fleet
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {printerFleet.map((p, i) => (
            <motion.div
              key={p.name}
              className="bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-secondary)/20] shadow-md hover:shadow-xl transition"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-[var(--color-primary)/10] rounded-full mr-4">{p.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-foreground)]">{p.name}</h3>
                  <p className="text-[var(--color-foreground)/70] text-sm">{p.category}</p>
                </div>
              </div>
              <p className="text-[var(--color-foreground)/70] text-sm leading-relaxed">{p.specs}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[var(--color-secondary)] text-[var(--color-background)] text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Ready to Start Your Project?
        </motion.h2>
        <motion.p className="max-w-2xl mx-auto mb-8 opacity-80" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Get in touch with our team for a custom quote, design consultation, or material recommendations.
        </motion.p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent)/90] text-[var(--color-background)] font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1"
        >
          Contact Us <ArrowRightIcon className="h-5 w-5 ml-2 animate-arrow-forward" />
        </Link>
      </section>
    </div>
  );
}
