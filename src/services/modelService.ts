// Uploads a 3D model file (with its client-computed geometry) to the backend.
import api from 'src/lib/api';
import type { Dimensions, UploadResult } from 'src/types';

export async function uploadModel(file: File, dims: Dimensions): Promise<UploadResult> {
  const form = new FormData();
  form.append('file', file);
  form.append('volume', String(dims.volume));
  form.append('area', String(dims.area));
  form.append('length', String(dims.length));
  form.append('width', String(dims.width));
  form.append('height', String(dims.height));

  const { data } = await api.post<UploadResult>('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
