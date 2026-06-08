// Shared axios instance for client-side API calls.
// Next.js does NOT auto-prefix fetch/axios with basePath, so include it here.
import axios from 'axios';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const api = axios.create({
  baseURL: `${basePath}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
