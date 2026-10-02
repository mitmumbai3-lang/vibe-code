import React, { useState } from "react";
import { Compass, Sparkles, HeartHandshake, ShieldCheck, Sun, Anchor } from "lucide-react";

const theologicalPillars = [
  {
    icon: Sun,
    title: "Sovereign Grace",
    latin: "Sola Gratia",
    desc: "From the spoken command at Creation to the dawn of the empty tomb, redemption is not human achievement, but divine initiative reaching into darkness.",
  },
  {
    icon: HeartHandshake,
    title: "Covenant Fidelity",
    latin: "Pactum Fidei",
    desc: "In Abraham's starlit desert and Israel's parted waters, God binds Himself by an unbreakable promise to preserve and redeem a gathered people.",
  },
  {
    icon: Compass,
    title: "Incarnate Compassion",
    latin: "Verbum Caro Factum",
    desc: "The Infinite descends into the finite. Christ does not observe suffering from safe distance; He walks dusty roads, weeps with mourners, and takes nails into flesh.",
  },
  {
    icon: Anchor,
    title: "Cosmic Renewal",
    latin: "Nova Creatio",
    desc: "The biblical climax is not escapism, but resurrection. Heaven unites with earth, transforming every tear into joy and restoring creation to unhindered flourishing.",
  },
];

const historicalMeditations = [
  {
    author: "St. Augustine of Hippo",
    century: "4th Century",
    quote: "You have made us for yourself, O Lord, and our hearts are restless until they find their rest in you.",
  },
  {
    author: "Blaise Pascal",
    century: "17th Century",
    quote: "There is a God-shaped vacuum in the heart of each man which cannot be satisfied by any created thing, but only by God the Creator, made know through Jesus Christ.",
  },
  {
    author: "Dietrich Bonhoeffer",
    century: "20th Century",
    quote: "Cheap grace is grace without discipleship, grace without the cross. Costly grace is the treasure hidden in the field, for the sake of which a man will gladly go and sell all that he has.",
  },
];

export default function FaithSection() {
  const [activeQuote, setActiveQuote] = useState(0);

  return (
    <section id="faith" className="relative py-32 px-6 md:px-12 bg-charcoal-950 border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-16">
          <span className="text-xs uppercase tracking-[0.35em] text-gold-300 font-cinzel">
            Theological Architecture
          </span>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl text-parchment-50">
            Faith Grounded in the Story
          </h2>
          <p className="mt-4 text-base text-parchment-300 font-light leading-relaxed">
            The Christian faith is neither detached moralism nor abstract philosophy. It is a historical drama of divine love entering time to restore what was broken.
          </p>
        </div>

        {/* Four Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {theologicalPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="parchment-panel rounded-xl p-8 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300 mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-cinzel">
                    {pillar.latin}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-parchment-100">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-parchment-300 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gold-500/15 text-[11px] font-cinzel text-gold-400/70">
                  Article IV.{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Historical Meditations Carousel / Tab */}
        <div className="mt-20 parchment-panel rounded-2xl p-8 md:p-14 border border-gold-400/25 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-6 border-b border-gold-500/20">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 font-cinzel">
              Voices of the Church
            </span>
            <div className="flex gap-2">
              {historicalMeditations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeQuote === i ? "bg-gold-400 w-6" : "bg-parchment-400/30 hover:bg-gold-400/50"
                  }`}
                  aria-label={`View meditation ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="pt-8">
            <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-parchment-100 leading-relaxed">
              "{historicalMeditations[activeQuote].quote}"
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="font-cinzel text-sm text-gold-300 font-semibold">
                {historicalMeditations[activeQuote].author}
              </span>
              <span className="text-gold-500/40">•</span>
              <span className="text-xs text-parchment-400 font-cinzel">
                {historicalMeditations[activeQuote].century}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
