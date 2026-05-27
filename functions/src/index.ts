import { logger } from "firebase-functions";
import { onObjectFinalized } from "firebase-functions/v2/storage";
import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

initializeApp();

const uploadPathPattern = /^uploads\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.(jpe?g|png|webp|gif)$/i;
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function splitTags(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function textOrDefault(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

export const createImageDocument = onObjectFinalized(
  {
    region: "us-central1",
  },
  async (event) => {
    const object = event.data;
    const objectName = object.name ?? "";
    const match = objectName.match(uploadPathPattern);
    const bucketName = process.env.GCS_BUCKET_NAME;

    if (bucketName && object.bucket !== bucketName) {
      logger.info("Ignoring object from a different bucket.", {
        bucket: object.bucket,
        configuredBucket: bucketName,
        objectName,
      });
      return;
    }

    if (!match) {
      logger.info("Ignoring object outside uploads UUID path.", { objectName });
      return;
    }

    if (!object.contentType || !imageTypes.has(object.contentType)) {
      logger.info("Ignoring non-image upload.", {
        contentType: object.contentType,
        objectName,
      });
      return;
    }

    const id = match[1];
    const metadata = object.metadata ?? {};
    const firestore = process.env.FIRESTORE_DATABASE_ID
      ? getFirestore(process.env.FIRESTORE_DATABASE_ID)
      : getFirestore();

    await firestore.collection("images").doc(id).set(
      {
        id,
        title: textOrDefault(metadata.title, "Uploaded Image"),
        creator: "Anonymous",
        category: textOrDefault(metadata.category, "Objects"),
        description: textOrDefault(
          metadata.description,
          "A privately uploaded visual reference stored in Google Cloud Storage.",
        ),
        tags: splitTags(metadata.tags),
        bucket: object.bucket,
        objectName,
        contentType: object.contentType,
        size: Number(object.size ?? 0),
        ownerId: textOrDefault(metadata["owner-id"], "anonymous"),
        status: "ready",
        saves: "0",
        views: "0",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    logger.info("Created image Firestore document.", { id, objectName });
  },
);
