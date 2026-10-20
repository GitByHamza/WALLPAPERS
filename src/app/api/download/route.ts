import { NextRequest, NextResponse } from "next/server";
import { MAX_DOWNLOAD_BYTES, validateDownloadUrl } from "@/lib/download";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  const target = validateDownloadUrl(req.nextUrl.searchParams.get("url"));
  if (!target)
    return new NextResponse("Choose a valid Wallhaven wallpaper to download.", { status: 400 });
  try {
    const response = await fetch(target.url, {
      redirect: "error",
      signal: AbortSignal.timeout(30000),
      cache: "no-store",
    });
    if (!response.ok || !response.body)
      return new NextResponse("The original image is unavailable. Please try again.", {
        status: 502,
      });
    const contentType = response.headers.get("content-type")?.split(";")[0] || "";
    if (!["image/jpeg", "image/png", "image/webp"].includes(contentType))
      return new NextResponse("The source did not return a supported image.", { status: 502 });
    if (Number(response.headers.get("content-length")) > MAX_DOWNLOAD_BYTES)
      return new NextResponse("This image exceeds the download size limit.", { status: 413 });
    let bytes = 0;
    const limited = response.body.pipeThrough(
      new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
          bytes += chunk.byteLength;
          if (bytes > MAX_DOWNLOAD_BYTES) {
            controller.error(new Error("Image exceeds download limit"));
            return;
          }
          controller.enqueue(chunk);
        },
      }),
    );
    return new NextResponse(limited, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${target.filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("The download could not be completed. Please try again.", {
      status: 502,
    });
  }
}
