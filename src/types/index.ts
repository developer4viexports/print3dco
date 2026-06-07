// Shared application types.

export interface Dimensions {
  volume: number; // mm^3
  area: number; // mm^2
  length: number;
  width: number;
  height: number;
}

export interface UploadResult {
  id: string;
  filename: string;
  storedPath: string;
  sizeBytes: number;
}

// A configured + priced line that lives in the cart.
export interface CartLine {
  id: string; // client-generated line id
  name: string;
  uploadId?: string;
  fileName?: string;
  thumbnail?: string;
  material: string; // material key
  materialName: string;
  color: string; // color key
  colorHex: string;
  quality: string;
  infill: number;
  finish: string;
  unit: 'mm' | 'inch';
  dimensions: Dimensions;
  weightGrams: number;
  qty: number;
  unitPrice: number;
}

export interface OrderItemDTO {
  name: string;
  config: Record<string, unknown>;
  quantity: number;
  unitPrice: number;
  quoteId?: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city?: string;
  postal?: string;
  country?: string;
}

export interface OrderDTO {
  id: string;
  orderNumber: string;
  name: string;
  email: string;
  phone?: string | null;
  address: string;
  city?: string | null;
  postal?: string | null;
  country?: string | null;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: string;
  paymentRef?: string | null;
  createdAt: string;
  items: {
    id: string;
    name: string;
    config: Record<string, unknown>;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface ReviewDTO {
  id: string;
  name: string;
  rating: number;
  body: string;
  createdAt: string;
}
