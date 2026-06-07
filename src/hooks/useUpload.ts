// Handles uploading a model file to the backend with loading/error state.
'use client';

import { useState, useCallback } from 'react';
import { uploadModel } from 'src/services/modelService';
import type { Dimensions, UploadResult } from 'src/types';

export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  const upload = useCallback(async (file: File, dims: Dimensions): Promise<UploadResult | null> => {
    setUploading(true);
    setError(null);
    try {
      const res = await uploadModel(file, dims);
      setResult(res);
      return res;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Upload failed.';
      setError(msg);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, error, result };
}

export default useUpload;
