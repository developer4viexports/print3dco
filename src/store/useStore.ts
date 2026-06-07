// Global cart store (Zustand + persist to localStorage).
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine } from 'src/types';

interface CartState {
  items: CartLine[];
  addItem: (line: Omit<CartLine, 'id'>) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

function makeId(): string {
  return `line_${Math.floor(performance.now() * 1000).toString(36)}_${Math.floor(
    (typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint32Array(1))[0]
      : 0) % 1e9
  ).toString(36)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (line) =>
        set((state) => ({ items: [...state.items, { ...line, id: makeId() }] })),
      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, qty: Math.max(1, Math.floor(qty) || 1) } : it
          ),
        })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'print3dco-cart' }
  )
);

// Derived selectors.
export const selectCount = (s: CartState): number =>
  s.items.reduce((n, it) => n + it.qty, 0);
export const selectSubtotal = (s: CartState): number =>
  s.items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0);
