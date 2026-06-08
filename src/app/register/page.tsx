// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { isValidEmail } from 'src/utils/validators';
import { useAuth } from 'src/hooks/useAuth';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) return setError('Please enter your name.');
    if (!isValidEmail(form.email)) return setError('Please enter a valid email address.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    if (!agree) return setError('Please accept the Terms to continue.');

    setLoading(true);
    try {
      await register(form.name.trim(), form.email, form.password);
      setDone(true);
      setTimeout(() => router.push('/account'), 1200);
    } catch (err) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Could not create account. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-[var(--color-surface)] min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full p-8 text-center"
        >
          <CheckCircleIcon className="h-14 w-14 text-[var(--color-success)] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">Account created!</h1>
          <p className="text-[var(--color-muted)] mb-6">
            Welcome aboard, {form.name.split(' ')[0]}. You can now sign in and start printing.
          </p>
          <Link href="/login" className="btn-primary inline-block">Go to Sign In</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card max-w-md w-full p-8"
      >
        <h1 className="text-3xl font-bold text-center text-[var(--color-foreground)] mb-1">Create account</h1>
        <p className="text-center text-[var(--color-muted)] mb-6">Join Print3DCo and bring your ideas to life.</p>

        {error && <p className="text-[var(--color-primary)] text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full name</label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input id="name" value={form.name} onChange={update('name')} required className="field pl-10" placeholder="Jane Maker" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input id="email" type="email" value={form.email} onChange={update('email')} required className="field pl-10" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={update('password')}
                required
                className="field pl-10 pr-10"
                placeholder="At least 6 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-1">Confirm password</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-[var(--color-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="confirm"
                type={showPassword ? 'text' : 'password'}
                value={form.confirm}
                onChange={update('confirm')}
                required
                className="field pl-10"
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-[var(--color-muted)]">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="accent-[var(--color-primary)] mt-1" />
            <span>
              I agree to the{' '}
              <Link href="/terms" className="text-[var(--color-primary)] hover:underline">Terms</Link> and{' '}
              <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link>.
            </span>
          </label>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-primary)] font-medium hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}
