"use client";

import { useId, useState } from "react";
import Link from "next/link";

type SignUploadResponse = {
  id: string;
  objectName: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;
};

type UploadStatus =
  | { type: "idle" }
  | { type: "uploading"; message: string }
  | { type: "success"; id: string }
  | { type: "error"; message: string };

async function readError(response: Response) {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? "Upload failed.";
  } catch {
    return "Upload failed.";
  }
}

export function UploadPanel({
  expanded = false,
  onClose,
}: {
  expanded?: boolean;
  onClose?: () => void;
}) {
  const fileId = useId();
  const [status, setStatus] = useState<UploadStatus>({ type: "idle" });

  async function handleSubmit(formData: FormData) {
    const file = formData.get("image");

    if (!(file instanceof File) || file.size === 0) {
      setStatus({ type: "error", message: "Choose an image to upload." });
      return;
    }

    setStatus({ type: "uploading", message: "Creating upload URL" });

    const signResponse = await fetch("/api/uploads/sign", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        size: file.size,
        title: formData.get("title"),
        category: formData.get("category"),
        description: formData.get("description"),
        tags: formData.get("tags"),
      }),
    });

    if (!signResponse.ok) {
      setStatus({ type: "error", message: await readError(signResponse) });
      return;
    }

    const signedUpload = (await signResponse.json()) as SignUploadResponse;

    setStatus({ type: "uploading", message: "Uploading to Google Cloud" });

    const uploadResponse = await fetch(signedUpload.uploadUrl, {
      method: "PUT",
      headers: {
        "content-type": file.type,
        ...signedUpload.requiredHeaders,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      setStatus({
        type: "error",
        message:
          "Google Cloud rejected the upload. Check bucket CORS and signed URL headers.",
      });
      return;
    }

    setStatus({ type: "uploading", message: "Finalizing" });

    const finalizeResponse = await fetch("/api/uploads/finalize", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: signedUpload.id,
        objectName: signedUpload.objectName,
      }),
    });

    if (!finalizeResponse.ok) {
      setStatus({ type: "error", message: await readError(finalizeResponse) });
      return;
    }

    setStatus({ type: "success", id: signedUpload.id });
  }

  return (
    <section
      className={`border-2 border-neutral-700 bg-neutral-900 text-neutral-100 ${
        expanded ? "p-5 sm:p-7" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex bg-yellow-400 px-2 py-1 text-xs font-black uppercase text-black">
            Upload
          </p>
          <h2 className="mt-3 text-2xl font-black uppercase leading-none">
            Add Image
          </h2>
        </div>
        {onClose ? (
          <button
            type="button"
            className="size-9 border-2 border-neutral-700 bg-neutral-950 text-xl font-black leading-none text-neutral-100 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
            onClick={onClose}
            aria-label="Close upload panel"
          >
            x
          </button>
        ) : null}
      </div>

      <form action={handleSubmit} className="mt-5 grid gap-4">
        <label className="grid gap-2 text-xs font-black uppercase">
          Image
          <input
            id={fileId}
            name="image"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="border-2 border-neutral-700 bg-neutral-950 px-3 py-3 text-sm font-bold text-neutral-100 file:mr-3 file:border-0 file:bg-yellow-400 file:px-3 file:py-2 file:text-xs file:font-black file:uppercase file:text-black"
          />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase">
          Title
          <input
            name="title"
            type="text"
            maxLength={80}
            placeholder="Reference title"
            className="border-2 border-neutral-700 bg-neutral-950 px-3 py-3 text-base font-semibold normal-case text-neutral-100 outline-none focus:border-yellow-400"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-xs font-black uppercase">
            Category
            <select
              name="category"
              defaultValue="Objects"
              className="border-2 border-neutral-700 bg-neutral-950 px-3 py-3 text-sm font-black uppercase text-neutral-100 outline-none focus:border-yellow-400"
            >
              {[
                "Editorial",
                "Interiors",
                "Street",
                "Objects",
                "Brand",
                "Travel",
                "Color",
                "Architecture",
              ].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-black uppercase">
            Tags
            <input
              name="tags"
              type="text"
              placeholder="grid, studio"
              className="border-2 border-neutral-700 bg-neutral-950 px-3 py-3 text-base font-semibold normal-case text-neutral-100 outline-none focus:border-yellow-400"
            />
          </label>
        </div>
        <label className="grid gap-2 text-xs font-black uppercase">
          Description
          <textarea
            name="description"
            rows={expanded ? 4 : 3}
            maxLength={260}
            placeholder="Short reference note"
            className="resize-y border-2 border-neutral-700 bg-neutral-950 px-3 py-3 text-base font-semibold normal-case text-neutral-100 outline-none focus:border-yellow-400"
          />
        </label>
        <button
          type="submit"
          className="border-2 border-yellow-400 bg-yellow-400 px-5 py-4 text-sm font-black uppercase text-black hover:bg-neutral-950 hover:text-yellow-300"
        >
          Upload Image
        </button>
      </form>

      {status.type === "uploading" ? (
        <p className="mt-4 border-2 border-neutral-700 bg-neutral-950 p-3 text-sm font-bold text-neutral-300">
          {status.message}
        </p>
      ) : null}
      {status.type === "error" ? (
        <p className="mt-4 border-2 border-red-400 bg-red-950 p-3 text-sm font-bold text-red-100">
          {status.message}
        </p>
      ) : null}
      {status.type === "success" ? (
        <div className="mt-4 border-2 border-yellow-400 bg-neutral-950 p-3 text-sm font-bold text-neutral-100">
          Uploaded.{" "}
          <Link className="text-yellow-300 underline" href={`/image/${status.id}`}>
            Open image
          </Link>
        </div>
      ) : null}
      {!expanded ? (
        <Link
          href="/upload"
          className="mt-4 inline-flex border-2 border-neutral-700 bg-neutral-950 px-4 py-3 text-xs font-black uppercase text-neutral-100 hover:border-yellow-400"
        >
          Full upload page
        </Link>
      ) : null}
    </section>
  );
}
