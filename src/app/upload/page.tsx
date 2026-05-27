import { SiteHeader } from "@/components/site-ui";
import { UploadPanel } from "@/components/upload-panel";

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader compact />
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 border-b-2 border-neutral-700 pb-5">
          <p className="mb-2 inline-flex bg-yellow-400 px-2 py-1 text-xs font-black uppercase text-black">
            Google Cloud
          </p>
          <h1 className="text-4xl font-black leading-none sm:text-5xl">
            Upload an image
          </h1>
          <p className="mt-3 font-semibold text-neutral-400">
            Files upload directly to a private Cloud Storage bucket. Firebase
            Cloud Functions writes the Firestore image record after upload.
          </p>
        </div>
        <UploadPanel expanded />
      </section>
    </main>
  );
}
