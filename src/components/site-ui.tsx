import Link from "next/link";
import type { ImageItem } from "@/lib/images";
import { topicFilters } from "@/lib/images";

export function MosaicLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="30" y="30" width="70" height="100" fill="currentColor" />
      <rect x="110" y="30" width="60" height="60" fill="currentColor" />
      <rect x="110" y="100" width="60" height="70" fill="currentColor" />
      <rect x="30" y="140" width="70" height="30" fill="currentColor" />
    </svg>
  );
}

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-black bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex size-11 shrink-0 items-center justify-center border-2 border-black bg-white text-black transition hover:bg-yellow-400"
          aria-label="Mosaic home"
        >
          <MosaicLogo className="size-8" />
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-bold uppercase sm:flex">
          <Link className="box-link" href="/explore">
            Explore
          </Link>
          <Link className="box-link" href="/search">
            Search
          </Link>
        </nav>
        {!compact ? (
          <Link
            href="/search"
            className="ml-auto hidden min-w-0 flex-1 items-center border-2 border-black bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-500 md:flex"
          >
            Search visual references
          </Link>
        ) : (
          <div className="ml-auto" />
        )}
        <Link
          href="/login"
          className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black uppercase text-black transition hover:bg-black hover:text-yellow-300"
        >
          Login
        </Link>
      </div>
    </header>
  );
}

export function TopicChips({ active = "Editorial" }: { active?: string }) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto py-1">
      {topicFilters.map((topic) => (
        <Link
          key={topic}
          href={`/search?topic=${topic.toLowerCase()}`}
          className={`shrink-0 border-2 border-black px-4 py-2 text-sm font-black uppercase ${
            topic === active
              ? "bg-yellow-400 text-black"
              : "bg-white text-black hover:bg-neutral-100"
          }`}
        >
          {topic}
        </Link>
      ))}
    </div>
  );
}

export function PlaceholderImage({
  item,
  className = "",
}: {
  item: ImageItem;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-2 border-black ${item.aspect} ${className}`}
      style={{ backgroundColor: item.colors[0] }}
    >
      <div
        className="absolute left-[12%] top-[10%] h-[28%] w-[54%] border-2 border-black"
        style={{ backgroundColor: item.colors[1] }}
      />
      <div
        className="absolute bottom-[12%] right-[10%] h-[38%] w-[34%] border-2 border-black"
        style={{ backgroundColor: item.colors[2] }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t-2 border-black bg-white px-3 py-2">
        <span className="text-xs font-black uppercase text-black">
          {item.category}
        </span>
        <span className="h-3 w-8 bg-yellow-400" />
      </div>
    </div>
  );
}

export function ImageCard({ item }: { item: ImageItem }) {
  return (
    <article className="break-inside-avoid pb-6">
      <Link href={`/image/${item.id}`} className="group block">
        <PlaceholderImage item={item} />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-black leading-tight text-black">
              {item.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-neutral-600">
              {item.creator}
            </p>
          </div>
          <span className="border-2 border-black bg-white px-2 py-1 text-xs font-black uppercase group-hover:bg-yellow-400">
            Save
          </span>
        </div>
      </Link>
    </article>
  );
}

export function MasonryGrid({ items }: { items: ImageItem[] }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {items.map((item) => (
        <ImageCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function StatBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-2 border-black bg-white p-4">
      <p className="text-2xl font-black text-black">{value}</p>
      <p className="mt-1 text-xs font-black uppercase text-neutral-500">
        {label}
      </p>
    </div>
  );
}
