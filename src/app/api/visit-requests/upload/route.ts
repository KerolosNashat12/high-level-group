import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Client-upload token endpoint — the browser uploads the file bytes directly
// to Vercel Blob (never through this serverless function, so we're not
// bounded by the ~4.5MB request-body limit). This route only issues a
// short-lived, constrained upload token per file.
//
// Limits (kept intentionally small so the free Blob storage tier lasts):
// - Video mode: a single file, up to 15MB.
// - Photo mode: up to 5 files, 3MB each.
const MAX_VIDEO_BYTES = 15 * 1024 * 1024;
const MAX_PHOTO_BYTES = 3 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const kind = clientPayload === "video" ? "video" : "photo";
        return {
          allowedContentTypes:
            kind === "video"
              ? ["video/mp4", "video/quicktime", "video/webm", "video/x-matroska"]
              : ["image/jpeg", "image/png", "image/webp", "image/heic"],
          maximumSizeInBytes: kind === "video" ? MAX_VIDEO_BYTES : MAX_PHOTO_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ kind }),
        };
      },
      onUploadCompleted: async () => {
        // No DB write needed here — the visit-requests POST route stores the
        // resulting URLs once the customer submits the whole form.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("[visit-requests/upload] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "فشل رفع الملف" },
      { status: 400 }
    );
  }
}
