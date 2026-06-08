// src/components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  TruckIcon,
  ClockIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const LINKS = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'Instant Quote', href: '/upload' },
    { label: '3D Printing', href: '/services' },
    { label: 'Bulk Production', href: '/services' },
    { label: '3D Modeling', href: '/services' },
  ],
  Support: [
    { label: 'Materials', href: '/materials' },
    { label: 'Your Cart', href: '/cart' },
    { label: 'Track Order', href: '/track' },
    { label: 'Sign In', href: '/login' },
  ],
};

const TRUST = [
  { icon: TruckIcon, label: 'Free shipping over ₹499' },
  { icon: ClockIcon, label: '1-business-day lead time' },
  { icon: ShieldCheckIcon, label: 'IP-protected uploads' },
  { icon: LockClosedIcon, label: 'Secure checkout' },
];

const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/print3dco',
    path: 'M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.918 4.918 0 001.523 6.574A4.903 4.903 0 01.964 9.084v.062a4.92 4.92 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.926 4.926 0 004.6 3.417 9.868 9.868 0 01-6.102 2.104c-.395 0-.787-.023-1.175-.068a13.945 13.945 0 007.557 2.212c9.054 0 14-7.496 14-13.985 0-.213-.005-.425-.014-.637A9.935 9.935 0 0024 4.557z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/print3dco',
    path: 'M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.1h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.606h-3.12V24h6.116C23.406 24 24 23.406 24 22.675V1.326C24 .593 23.406 0 22.675 0z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/print3dco',
    path: 'M20.452 20.452H17.4v-5.568c0-1.328-.028-3.036-1.852-3.036-1.855 0-2.14 1.447-2.14 2.942v5.662H9.306V9h2.933v1.561h.041c.41-.777 1.412-1.598 2.905-1.598 3.106 0 3.677 2.045 3.677 4.703v6.787zM5.337 7.433c-.944 0-1.705-.764-1.705-1.705C3.632 4.784 4.393 4 5.337 4c.944 0 1.706.784 1.706 1.728 0 .94-.762 1.705-1.706 1.705zm1.467 13.019H3.87V9h2.934v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.771v20.452C0 23.207.792 24 1.771 24h20.452C23.208 24 24 23.207 24 22.223V1.771C24 .771 23.208 0 22.225 0z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/print3dco',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1220] text-slate-300">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <t.icon className="h-6 w-6 text-[var(--color-accent)] shrink-0" />
              <span className="text-sm">{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="text-2xl font-extrabold">
            <span className="text-[var(--color-accent)]">Print</span>
            <span className="text-white">3DCo</span>
          </Link>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            Instant-quote 3D printing service. Upload your model, configure material &amp;
            color, and get production-grade parts delivered fast.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-[var(--color-accent)]" />
              <a href="mailto:info@print3dco.com" className="text-slate-300 hover:text-white">info@print3dco.com</a>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-[var(--color-accent)]" />
              <a href="tel:+918000000000" className="text-slate-300 hover:text-white">+91 80000 00000</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPinIcon className="h-5 w-5 text-[var(--color-accent)] shrink-0" />
              <span>Pune, Maharashtra, India</span>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading}>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">{heading}</h3>
            <ul className="space-y-2.5 text-sm">
              {items.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-[var(--color-accent)] transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Newsletter</h3>
          <p className="text-sm text-slate-400 mb-4">Get printing tips &amp; exclusive offers.</p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:opacity-90 text-white px-4 py-2.5 rounded-lg font-medium transition"
            >
              Subscribe <ArrowRightIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 text-center">
            © {year} Print3DCo. All rights reserved. ·{' '}
            <Link href="/privacy" className="text-slate-400 hover:text-white">Privacy</Link> ·{' '}
            <Link href="/terms" className="text-slate-400 hover:text-white">Terms</Link>
          </p>
          <div className="flex space-x-3">
            {SOCIALS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-[var(--color-primary)] flex items-center justify-center transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5">
                  <path d={s.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
