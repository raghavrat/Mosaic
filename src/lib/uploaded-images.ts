import "server-only";

import {
  createReadSignedUrl,
  getAdminFirestore,
  hasGoogleCloudConfig,
  Timestamp,
} from "./google-cloud";
import type { ImageItem } from "./images";

type UploadedImageDocument = {
  id?: string;
  title?: string;
  creator?: string;
  category?: string;
  description?: string;
  tags?: string[];
  bucket?: string;
  objectName?: string;
  contentType?: string;
  size?: number;
  width?: number | null;
  height?: number | null;
  status?: string;
  saves?: string;
  views?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

const fallbackColors: [string, string, string] = ["#171717", "#facc15", "#fafafa"];

function toImageItem(
  docId: string,
  data: UploadedImageDocument,
  imageUrl: string,
): ImageItem {
  return {
    id: data.id ?? docId,
    title: data.title?.trim() || "Untitled",
    creator: data.creator?.trim() || "Anonymous",
    category: data.category?.trim() || "Objects",
    description: data.description?.trim() ?? "",
    colors: fallbackColors,
    aspect: "aspect-[4/5]",
    saves: data.saves ?? "0",
    views: data.views ?? "0",
    tags: Array.isArray(data.tags) ? data.tags : ["uploaded"],
    imageUrl,
    objectName: data.objectName,
    width: typeof data.width === "number" && data.width > 0 ? data.width : undefined,
    height:
      typeof data.height === "number" && data.height > 0 ? data.height : undefined,
  };
}

export async function getUploadedImages(limit = 24): Promise<ImageItem[]> {
  if (!hasGoogleCloudConfig()) {
    return [];
  }

  try {
    const snapshot = await getAdminFirestore()
      .collection("images")
      .where("status", "==", "ready")
      .orderBy("createdAt", "desc")
      .limit(limit)
      .get();

    const items = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data() as UploadedImageDocument;

        if (!data.objectName) {
          return null;
        }

        const imageUrl = await createReadSignedUrl(data.objectName);
        return toImageItem(doc.id, data, imageUrl);
      }),
    );

    return items.filter((item): item is ImageItem => item !== null);
  } catch (error) {
    console.warn("Unable to load uploaded images from Firestore.", error);
    return [];
  }
}

export async function getUploadedImageById(id: string) {
  try {
    const snapshot = await getAdminFirestore().collection("images").doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data() as UploadedImageDocument | undefined;

    if (!data?.objectName || data.status !== "ready") {
      return null;
    }

    const imageUrl = await createReadSignedUrl(data.objectName);
    return toImageItem(snapshot.id, data, imageUrl);
  } catch (error) {
    console.warn(`Unable to load uploaded image ${id} from Firestore.`, error);
    return null;
  }
}
