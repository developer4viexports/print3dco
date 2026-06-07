// Convenience hook over the Zustand cart store with derived totals.
'use client';

import { useCartStore, selectCount, selectSubtotal } from 'src/store/useStore';

export function useCart() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);

  return { items, addItem, updateQty, removeItem, clear, count, subtotal };
}

export default useCart;
