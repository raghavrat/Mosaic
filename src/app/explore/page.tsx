import Link from "next/link";
import { getUploadedImages } from "@/lib/uploaded-images";
import { MasonryGrid, SiteHeader, TopicChips } from "@/components/site-ui";

export default async function ExplorePage() {
  const items = await getUploadedImages();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b-2 border-neutral-700 pb-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 inline-flex bg-yellow-400 px-2 py-1 text-xs font-black uppercase text-black">
              Explore
            </p>
            <h1 className="text-4xl font-black leading-none sm:text-5xl">
              Today&apos;s visual references
            </h1>
          </div>
          <Link
            href="/search"
            className="border-2 border-yellow-400 bg-yellow-400 px-5 py-3 text-center text-sm font-black uppercase text-black hover:bg-neutral-950 hover:text-yellow-300"
          >
            Search Library
          </Link>
        </div>
        <TopicChips active="Editorial" />
        <div className="mt-6">
          <MasonryGrid items={items} />
        </div>
      </section>
    </main>
  );
}
