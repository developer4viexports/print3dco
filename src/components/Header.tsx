// src/components/Header.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartStore, selectCount } from 'src/store/useStore';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: '3D Printing', href: '/upload' },
    { name: 'Services', href: '/services' },
    { name: 'Materials', href: '/materials' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [menuOpen, setMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const cartCount = useCartStore(selectCount);

    // Initialize theme from localStorage (default light).
    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const initial = stored || 'light';
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
        <header className="sticky top-0 z-50">
            {/* Utility bar */}
            <div className="bg-[var(--color-secondary)] text-white text-xs sm:text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center sm:justify-between gap-4">
                    <span className="hidden sm:inline">📦 Free shipping over ₹499 · ⏱️ 1-business-day lead time · 🔒 IP protection</span>
                    <span className="sm:hidden">Free shipping over ₹499 · 1-day lead time</span>
                    <span className="hidden md:inline opacity-90">Need help? info@print3dco.com</span>
                </div>
            </div>

            {/* Main bar */}
            <div className="bg-[var(--color-background)] border-b border-[var(--color-border)] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-extrabold tracking-tight">
                        <span className="text-[var(--color-primary)]">Print</span>
                        <span className="text-[var(--color-foreground)]">3DCo</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex space-x-6 font-medium text-[var(--color-foreground)]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="hover:text-[var(--color-primary)] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <Link
                            href="/upload"
                            className="hidden sm:inline-block btn-primary !py-2 !px-4 text-sm"
                        >
                            Get Instant Quote
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative text-[var(--color-foreground)] hover:text-[var(--color-primary)] transition-colors" aria-label="Cart">
                            <ShoppingCartIcon className="h-6 w-6" />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white rounded-full text-[10px] min-w-5 h-5 px-1 flex items-center justify-center font-semibold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link
                            href="/login"
                            className="hidden md:inline-block text-[var(--color-foreground)] hover:text-[var(--color-primary)] font-medium transition-colors"
                        >
                            Sign In
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-md hover:bg-[var(--color-surface)] transition text-[var(--color-foreground)]"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-[var(--color-surface)] transition text-[var(--color-foreground)]"
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
                    <nav className="lg:hidden bg-[var(--color-background)] border-t border-[var(--color-border)] px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 text-[var(--color-foreground)] hover:text-[var(--color-primary)]"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/upload"
                            onClick={() => setMenuOpen(false)}
                            className="block mt-2 btn-primary text-center"
                        >
                            Get Instant Quote
                        </Link>
                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 border-t border-[var(--color-border)] mt-2 text-[var(--color-foreground)]"
                        >
                            Sign In
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
