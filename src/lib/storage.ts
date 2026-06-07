// Local-disk storage for uploaded 3D files.
// Files are written to <UPLOAD_DIR> (default: ./uploads, gitignored). The DB
// stores the returned relative path; nothing is served publicly.
import { promises as fs } from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

function uploadRoot(): string {
  return path.join(process.cwd(), UPLOAD_DIR);
}

// Strip any path components and unsafe characters from a client filename.
function sanitize(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]/g, '_');
  return base.slice(0, 120) || 'model';
}

export interface SavedFile {
  storedPath: string; // relative path stored in DB
  absolutePath: string;
  filename: string; // original (sanitized) name
  sizeBytes: number;
}

export async function saveUpload(originalName: string, data: Buffer): Promise<SavedFile> {
  const dir = uploadRoot();
  await fs.mkdir(dir, { recursive: true });

  const safe = sanitize(originalName);
  const unique = `${randomBytes(8).toString('hex')}-${safe}`;
  const absolutePath = path.join(dir, unique);
  await fs.writeFile(absolutePath, data);

  return {
    storedPath: path.join(UPLOAD_DIR, unique),
    absolutePath,
    filename: safe,
    sizeBytes: data.byteLength,
  };
}
