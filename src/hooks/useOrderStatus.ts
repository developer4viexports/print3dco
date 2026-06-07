// Fetches a single order by id/orderNumber for the order-status page.
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getOrder } from 'src/services/orderService';
import type { OrderDTO } from 'src/types';

export function useOrderStatus(idOrNumber: string | undefined) {
  const [order, setOrder] = useState<OrderDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!idOrNumber) return;
    setLoading(true);
    setError(null);
    try {
      setOrder(await getOrder(idOrNumber));
    } catch {
      setError('Order not found.');
    } finally {
      setLoading(false);
    }
  }, [idOrNumber]);

  useEffect(() => {
    load();
  }, [load]);

  return { order, loading, error, reload: load };
}

export default useOrderStatus;
