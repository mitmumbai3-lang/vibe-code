import React, { useState } from "react";
import { BookOpen, Send, CheckCircle2, Download, ArrowRight, Compass } from "lucide-react";

export default function JourneySection({ onOpenScripture }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section id="journey" className="relative py-36 px-6 md:px-12 bg-charcoal-950 overflow-hidden border-t border-gold-500/15">
      {/* Background Oil Painting Vignette */}
      <div className="absolute inset-0 -z-10 opacity-25">
        <img
          src="/images/new_creation.jpg"
          alt="The Luminous Golden City"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/80 to-charcoal-950" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.35em] text-gold-300 font-cinzel">
          The Invitation Remains
        </p>

        {/* Large Headline */}
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-parchment-50 leading-tight">
          Continue the journey.
        </h2>

        <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-parchment-300 font-light leading-relaxed">
          The story does not conclude with the final page of scripture—it invites your life into its unfolding grace. Step deeper into the text, the art, and the living hope.
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a
            href="#scripture"
            onClick={(e) => {
              e.preventDefault();
              onOpenScripture();
            }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-300 px-8 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase text-charcoal-950 shadow-lg hover:shadow-divine transition-all duration-300 active:scale-95"
          >
            <BookOpen className="w-4 h-4" />
            <span>Read Scripture</span>
          </a>

          <a
            href="#story"
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 hover:border-gold-300 bg-charcoal-900/60 backdrop-blur-sm px-7 py-4 text-xs sm:text-sm font-medium tracking-wider uppercase text-parchment-200 hover:text-gold-200 transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-gold-400" />
            <span>Revisit The Story</span>
          </a>
        </div>

        {/* Curated Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
          <div className="parchment-panel rounded-xl p-7 border border-gold-400/20">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-cinzel">Path I</span>
            <h4 className="mt-2 font-serif text-xl text-parchment-100">14-Day Canonical Guide</h4>
            <p className="mt-2 text-xs text-parchment-300 leading-relaxed font-light">
              A curated two-week devotional through the biblical covenants with classical commentary.
            </p>
            <button
              onClick={() => alert("The 14-Day Canonical Guide PDF has been generated for your study!")}
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold-300 hover:text-gold-200 font-cinzel font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="parchment-panel rounded-xl p-7 border border-gold-400/20">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-cinzel">Path II</span>
            <h4 className="mt-2 font-serif text-xl text-parchment-100">Sacred Art Companion</h4>
            <p className="mt-2 text-xs text-parchment-300 leading-relaxed font-light">
              High-resolution museum plates and theological exegesis of 50 classical masterworks.
            </p>
            <button
              onClick={() => onOpenScripture()}
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold-300 hover:text-gold-200 font-cinzel font-semibold"
            >
              <span>Explore Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="parchment-panel rounded-xl p-7 border border-gold-400/20">
            <span className="text-[10px] uppercase tracking-widest text-gold-400 font-cinzel">Path III</span>
            <h4 className="mt-2 font-serif text-xl text-parchment-100">Weekly Reflections</h4>
            <p className="mt-2 text-xs text-parchment-300 leading-relaxed font-light">
              Quiet Sunday liturgical meditations delivered directly to your inbox without distractions.
            </p>
            {subscribed ? (
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-cinzel">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are subscribed. Pax vobiscum.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-charcoal-900 border border-gold-500/30 text-xs text-parchment-100 placeholder:text-parchment-500 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-gold-400 text-charcoal-950 text-xs font-semibold"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
