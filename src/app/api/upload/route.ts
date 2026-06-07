// POST /api/upload — accepts a multipart 3D model file plus the client-computed
// geometry stats, saves the file to local disk, and records an Upload row.
import { NextRequest, NextResponse } from 'next/server';
import prisma from 'src/lib/prisma';
import { saveUpload } from 'src/lib/storage';
import { isAcceptedModel, MAX_UPLOAD_BYTES } from 'src/utils/validators';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }
    if (!isAcceptedModel(file.name)) {
      return NextResponse.json({ error: 'Only .stl and .obj files are accepted.' }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'File exceeds the 50 MB limit.' }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await saveUpload(file.name, buffer);

    const num = (key: string) => Number(form.get(key) ?? 0) || 0;

    const upload = await prisma.upload.create({
      data: {
        filename: saved.filename,
        storedPath: saved.storedPath,
        sizeBytes: saved.sizeBytes,
        volume: num('volume'),
        area: num('area'),
        length: num('length'),
        width: num('width'),
        height: num('height'),
      },
    });

    return NextResponse.json({
      id: upload.id,
      filename: upload.filename,
      storedPath: upload.storedPath,
      sizeBytes: upload.sizeBytes,
    });
  } catch (err) {
    console.error('POST /api/upload failed', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
