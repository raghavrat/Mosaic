import Link from "next/link";
import { imageItems } from "@/lib/images";
import { PlaceholderImage, SiteHeader } from "@/components/site-ui";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader compact />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="hidden grid-cols-2 gap-3 lg:grid">
          {imageItems.slice(0, 4).map((item) => (
            <PlaceholderImage key={item.id} item={item} />
          ))}
        </div>

        <div className="border-2 border-neutral-700 bg-neutral-900 p-5 sm:p-8">
          <div className="mb-6 h-2 w-20 bg-yellow-400" />
          <h1 className="text-4xl font-black leading-none">Login to Mosaic</h1>
          <p className="mt-3 max-w-md font-semibold leading-7 text-neutral-400">
            Return to your saved references, boards, and recently viewed image
            collections.
          </p>

          <form className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-black uppercase">
              Email
              <input
                className="border-2 border-neutral-700 bg-neutral-950 px-4 py-3 text-base font-semibold normal-case text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-yellow-400"
                type="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-black uppercase">
              Password
              <input
                className="border-2 border-neutral-700 bg-neutral-950 px-4 py-3 text-base font-semibold normal-case text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-yellow-400"
                type="password"
                placeholder="Enter password"
              />
            </label>
            <button
              className="mt-2 border-2 border-yellow-400 bg-yellow-400 px-5 py-4 text-sm font-black uppercase text-black transition hover:bg-neutral-950 hover:text-yellow-300"
              type="button"
            >
              Continue
            </button>
          </form>

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs font-black uppercase text-neutral-500">
            <span className="h-0.5 bg-neutral-700" />
            Or
            <span className="h-0.5 bg-neutral-700" />
          </div>

          <div className="grid gap-3">
            <button className="border-2 border-neutral-700 bg-neutral-950 px-5 py-3 text-sm font-black uppercase text-neutral-100 hover:border-yellow-400">
              Continue with Google
            </button>
            <button className="border-2 border-neutral-700 bg-neutral-950 px-5 py-3 text-sm font-black uppercase text-neutral-100 hover:border-yellow-400">
              Continue with Apple
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-3 text-sm font-bold">
            <Link href="/login" className="underline decoration-yellow-400">
              Forgot password
            </Link>
            <Link href="/explore" className="underline decoration-yellow-400">
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
