import { FieldValue } from "firebase-admin/firestore";
import {
  getAdminFirestore,
  getImageExtension,
  getUploadBucket,
} from "@/lib/google-cloud";

export const runtime = "nodejs";

const uploadPathPattern =
  /^uploads\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.(jpe?g|png|webp|gif)$/i;

type FinalizeBody = {
  id?: string;
  objectName?: string;
};

function splitTags(value: string | undefined | null) {
  return (value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function textOrDefault(value: string | undefined | null, fallback: string) {
  return value?.trim() || fallback;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FinalizeBody;
    const id = body.id?.trim();
    const objectName = body.objectName?.trim();

    if (!id || !objectName) {
      return Response.json(
        { error: "id and objectName are required." },
        { status: 400 },
      );
    }

    const match = objectName.match(uploadPathPattern);
    if (!match || match[1].toLowerCase() !== id.toLowerCase()) {
      return Response.json({ error: "Invalid object name." }, { status: 400 });
    }

    const file = getUploadBucket().file(objectName);
    const [exists] = await file.exists();

    if (!exists) {
      return Response.json(
        { error: "Upload not found in storage yet." },
        { status: 404 },
      );
    }

    const [metadata] = await file.getMetadata();
    const contentType = metadata.contentType ?? "";

    if (!getImageExtension(contentType)) {
      return Response.json(
        { error: "Unsupported image type on stored object." },
        { status: 400 },
      );
    }

    const custom = (metadata.metadata ?? {}) as Record<string, string | undefined>;

    await getAdminFirestore()
      .collection("images")
      .doc(id)
      .set(
        {
          id,
          title: custom.title?.trim() ?? "",
          creator: "Anonymous",
          category: textOrDefault(custom.category, "Objects"),
          description: custom.description?.trim() ?? "",
          tags: splitTags(custom.tags),
          bucket: metadata.bucket,
          objectName,
          contentType,
          size: Number(metadata.size ?? 0),
          ownerId: textOrDefault(custom["owner-id"], "anonymous"),
          status: "ready",
          saves: "0",
          views: "0",
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );

    return Response.json({ id, status: "ready" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to finalize upload.";
    return Response.json({ error: message }, { status: 500 });
  }
}
