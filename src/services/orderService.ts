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

export async function listReviews(): Promise<ReviewDTO[]> {
  const { data } = await api.get<ReviewDTO[]>('/reviews');
  return data;
}

export async function submitReview(input: { name: string; rating: number; body: string }): Promise<ReviewDTO> {
  const { data } = await api.post<ReviewDTO>('/reviews', input);
  return data;
}
