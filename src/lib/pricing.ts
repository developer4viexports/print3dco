// Single source of truth for the instant-quote pricing model.
// Imported by the client (live price), the server (/api/quote recompute),
// and the Prisma seed (reference Material/Color tables).
//
// Pricing model (all amounts in INR):
//   weight(g)   = effectiveVolume(cm^3) * density(g/cm^3)
//   base        = weight * material.price(per g) * finishMult * qualityMult
//   unitPrice   = max(base, MIN_ITEM_PRICE)
//   total       = unitPrice * quantity
// effectiveVolume accounts for infill: a printed part is a solid shell plus a
// sparse lattice, so it uses far less material than its solid volume.

export interface MaterialInfo {
  key: string;
  name: string;
  tech: string;
  density: number; // g/cm^3
  price: number; // INR per gram
  unit: 'g';
}

export const MATERIALS: Record<string, MaterialInfo> = {
  PLA: { key: 'PLA', name: 'PLA (Polylactic Acid)', tech: 'FDM', density: 1.24, price: 3.5, unit: 'g' },
  ABS: { key: 'ABS', name: 'ABS (Acrylonitrile Butadiene Styrene)', tech: 'FDM', density: 1.04, price: 3.8, unit: 'g' },
  PETG: { key: 'PETG', name: 'PETG (Polyethylene Terephthalate Glycol)', tech: 'FDM', density: 1.27, price: 4.5, unit: 'g' },
  NYLON: { key: 'NYLON', name: 'Nylon (Polyamide)', tech: 'FDM / SLS', density: 1.15, price: 9.0, unit: 'g' },
  RESIN: { key: 'RESIN', name: 'Resin (Photopolymer)', tech: 'SLA / DLP / MSLA', density: 1.2, price: 12.0, unit: 'g' },
  TPU: { key: 'TPU', name: 'TPU (Flexible)', tech: 'FDM', density: 1.21, price: 7.5, unit: 'g' },
};

export const MATERIAL_KEYS = Object.keys(MATERIALS);

// Layer quality / nozzle. Finer layers take longer and cost more.
export const QUALITY: Record<string, { label: string; mult: number }> = {
  '0.4mm': { label: 'Standard (0.20 mm layers · 0.4 mm nozzle)', mult: 1.0 },
  '0.2mm': { label: 'High detail (0.12 mm layers · 0.2 mm nozzle)', mult: 1.3 },
  '0.6mm': { label: 'Draft (0.30 mm layers · 0.6 mm nozzle)', mult: 0.85 },
};

export const FINISHES: Record<string, { label: string; mult: number }> = {
  None: { label: 'As printed', mult: 1.0 },
  Polished: { label: 'Sanded & polished', mult: 1.25 },
  Dyed: { label: 'Dyed / painted', mult: 1.15 },
};

// 36 colors (robu advertises "35+ colors").
export const COLORS: { key: string; name: string; hex: string }[] = [
  { key: 'white', name: 'White', hex: '#FFFFFF' },
  { key: 'black', name: 'Black', hex: '#1A1A1A' },
  { key: 'gray', name: 'Gray', hex: '#9CA3AF' },
  { key: 'silver', name: 'Silver', hex: '#C0C0C0' },
  { key: 'red', name: 'Red', hex: '#EF4444' },
  { key: 'crimson', name: 'Crimson', hex: '#DC143C' },
  { key: 'maroon', name: 'Maroon', hex: '#800000' },
  { key: 'orange', name: 'Orange', hex: '#F97316' },
  { key: 'amber', name: 'Amber', hex: '#F59E0B' },
  { key: 'yellow', name: 'Yellow', hex: '#FACC15' },
  { key: 'gold', name: 'Gold', hex: '#D4AF37' },
  { key: 'lime', name: 'Lime', hex: '#84CC16' },
  { key: 'green', name: 'Green', hex: '#10B981' },
  { key: 'forest', name: 'Forest Green', hex: '#166534' },
  { key: 'teal', name: 'Teal', hex: '#14B8A6' },
  { key: 'cyan', name: 'Cyan', hex: '#06B6D4' },
  { key: 'skyblue', name: 'Sky Blue', hex: '#38BDF8' },
  { key: 'blue', name: 'Blue', hex: '#3B82F6' },
  { key: 'navy', name: 'Navy', hex: '#1E3A8A' },
  { key: 'indigo', name: 'Indigo', hex: '#6366F1' },
  { key: 'violet', name: 'Violet', hex: '#8B5CF6' },
  { key: 'purple', name: 'Purple', hex: '#9333EA' },
  { key: 'magenta', name: 'Magenta', hex: '#D946EF' },
  { key: 'pink', name: 'Pink', hex: '#EC4899' },
  { key: 'rose', name: 'Rose', hex: '#F43F5E' },
  { key: 'salmon', name: 'Salmon', hex: '#FA8072' },
  { key: 'peach', name: 'Peach', hex: '#FFDAB9' },
  { key: 'brown', name: 'Brown', hex: '#92400E' },
  { key: 'tan', name: 'Tan', hex: '#D2B48C' },
  { key: 'beige', name: 'Beige', hex: '#E8D5B5' },
  { key: 'olive', name: 'Olive', hex: '#808000' },
  { key: 'mint', name: 'Mint', hex: '#98FF98' },
  { key: 'turquoise', name: 'Turquoise', hex: '#40E0D0' },
  { key: 'lavender', name: 'Lavender', hex: '#C4B5FD' },
  { key: 'transparent', name: 'Natural / Clear', hex: '#E5E7EB' },
  { key: 'glow', name: 'Glow in the Dark', hex: '#CCFFCC' },
];

export const COLOR_MAP: Record<string, string> = COLORS.reduce(
  (acc, c) => ({ ...acc, [c.key]: c.hex }),
  {} as Record<string, string>
);

// Commerce constants.
export const MIN_ITEM_PRICE = 49; // INR — minimum charge per item
export const FREE_SHIPPING_THRESHOLD = 499; // INR
export const SHIPPING_FLAT = 49; // INR
export const COUPONS: Record<string, number> = { SAVE10: 0.1, SAVE20: 0.2 };

export interface QuoteConfig {
  volume: number; // mm^3 (raw solid model volume)
  material: string; // material key
  quality: string; // quality key
  infill: number; // 10-100
  finish: string; // finish key
  quantity: number;
}

export interface QuoteResult {
  weightGrams: number;
  unitPrice: number;
  total: number;
}

// Convert a solid model volume + infill into the material actually deposited.
// Walls/top/bottom are ~solid (~15% baseline); the interior scales with infill.
export function effectiveVolumeCm3(volumeMm3: number, infillPct: number): number {
  const solidCm3 = Math.max(volumeMm3, 0) / 1000; // mm^3 -> cm^3
  const infill = Math.min(Math.max(infillPct, 0), 100) / 100;
  return solidCm3 * (0.15 + 0.85 * infill);
}

export function calculateQuote(cfg: QuoteConfig): QuoteResult {
  // No model yet → nothing to price (don't apply the minimum-charge floor).
  if (!cfg.volume || cfg.volume <= 0) {
    return { weightGrams: 0, unitPrice: 0, total: 0 };
  }

  const material = MATERIALS[cfg.material] ?? MATERIALS.PLA;
  const quality = QUALITY[cfg.quality] ?? QUALITY['0.4mm'];
  const finish = FINISHES[cfg.finish] ?? FINISHES.None;
  const qty = Math.max(1, Math.floor(cfg.quantity || 1));

  const effVol = effectiveVolumeCm3(cfg.volume, cfg.infill);
  const weightGrams = effVol * material.density;
  const base = weightGrams * material.price * quality.mult * finish.mult;
  // Minimum charge per item — only applies once there's a real model to print.
  const unitPrice = Math.max(base, MIN_ITEM_PRICE);

  return {
    weightGrams,
    unitPrice: round2(unitPrice),
    total: round2(unitPrice * qty),
  };
}

export function shippingFor(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
