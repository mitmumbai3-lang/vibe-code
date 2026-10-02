import React from "react";
import { ChevronDown, Sparkles, BookOpen } from "lucide-react";

export default function Hero({ onBeginJourney, onOpenScripture }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-24 md:px-12 md:py-28 overflow-hidden z-10">
      {/* Background Oil Painting & Chiaroscuro Overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/images/hero.jpg"
          alt="Baroque heavenly celestial artwork with radiant golden beams"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out filter brightness-[0.72] contrast-[1.12]"
          fetchPriority="high"
        />
        {/* Subtle radial and linear gradient vignette for editorial contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/60 to-charcoal-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-charcoal-900/40 to-charcoal-950/90" />
        <div className="absolute inset-0 chiaroscuro-vignette opacity-80 pointer-events-none" />
        <div className="absolute inset-0 halftone-dots opacity-25 pointer-events-none" />
      </div>

      {/* Top Epigraph */}
      <div className="max-w-4xl pt-12 md:pt-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-400/30 bg-charcoal-900/60 backdrop-blur-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
          <p className="text-[10px] md:text-xs uppercase tracking-[0.35em] text-gold-300 font-cinzel">
            The Biblical Narrative • Canon of Grace
          </p>
        </div>
      </div>

      {/* Center Headline & Content */}
      <div className="max-w-5xl my-auto">
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gold-300/90 mb-4 font-cinzel">
          A Sacred Classical Pilgrimage
        </p>
        
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] tracking-tight text-parchment-50 leading-[1.05] drop-shadow-xl">
          From the beginning,<br />
          <span className="italic font-normal text-gold-gradient">
            a story of redemption.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-parchment-300 font-light drop-shadow">
          A reverent, cinematic journey through creation, covenant, Christ, and the hope
          of all things made new—witnessed through the brushstrokes of classical sacred art.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={onBeginJourney}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-300 px-8 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-charcoal-950 shadow-lg hover:shadow-divine transition-all duration-300 active:scale-95"
          >
            <span>Begin the Journey</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          <button
            onClick={onOpenScripture}
            className="inline-flex items-center gap-2.5 rounded-full border border-parchment-400/30 hover:border-gold-400/60 bg-charcoal-900/60 backdrop-blur-sm px-6 py-4 text-xs sm:text-sm font-medium tracking-wider uppercase text-parchment-200 hover:text-gold-200 transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span>Examine Scripture</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar: Timeline Pill & Scroll Invitation */}
      <div className="pt-12 border-t border-gold-500/15 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Chapter ticker */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-parchment-400 overflow-x-auto pb-2 md:pb-0 scrollbar-none font-cinzel">
          <span className="text-gold-300 font-semibold">I. Creation</span>
          <span className="text-gold-500/40">✦</span>
          <span>II. Abraham</span>
          <span className="text-gold-500/40">✦</span>
          <span>III. Exodus</span>
          <span className="text-gold-500/40">✦</span>
          <span>IV. Christ</span>
          <span className="text-gold-500/40">✦</span>
          <span>V. Resurrection</span>
          <span className="text-gold-500/40">✦</span>
          <span>VI. New Creation</span>
        </div>

        {/* Scroll invitation */}
        <button
          onClick={onBeginJourney}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-parchment-400 hover:text-gold-300 transition-colors group focus:outline-none self-start md:self-auto"
        >
          <span>Scroll to Witness</span>
          <div className="w-5 h-8 rounded-full border border-gold-400/30 flex items-start justify-center p-1 group-hover:border-gold-400 transition-colors">
            <div className="w-1 h-2 rounded-full bg-gold-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
