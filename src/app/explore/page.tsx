import Link from "next/link";
import { imageItems } from "@/lib/images";
import { MasonryGrid, SiteHeader, TopicChips } from "@/components/site-ui";

export default function ExplorePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b-2 border-black pb-5 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 inline-flex bg-yellow-400 px-2 py-1 text-xs font-black uppercase">
              Explore
            </p>
            <h1 className="text-4xl font-black leading-none sm:text-5xl">
              Today&apos;s visual references
            </h1>
          </div>
          <Link
            href="/search"
            className="border-2 border-black bg-black px-5 py-3 text-center text-sm font-black uppercase text-white hover:bg-yellow-400 hover:text-black"
          >
            Search Library
          </Link>
        </div>
        <TopicChips active="Editorial" />
        <div className="mt-6">
          <MasonryGrid items={imageItems} />
        </div>
      </section>
    </main>
  );
}
