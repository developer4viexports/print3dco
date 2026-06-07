// Reviews tab: average rating, list, and a star-rating submit form.
'use client';

import React, { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { listReviews, submitReview } from 'src/services/orderService';
import { formatDate } from 'src/utils/formatters';
import type { ReviewDTO } from 'src/types';

function Stars({ value, onSelect }: { value: number; onSelect?: (n: number) => void }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={!onSelect}
          onClick={() => onSelect?.(n)}
          className={onSelect ? 'cursor-pointer' : 'cursor-default'}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          <StarIcon
            className={`h-5 w-5 ${n <= value ? 'text-[var(--color-star)]' : 'text-[var(--color-border)]'}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ProductReviews() {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setReviews(await listReviews());
    } catch {
      setError('Could not load reviews. Is the database running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !body.trim()) {
      setError('Please add your name and a comment.');
      return;
    }
    setSubmitting(true);
    try {
      const created = await submitReview({ name: name.trim(), rating, body: body.trim() });
      setReviews((prev) => [created, ...prev]);
      setName('');
      setBody('');
      setRating(5);
    } catch {
      setError('Could not submit review. Is the database running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* List */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-extrabold text-[var(--color-foreground)]">{avg.toFixed(1)}</span>
          <div>
            <Stars value={Math.round(avg)} />
            <p className="text-xs text-[var(--color-muted)]">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-[var(--color-muted)]">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-[var(--color-muted)]">No reviews yet. Be the first!</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="card p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[var(--color-foreground)]">{r.name}</span>
                  <Stars value={r.rating} />
                </div>
                <p className="text-sm text-[var(--color-foreground)] mt-1">{r.body}</p>
                <p className="text-xs text-[var(--color-muted)] mt-1">{formatDate(r.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-[var(--color-foreground)]">Write a review</h3>
        <form onSubmit={handleSubmit} className="card p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Your rating</label>
            <Stars value={rating} onSelect={setRating} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="rev-name">Name</label>
            <input id="rev-name" className="field" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="rev-body">Comment</label>
            <textarea id="rev-body" className="field resize-none" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
          {error && <p className="text-sm text-[var(--color-primary)]">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50">
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
