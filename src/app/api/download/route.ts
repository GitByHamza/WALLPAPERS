export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
 const { searchParams } = new URL(req.url);
 const url = searchParams.get("url");
 const filename = searchParams.get("filename") || "wallpaper.jpg";

 if (!url) {
  return new NextResponse("Missing URL parameter", { status: 400 });
 }

 try {
  const response = await fetch(url);

  if (!response.ok) {
   throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") || "application/octet-stream";
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new NextResponse(buffer, {
   headers: {
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
   },
  });
 } catch (error) {
  console.error("Download proxy error:", error);
  return new NextResponse("Internal Server Error", { status: 500 });
 }
}
