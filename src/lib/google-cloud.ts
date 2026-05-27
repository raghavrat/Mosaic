import "server-only";

import { Storage } from "@google-cloud/storage";
import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

export type UploadMetadataInput = {
  title: string;
  category: string;
  description: string;
  tags: string[];
};

const imageContentTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

let storageClient: Storage | undefined;

export function getGoogleProjectId() {
  return process.env.GOOGLE_CLOUD_PROJECT;
}

export function getUploadBucketName() {
  return process.env.GCS_BUCKET_NAME;
}

export function hasGoogleCloudConfig() {
  return Boolean(getGoogleProjectId() && getUploadBucketName());
}

export function getImageExtension(contentType: string) {
  return imageContentTypes.get(contentType);
}

export function requireGoogleCloudConfig() {
  const projectId = getGoogleProjectId();
  const bucketName = getUploadBucketName();

  if (!projectId || !bucketName) {
    throw new Error(
      "Missing GOOGLE_CLOUD_PROJECT or GCS_BUCKET_NAME environment variable.",
    );
  }

  return { bucketName, projectId };
}

export function getStorageClient() {
  const { projectId } = requireGoogleCloudConfig();
  storageClient ??= new Storage({ projectId });
  return storageClient;
}

export function getUploadBucket() {
  const { bucketName } = requireGoogleCloudConfig();
  return getStorageClient().bucket(bucketName);
}

export function getAdminFirestore() {
  const projectId = getGoogleProjectId();

  if (!projectId) {
    throw new Error("Missing GOOGLE_CLOUD_PROJECT environment variable.");
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: applicationDefault(),
      projectId,
    });

  const databaseId = process.env.FIRESTORE_DATABASE_ID;
  return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
}

export function encodeUploadMetadata(metadata: UploadMetadataInput) {
  const headers: Record<string, string> = {
    "x-goog-meta-title": metadata.title,
    "x-goog-meta-category": metadata.category,
    "x-goog-meta-tags": metadata.tags.join(","),
    "x-goog-meta-owner-id": "anonymous",
  };

  if (metadata.description) {
    headers["x-goog-meta-description"] = metadata.description;
  }

  return headers;
}

export async function createUploadSignedUrl({
  contentType,
  fileName,
  metadata,
  size,
}: {
  contentType: string;
  fileName: string;
  metadata: UploadMetadataInput;
  size: number;
}) {
  const extension = getImageExtension(contentType);

  if (!extension) {
    throw new Error("Only JPEG, PNG, WebP, and GIF images can be uploaded.");
  }

  const id = crypto.randomUUID();
  const objectName = `uploads/${id}.${extension}`;
  const expiresAt = Date.now() + 10 * 60 * 1000;
  const requiredHeaders = encodeUploadMetadata(metadata);

  const [uploadUrl] = await getUploadBucket().file(objectName).getSignedUrl({
    action: "write",
    contentType,
    expires: expiresAt,
    extensionHeaders: requiredHeaders,
    version: "v4",
  });

  return {
    id,
    objectName,
    uploadUrl,
    expiresAt: new Date(expiresAt).toISOString(),
    requiredHeaders,
    size,
    fileName,
  };
}

export async function createReadSignedUrl(objectName: string) {
  const [imageUrl] = await getUploadBucket().file(objectName).getSignedUrl({
    action: "read",
    expires: Date.now() + 60 * 60 * 1000,
    version: "v4",
  });

  return imageUrl;
}

export { Timestamp };
