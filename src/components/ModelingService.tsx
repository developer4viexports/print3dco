// src/components/ModelingServicesSection.tsx
'use client';

import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    CubeIcon,
    ArrowsRightLeftIcon,
    PhotoIcon,
    AdjustmentsHorizontalIcon,
    SparklesIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

interface ModelingService {
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
}

const MODELING_SERVICES: ModelingService[] = [
    {
        title: 'CAD Modeling',
        description: 'Parametric CAD design with industry-grade accuracy.',
        icon: <CubeIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/cad',
    },
    {
        title: 'Reverse Engineering',
        description: 'Transform physical parts into editable 3D models.',
        icon: <ArrowsRightLeftIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/reverse-engineering',
    },
    {
        title: '3D Scanning',
        description: 'High-resolution scanning for precise digital replicas.',
        icon: <PhotoIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/3d-scanning',
    },
    {
        title: 'Parametric Modeling',
        description: 'Dynamic models that adapt via feature-driven parameters.',
        icon: <AdjustmentsHorizontalIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/parametric',
    },
    {
        title: 'Texture & Rendering',
        description: 'Photo-realistic materials, lighting, and previews.',
        icon: <SparklesIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/rendering',
    },
    {
        title: 'Assembly & Simulation',
        description: 'Motion analysis, interference checks, and stress testing.',
        icon: <Cog6ToothIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/assembly-simulation',
    },
    {
        title: 'Consulting & Training',
        description: 'Hands-on workshops and expert CAD mentorship.',
        icon: <UserGroupIcon className="h-12 w-12 text-[var(--color-secondary)]" />, link: '/modeling/consulting',
    },
];

export const ModelingServicesSection: FC = () => (
    <section className="relative py-28 bg-[var(--color-background)] overflow-hidden">
        {/* Background Accents */}
        <motion.div
            className="absolute -top-16 -left-16 w-64 h-64 bg-[var(--color-primary)] opacity-10 rounded-full filter blur-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--color-accent)] opacity-10 rounded-full filter blur-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <motion.h2
                className="text-5xl font-extrabold text-[var(--color-foreground)] text-center mb-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Complete 3D Modeling Services
            </motion.h2>

            <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {MODELING_SERVICES.map((svc, idx) => (
                    <motion.div
                        key={svc.title}
                        className="group relative bg-[var(--color-background)] rounded-3xl p-8 shadow-md border border-[var(--color-secondary)/20] hover:shadow-2xl hover:border-[var(--color-secondary)] transition-transform transform hover:-translate-y-2"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.15 }}
                    >
                        <span className="absolute inset-x-0 top-0 h-1 bg-[var(--color-secondary)] group-hover:bg-[var(--color-primary)] transition"></span>
                        <div className="flex items-center justify-center h-20 w-20 bg-[var(--color-background)] border-2 border-[var(--color-secondary)/20] rounded-full mx-auto mb-6">
                            {svc.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--color-foreground)] text-center group-hover:text-[var(--color-secondary)] transition mb-4">
                            {svc.title}
                        </h3>
                        <p className="text-[var(--color-foreground)/80] text-center leading-relaxed mb-6">
                            {svc.description}
                        </p>
                        <div className="text-center">
                            <Link href={svc.link}>
                                <motion.span
                                    className="inline-flex items-center text-[var(--color-secondary)] font-medium hover:underline"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    Learn More
                                    <ArrowRightIcon className="h-5 w-5 ml-1 animate-arrow-forward" />
                                </motion.span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
