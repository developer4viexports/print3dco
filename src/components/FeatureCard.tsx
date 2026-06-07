// Small trust/feature badge card.
'use client';

import React from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: Props) {
  return (
    <div className="card p-5 flex items-start gap-3">
      <div className="text-[var(--color-primary)] shrink-0">{icon}</div>
      <div>
        <h4 className="font-semibold text-[var(--color-foreground)]">{title}</h4>
        <p className="text-sm text-[var(--color-muted)]">{description}</p>
      </div>
    </div>
  );
}
