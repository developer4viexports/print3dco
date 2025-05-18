// src/components/TestimonialsSection.tsx
'use client';

import React, { FC } from 'react';
import { StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface Testimonial {
    quote: string;
    author: string;
    title: string;
    rating: number;
    avatarUrl: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Outstanding print quality and attention to detail. My prototype was production-ready in no time!",
        author: 'Aria Johnson',
        title: 'Product Manager, AeroTech',
        rating: 5,
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
    },
    {
        quote: "The design consultation saved us weeks of iteration. Highly recommend their CAD expertise.",
        author: 'Michael Lee',
        title: 'Lead Engineer, RoboWorks',
        rating: 5,
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
    },
    {
        quote: "Bulk production was seamless—great communication, on-time delivery, and consistent quality.",
        author: 'Sofia Ramirez',
        title: 'Procurement Lead, MedTech Labs',
        rating: 5,
        avatarUrl: 'https://i.pravatar.cc/150?img=56',
    },
];

export const TestimonialsSection: FC = () => (
    <section className="relative py-24 bg-[var(--color-background)] overflow-hidden">
        {/* Decorative Elements */}
        <motion.div
            className="absolute -top-16 left-1/2 w-64 h-64 bg-[var(--color-secondary)] opacity-10 rounded-full filter blur-3xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <motion.h2
                className="text-4xl font-extrabold text-[var(--color-foreground)] text-center mb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                What Our Clients Say
            </motion.h2>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {TESTIMONIALS.map((t, idx) => (
                    <motion.div
                        key={idx}
                        className="group relative bg-[var(--color-background)] rounded-3xl p-8 shadow-md border border-[var(--color-secondary)/20] hover:shadow-2xl hover:border-[var(--color-secondary)] transition-transform transform hover:-translate-y-2"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.2 }}
                    >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-3 rounded-full">
                            <ChatBubbleLeftIcon className="h-8 w-8 text-[var(--color-background)]" />
                        </div>
                        <div className="mt-12 mb-6">
                            <p className="text-[var(--color-foreground)] italic text-lg leading-relaxed">
                                “{t.quote}”
                            </p>
                        </div>
                        <div className="flex items-center mb-4">
                            <img
                                src={t.avatarUrl}
                                alt={t.author}
                                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-4 border-[var(--color-background)] shadow-inner"
                            />
                            <div className="ml-4">
                                <p className="text-[var(--color-foreground)] font-semibold">{t.author}</p>
                                <p className="text-[var(--color-foreground)/60] text-sm">{t.title}</p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {Array.from({ length: 5 }, (_, j) => (
                                <StarIcon
                                    key={j}
                                    className={`h-5 w-5 mx-0.5 ${j < t.rating
                                        ? 'text-[var(--color-accent)]'
                                        : 'text-[var(--color-foreground)/40]'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);
