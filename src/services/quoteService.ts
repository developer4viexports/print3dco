// Persists a configured quote and returns the server-recomputed price.
import api from 'src/lib/api';

export interface QuotePayload {
  uploadId?: string;
  volume: number;
  material: string;
  color: string;
  quality: string;
  infill: number;
  finish: string;
  unit: 'mm' | 'inch';
  quantity: number;
}

export interface SavedQuote extends QuotePayload {
  id: string;
  unitPrice: number;
  total: number;
  createdAt: string;
}

export async function createQuote(payload: QuotePayload): Promise<SavedQuote> {
  const { data } = await api.post<SavedQuote>('/quote', payload);
  return data;
}
