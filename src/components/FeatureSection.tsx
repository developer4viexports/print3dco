// src/components/FeatureSection.tsx
'use client';

import React, { FC } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export const FeatureSection: FC = () => (
    <section className="relative py-24 bg-[var(--color-background)] overflow-hidden">
        {/* Decorative Dots */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-[var(--color-primary)] opacity-10 rounded-full filter blur-2xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-[var(--color-secondary)] opacity-10 rounded-full filter blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-16">
            {/* Text Content */}
            <motion.div
                className="lg:w-1/2 space-y-8"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-5xl font-extrabold text-[var(--color-foreground)] leading-tight">
                    Professional 3D Printing <br /> Solutions
                </h2>
                <p className="text-lg text-[var(--color-foreground)/80] leading-relaxed">
                    End-to-end printing, design, and prototyping—scalable for startups to enterprises. Let our experts optimize your project for speed, cost, and quality.
                </p>
                <motion.ul
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {['Rapid prototyping', 'Quality assurance', 'Custom material selection'].map((feat) => (
                        <motion.li
                            key={feat}
                            className="flex items-center"
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                        >
                            <CheckCircleIcon className="h-6 w-6 text-[var(--color-secondary)] flex-shrink-0" />
                            <span className="ml-3 text-[var(--color-foreground)] font-medium">{feat}</span>
                        </motion.li>
                    ))}
                </motion.ul>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 100 }}
                >
                    <a
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary)/90] text-[var(--color-background)] font-semibold rounded-full shadow-lg transform transition hover:-translate-y-1"
                    >
                        Get Started
                        <ArrowRightIcon className="h-5 w-5 ml-2 animate-arrow-forward" />
                    </a>
                </motion.div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
                className="lg:w-1/2 flex justify-center"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="relative w-full max-w-md">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-3xl blur-xl opacity-30 animate-pulse" />
                    <img
                        src="/images/3d-printing-hero.png"
                        alt="3D printing illustration"
                        className="relative rounded-3xl shadow-2xl"
                    />
                </div>
            </motion.div>
        </div>
    </section>
);
