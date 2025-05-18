// src/components/Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
    cartCount?: number;
}

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Materials', href: '/materials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header({ cartCount = 0 }: HeaderProps) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [menuOpen, setMenuOpen] = useState(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = stored || (prefersDark ? 'dark' : 'light');
        setTheme(initial);
        document.documentElement.classList.toggle('dark', initial === 'dark');
    }, []);

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        document.documentElement.classList.toggle('dark', next === 'dark');
        localStorage.setItem('theme', next);
    };

    return (
        <header className="top-0 z-50 bg-primary text-background shadow-lg border-b-2 border-secondary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-background">
                    Print3DCo
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 font-medium text-base text-foreground">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:underline decoration-accent decoration-2 underline-offset-4"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    {/* Cart Icon */}
                    <Link href="/cart" className="relative text-background">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437 M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-2 bg-secondary text-background rounded-full text-xs w-4 h-4 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Sign In */}
                    <Link
                        href="/login"
                        className="hidden md:inline-block border border-background px-4 py-1 rounded transform transition hover:scale-105 hover:bg-background hover:text-primary text-foreground"
                    >
                        Sign In
                    </Link>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md hover:bg-secondary/20 transition"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <MoonIcon className="h-6 w-6 text-background" />
                        ) : (
                            <SunIcon className="h-6 w-6 text-accent" />
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-secondary/20 transition text-background"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {menuOpen && (
                <nav className="md:hidden bg-primary text-background px-4 py-4 space-y-2 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 hover:underline decoration-accent decoration-2 underline-offset-4"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 border-t border-secondary/20"
                    >
                        Sign In
                    </Link>
                </nav>
            )}
        </header>
    )
}