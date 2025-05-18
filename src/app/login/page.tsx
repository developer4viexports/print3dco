// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate login
    await new Promise(res => setTimeout(res, 1000));
    setLoading(false);
    if (email === 'user@example.com' && password === 'password') {
      // redirect or show success
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen flex items-center justify-center p-6">
      <motion.div
        className="max-w-md w-full bg-[var(--color-foreground)]/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-[var(--color-secondary)]/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-[var(--color-secondary)] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 bg-[var(--color-background)] border border-[var(--color-secondary)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-[var(--color-secondary)] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 bg-[var(--color-background)] border border-[var(--color-secondary)] rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="accent-[var(--color-primary)]"
              />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-[var(--color-primary)] hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center bg-[var(--color-primary)] text-[var(--color-background)] py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm opacity-80">Or continue with</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button className="p-2 bg-[var(--color-background)] border border-[var(--color-secondary)] rounded-full hover:bg-[var(--color-secondary)]/20 transition">
              <GlobeAltIcon className="h-6 w-6 text-[var(--color-primary)]" />
            </button>
            {/* Add more social icons here */}
          </div>
        </div>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{' '}
          <Link href="/register" className="text-[var(--color-primary)] hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
