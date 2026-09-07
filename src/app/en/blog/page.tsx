import Link from "next/link";

export const metadata = {
  title: "Finishing & Decor Blog | High Level Finishing",
};

export default function BlogPage() {
  return (
    <section className="py-32">
      <div className="container-page text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink">
          Finishing & Decor Blog
        </h1>
        <p className="mt-4 text-ink-soft">No articles have been published yet.</p>
        <p className="text-ink-soft">Stay tuned — our exclusive articles are coming very soon.</p>
        <Link
          href="/en"
          className="mt-8 inline-block rounded-full bg-gold-gradient px-8 py-3.5 font-bold text-white hover:opacity-90 transition"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
