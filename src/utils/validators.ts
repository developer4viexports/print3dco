// Lightweight validation helpers shared by forms and API routes.

export const ACCEPTED_MODEL_EXTENSIONS = ['stl', 'obj'] as const;
export type ModelExtension = (typeof ACCEPTED_MODEL_EXTENSIONS)[number];
export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024; // 50 MB

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// Accepts Indian and international-ish numbers: 7-15 digits, optional +.
export function isValidPhone(phone: string): boolean {
  return /^\+?[0-9\s-]{7,16}$/.test(phone.trim());
}

export function getModelExtension(filename: string): ModelExtension | null {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ACCEPTED_MODEL_EXTENSIONS.includes(ext as ModelExtension)
    ? (ext as ModelExtension)
    : null;
}

export function isAcceptedModel(filename: string): boolean {
  return getModelExtension(filename) !== null;
}

export function required(value: string | undefined | null): boolean {
  return !!value && value.trim().length > 0;
}
