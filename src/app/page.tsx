import Link from "next/link";
import { imageItems } from "@/lib/images";
import { PlaceholderImage, SiteHeader, StatBlock } from "@/components/site-ui";

export default function Home() {
  const heroImages = imageItems.slice(0, 5);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader compact />

      <section className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-12">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex border-2 border-yellow-400 bg-yellow-400 px-3 py-2 text-xs font-black uppercase text-black">
            Human-curated image discovery
          </div>
          <h1 className="text-5xl font-black leading-[0.95] tracking-normal text-neutral-100 sm:text-6xl lg:text-7xl">
            Collect sharper visual references.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-neutral-300">
            Mosaic is a visual platform for browsing, saving, and organizing
            image references without generation tools, prompt feeds, or noisy
            creation features.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="border-2 border-yellow-400 bg-yellow-400 px-6 py-4 text-center text-sm font-black uppercase text-black transition hover:bg-neutral-950 hover:text-yellow-300"
            >
              Start Exploring
            </Link>
            <Link
              href="/login"
              className="border-2 border-neutral-700 bg-neutral-900 px-6 py-4 text-center text-sm font-black uppercase text-neutral-100 transition hover:border-yellow-400"
            >
              Login
            </Link>
          </div>
          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
            <StatBlock label="Boards" value="2.4k" />
            <StatBlock label="Images" value="48k" />
            <StatBlock label="Curators" value="9k" />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3 border-2 border-neutral-700 bg-neutral-900 p-3">
          <div className="col-span-3">
            <PlaceholderImage item={heroImages[0]} className="h-full" />
          </div>
          <div className="col-span-2 grid gap-3">
            <PlaceholderImage item={heroImages[1]} />
            <PlaceholderImage item={heroImages[2]} />
          </div>
          <div className="col-span-2">
            <PlaceholderImage item={heroImages[3]} />
          </div>
          <div className="col-span-3">
            <PlaceholderImage item={heroImages[4]} />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-neutral-700 bg-black px-4 py-10 text-white sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Browse", "Dense image grids built for fast visual scanning."],
            ["Save", "Boxy boards and references for practical collecting."],
            ["Return", "Search and image pages that keep discovery moving."],
          ].map(([title, body]) => (
            <div key={title} className="border-2 border-white p-5">
              <h2 className="text-2xl font-black uppercase text-yellow-300">
                {title}
              </h2>
              <p className="mt-3 font-semibold leading-7 text-neutral-200">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
