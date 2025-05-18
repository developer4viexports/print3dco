// src/app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: integrate API or email handler
        setSubmitted(true);
    };

    return (
        <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-background)] py-24">
                <motion.div
                    className="absolute -top-32 -left-32 w-72 h-72 bg-[var(--color-background)] opacity-10 rounded-full filter blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-32 -right-32 w-96 h-96 bg-[var(--color-background)] opacity-10 rounded-full filter blur-2xl"
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
                        Contact Us
                    </motion.h1>
                    <motion.p
                        className="max-w-2xl mx-auto text-lg md:text-xl opacity-90 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        We’re here to help—fill out the form below or reach us directly through the details provided.
                    </motion.p>
                </div>
            </section>

            {/* Contact Details & Form */}
            <section className="py-20 container mx-auto px-6 grid gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h2 className="text-3xl font-semibold text-[var(--color-foreground)]">Get In Touch</h2>
                    <p className="text-[var(--color-foreground)/80] leading-relaxed">
                        Have questions or need a custom quote? Our team is ready to assist you.
                    </p>

                    <div className="space-y-4 text-[var(--color-foreground)/80]">
                        <div className="flex items-center space-x-3">
                            <MapPinIcon className="h-6 w-6 text-[var(--color-secondary)]" />
                            <span>1234 Maker Street, Innovation City, 56789</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <EnvelopeIcon className="h-6 w-6 text-[var(--color-secondary)]" />
                            <span>support@print3dco.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <PhoneIcon className="h-6 w-6 text-[var(--color-secondary)]" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <motion.span
                                className="inline-block transform hover:scale-105 transition"
                            >
                                <span>⏰</span>
                            </motion.span>
                            <span>Mon–Fri: 9am–6pm IST</span>
                        </div>
                    </div>

                    {/* Social & Chat */}
                    <div className="flex space-x-4 mt-6">
                        <Link href="tel:+15551234567" className="inline-flex items-center px-4 py-2 bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/20 rounded-lg transition">
                            <PhoneIcon className="h-5 w-5 text-[var(--color-secondary)] mr-2" /> Call Us
                        </Link>
                        <Link href="mailto:support@print3dco.com" className="inline-flex items-center px-4 py-2 bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/20 rounded-lg transition">
                            <EnvelopeIcon className="h-5 w-5 text-[var(--color-secondary)] mr-2" /> Email Us
                        </Link>
                    </div>

                    {/* Map Embed */}
                    <div className="mt-8">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019916777266!2d-122.40104128468044!3d37.79422981975627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a4f4e3bd%3A0x6c5a7e7e1f2a9a91!2sInnovation%20City!5e0!3m2!1sen!2sus!4v1610000000000"
                            className="w-full h-64 rounded-2xl border-0 shadow-lg"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {submitted ? (
                        <motion.div
                            className="bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)] text-[var(--color-secondary)] p-8 rounded-2xl text-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CheckCircleIcon className="h-12 w-12 mx-auto text-[var(--color-secondary)] mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
                            <p className="text-[var(--color-foreground)]/80 leading-relaxed">
                                Your message has been received. We’ll be in touch soon.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6 bg-[var(--color-background)] p-8 rounded-2xl shadow-lg border border-[var(--color-secondary)]/20"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {['name', 'email', 'subject'].map((field) => (
                                <div key={field}>
                                    <label className="block mb-1 font-medium text-[var(--color-foreground)]" htmlFor={field}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        id={field}
                                        name={field}
                                        value={(formData as any)[field]}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-[var(--color-secondary)]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block mb-1 font-medium text-[var(--color-foreground)]" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-[var(--color-secondary)]/20 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[var(--color-secondary)] text-[var(--color-background)] px-6 py-3 rounded-full font-medium hover:bg-[var(--color-secondary)]/90 transition"
                            >
                                Send Message
                            </button>
                        </motion.form>
                    )}
                </motion.div>
            </section>

        </div>
    );
}
