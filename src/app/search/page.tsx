import { imageItems } from "@/lib/images";
import { MasonryGrid, SiteHeader, TopicChips } from "@/components/site-ui";

export default function SearchPage() {
  const results = imageItems.filter((item) =>
    ["Editorial", "Interiors", "Street", "Objects"].includes(item.category),
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="border-2 border-black bg-neutral-100 p-4 sm:p-6">
          <p className="mb-2 inline-flex bg-yellow-400 px-2 py-1 text-xs font-black uppercase">
            Search results
          </p>
          <h1 className="text-4xl font-black leading-none sm:text-5xl">
            Boxy editorial references
          </h1>
          <p className="mt-3 font-semibold text-neutral-600">
            {results.length} results across editorial, interiors, street, and
            object boards.
          </p>
          <div className="mt-5">
            <TopicChips active="Interiors" />
          </div>
        </div>

        <div className="my-6 flex flex-wrap gap-2">
          {["black layout", "yellow signage", "grid interiors", "hard crop"].map(
            (term) => (
              <span
                key={term}
                className="border-2 border-black bg-white px-3 py-2 text-sm font-black uppercase"
              >
                {term}
              </span>
            ),
          )}
        </div>

        <MasonryGrid items={results} />

        <div className="mt-6 border-2 border-black bg-yellow-400 p-5">
          <h2 className="text-2xl font-black uppercase">No-result fallback</h2>
          <p className="mt-2 font-semibold">
            This block can become the empty state when a future search backend
            returns no matches.
          </p>
        </div>
      </section>
    </main>
  );
}
