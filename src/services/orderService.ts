// Order + review API calls.
import api from 'src/lib/api';
import type { CustomerDetails, OrderDTO, OrderItemDTO, ReviewDTO } from 'src/types';

export interface PlaceOrderInput {
  customer: CustomerDetails;
  items: OrderItemDTO[];
  coupon?: string;
}

export async function placeOrder(input: PlaceOrderInput): Promise<OrderDTO> {
  const { data } = await api.post<OrderDTO>('/orders', input);
  return data;
}

export async function getOrder(idOrNumber: string): Promise<OrderDTO> {
  const { data } = await api.get<OrderDTO>(`/orders/${encodeURIComponent(idOrNumber)}`);
  return data;
}

// Lists the current user's orders (admins receive all orders).
export async function listMyOrders(): Promise<OrderDTO[]> {
  const { data } = await api.get<OrderDTO[]>('/orders');
  return data;
}

// Admin: update an order's status.
export async function updateOrderStatus(id: string, status: string): Promise<OrderDTO> {
  const { data } = await api.patch<OrderDTO>(`/orders/${encodeURIComponent(id)}`, { status });
  return data;
}

export async function listReviews(): Promise<ReviewDTO[]> {
  const { data } = await api.get<ReviewDTO[]>('/reviews');
  return data;
}

export async function submitReview(input: { name: string; rating: number; body: string }): Promise<ReviewDTO> {
  const { data } = await api.post<ReviewDTO>('/reviews', input);
  return data;
}
