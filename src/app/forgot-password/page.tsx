// src/app/forgot-password/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CheckCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { isValidEmail } from 'src/utils/validators';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isValidEmail(email)) return setError('Please enter a valid email address.');
    setLoading(true);
    // Simulated reset email.
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="bg-[var(--color-surface)] min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card max-w-md w-full p-8"
      >
        {sent ? (
          <div className="text-center">
            <CheckCircleIcon className="h-14 w-14 text-[var(--color-success)] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Check your inbox</h1>
            <p className="text-[var(--color-muted)] mb-6">
              If an account exists for <span className="font-medium text-[var(--color-foreground)]">{email}</span>,
              we&apos;ve sent a password reset link.
            </p>
            <Link href="/login" className="btn-primary inline-block">Back to Sign In</Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-[var(--color-foreground)] mb-1">Forgot password?</h1>
            <p className="text-center text-[var(--color-muted)] mb-6">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            {error && <p className="text-[var(--color-primary)] text-sm mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="field pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>
            </form>

            <Link
              href="/login"
              className="mt-6 flex items-center justify-center gap-1 text-sm text-[var(--color-primary)] hover:underline"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back to Sign In
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}
