import Link from "next/link";
import { getImageById, getRelatedImages, imageItems } from "@/lib/images";
import {
  MasonryGrid,
  PlaceholderImage,
  SiteHeader,
  StatBlock,
} from "@/components/site-ui";

export async function generateStaticParams() {
  return imageItems.map((item) => ({ id: item.id }));
}

export default async function ImagePage({ params }: PageProps<"/image/[id]">) {
  const { id } = await params;
  const item = getImageById(id);
  const related = getRelatedImages(item.id);

  return (
    <main className="min-h-screen bg-white text-black">
      <SiteHeader compact />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_0.85fr]">
        <div>
          <PlaceholderImage item={item} className="min-h-[520px]" />
        </div>

        <aside className="border-2 border-black bg-neutral-100 p-5">
          <p className="mb-3 inline-flex bg-yellow-400 px-2 py-1 text-xs font-black uppercase">
            {item.category}
          </p>
          <h1 className="text-4xl font-black leading-none sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-lg font-bold text-neutral-700">
            by {item.creator}
          </p>
          <p className="mt-5 font-semibold leading-8 text-neutral-700">
            {item.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <StatBlock label="Saves" value={item.saves} />
            <StatBlock label="Views" value={item.views} />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button className="border-2 border-black bg-black px-5 py-4 text-sm font-black uppercase text-white hover:bg-yellow-400 hover:text-black">
              Save Image
            </button>
            <Link
              href="/explore"
              className="border-2 border-black bg-white px-5 py-4 text-center text-sm font-black uppercase hover:bg-neutral-100"
            >
              Back to Explore
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="border-2 border-black bg-white px-3 py-2 text-xs font-black uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="mb-5 border-t-2 border-black pt-6">
          <h2 className="text-3xl font-black uppercase">More like this</h2>
        </div>
        <MasonryGrid items={related} />
      </section>
    </main>
  );
}
