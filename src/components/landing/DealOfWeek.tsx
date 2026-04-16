import { useEffect, useState } from "react";

export function DealOfWeek() {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 7, mins: 43, secs: 47 });

  useEffect(() => {
    const target = Date.now() + (4 * 24 * 60 * 60 + 7 * 60 * 60 + 43 * 60 + 47) * 1000;
    const t = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days: d, hours: h, mins: m, secs: s });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-navy py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-gold">Deal Of The Week</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
            Limited-Time Deals On!
          </h2>
          <p className="mt-4 text-white/70">
            Shop now for unbeatable savings on top-quality sleep essentials and make every night more comfortable!
          </p>
          <div className="mt-8 flex gap-4">
            {[
              { val: pad(timeLeft.days), label: "Days" },
              { val: pad(timeLeft.hours), label: "Hours" },
              { val: pad(timeLeft.mins), label: "Mins" },
              { val: pad(timeLeft.secs), label: "Secs" },
            ].map((t, i) => (
              <div key={t.label} className="flex items-center gap-4">
                <div className="text-center">
                  <span className="font-display text-4xl font-bold text-white md:text-5xl">{t.val}</span>
                  <p className="mt-1 text-xs text-white/60">{t.label}</p>
                </div>
                {i < 3 && <span className="text-2xl font-bold text-gold">:</span>}
              </div>
            ))}
          </div>
          <button className="mt-8 rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy">
            Shop Now
          </button>
        </div>
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=600&q=80"
            alt="Deal of the week"
            className="max-h-96 rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
