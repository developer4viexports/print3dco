// Display formatting helpers.

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export function formatINR(amount: number): string {
  if (!Number.isFinite(amount)) return '₹0.00';
  return inr.format(amount);
}

export function formatWeight(grams: number): string {
  if (!Number.isFinite(grams) || grams <= 0) return '0 g';
  if (grams >= 1000) return `${(grams / 1000).toFixed(2)} kg`;
  return `${grams.toFixed(1)} g`;
}

// Convert an mm length for display in the chosen unit.
export function formatLength(mm: number, unit: 'mm' | 'inch'): string {
  const value = unit === 'inch' ? mm / 25.4 : mm;
  return `${value.toFixed(2)} ${unit}`;
}

export function formatVolumeCm3(mm3: number): string {
  return `${(mm3 / 1000).toFixed(2)} cm³`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}
