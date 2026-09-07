const partners = ["Jotun", "Sipes", "Duravit", "Elsewedy", "Ideal Standard", "Gazzaz"];

export default function Partners() {
  const loop = [...partners, ...partners];
  return (
    <section className="border-y border-black/5 bg-white py-10 overflow-hidden">
      <div className="container-page mb-6 text-center">
        <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
          Official Partners
        </span>
        <h3 className="mt-2 text-xl font-extrabold text-ink">شركاء النجاح والجودة</h3>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex min-w-full shrink-0 animate-marquee items-center gap-16 pr-16">
          {loop.map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="whitespace-nowrap text-2xl font-extrabold text-ink-soft/40 hover:text-gold transition"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
