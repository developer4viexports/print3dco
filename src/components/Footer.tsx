// src/components/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-[var(--color-primary)] text-[var(--color-background)]">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Company */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="hover:text-[var(--color-accent)]">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-[var(--color-accent)]">Careers</Link></li>
                        <li><Link href="/blog" className="hover:text-[var(--color-accent)]">Blog</Link></li>
                        <li><Link href="/press" className="hover:text-[var(--color-accent)]">Press</Link></li>
                    </ul>
                </div>
                {/* Services */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Services</h3>
                    <ul className="space-y-2">
                        <li><Link href="/services/printing" className="hover:text-[var(--color-accent)]">3D Printing</Link></li>
                        <li><Link href="/services/design" className="hover:text-[var(--color-accent)]">Design Consulting</Link></li>
                        <li><Link href="/services/bulk" className="hover:text-[var(--color-accent)]">Bulk Production</Link></li>
                        <li><Link href="/modeling" className="hover:text-[var(--color-accent)]">3D Modeling</Link></li>
                    </ul>
                </div>
                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><Link href="/contact" className="hover:text-[var(--color-accent)]">Contact</Link></li>
                        <li><Link href="/support" className="hover:text-[var(--color-accent)]">Support Center</Link></li>
                        <li><Link href="/faqs" className="hover:text-[var(--color-accent)]">FAQs</Link></li>
                        <li><Link href="/terms" className="hover:text-[var(--color-accent)]">Terms & Conditions</Link></li>
                        <li><Link href="/privacy" className="hover:text-[var(--color-accent)]">Privacy Policy</Link></li>
                    </ul>
                </div>
                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                    <p className="text-[var(--color-background)/80] mb-4">Subscribe for updates and exclusive offers.</p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Your email"
                            required
                            className="w-full px-4 py-2 rounded-md text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[var(--color-accent)] rounded-md font-medium hover:bg-[var(--color-accent)/90] transition text-[var(--color-background)]"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="border-t border-[var(--color-secondary)/40]">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-[var(--color-background)/70]">© {year} Print3DCo. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="https://twitter.com/print3dco" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                            {/* Twitter Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482A13.978 13.978 0 011.671 3.149a4.918 4.918 0 001.523 6.574A4.903 4.903 0 01.964 9.084v.062a4.92 4.92 0 003.946 4.827 4.902 4.902 0 01-2.212.084 4.926 4.926 0 004.6 3.417 9.868 9.868 0 01-6.102 2.104c-.395 0-.787-.023-1.175-.068a13.945 13.945 0 007.557 2.212c9.054 0 14-7.496 14-13.985 0-.213-.005-.425-.014-.637A9.935 9.935 0 0024 4.557z" />
                            </svg>
                        </Link>
                        <Link href="https://facebook.com/print3dco" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                            {/* Facebook Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.1h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.606h-3.12V24h6.116C23.406 24 24 23.406 24 22.675V1.326C24 .593 23.406 0 22.675 0z" />
                            </svg>
                        </Link>
                        <Link href="https://linkedin.com/company/print3dco" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">
                            {/* LinkedIn Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                                <path d="M20.452 20.452H17.4v-5.568c0-1.328-.028-3.036-1.852-3.036-1.855 0-2.14 1.447-2.14 2.942v5.662H9.306V9h2.933v1.561h.041c.41-.777 1.412-1.598 2.905-1.598 3.106 0 3.677 2.045 3.677 4.703v6.787zM5.337 7.433c-.944 0-1.705-.764-1.705-1.705C3.632 4.784 4.393 4 5.337 4c.944 0 1.706.784 1.706 1.728 0 .94-.762 1.705-1.706 1.705zm1.467 13.019H3.87V9h2.934v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.771v20.452C0 23.207.792 24 1.771 24h20.452C23.208 24 24 23.207 24 22.223V1.771C24 .771 23.208 0 22.225 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
