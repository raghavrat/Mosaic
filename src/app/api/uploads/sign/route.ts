import { createUploadSignedUrl, getImageExtension } from "@/lib/google-cloud";

export const runtime = "nodejs";

const maxUploadBytes = 10 * 1024 * 1024;

type SignUploadBody = {
  fileName?: string;
  contentType?: string;
  size?: number;
  title?: string;
  category?: string;
  description?: string;
  tags?: string;
  width?: number;
  height?: number;
};

function cleanTags(tags: string | undefined) {
  return (tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignUploadBody;
    const contentType = body.contentType ?? "";
    const size = Number(body.size ?? 0);
    const fileName = body.fileName?.trim() ?? "";
    const category = body.category?.trim() || "Objects";
    const description = body.description?.trim() ?? "";
    const title =
      body.title?.trim() || fileName.replace(/\.[^.]+$/, "") || "Untitled";

    if (!fileName) {
      return Response.json({ error: "A file name is required." }, { status: 400 });
    }

    if (!getImageExtension(contentType)) {
      return Response.json(
        { error: "Only JPEG, PNG, WebP, and GIF images can be uploaded." },
        { status: 400 },
      );
    }

    if (!Number.isFinite(size) || size <= 0 || size > maxUploadBytes) {
      return Response.json(
        { error: "Images must be larger than 0 bytes and no more than 10 MB." },
        { status: 400 },
      );
    }

    const width = Math.round(Number(body.width ?? 0));
    const height = Math.round(Number(body.height ?? 0));

    if (
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      width <= 0 ||
      height <= 0
    ) {
      return Response.json(
        { error: "Image dimensions are required." },
        { status: 400 },
      );
    }

    const signedUpload = await createUploadSignedUrl({
      contentType,
      fileName,
      metadata: {
        title,
        category,
        description,
        tags: cleanTags(body.tags),
        width,
        height,
      },
      size,
    });

    return Response.json(signedUpload);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to sign the upload.";

    return Response.json({ error: message }, { status: 500 });
  }
}
