import React from "react";
import { ArrowUp, Sparkles, BookOpen } from "lucide-react";

export default function Footer({ onOpenScripture, onOpenFaith, onOpenAbout, isReducedMotion, setIsReducedMotion }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: isReducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative bg-charcoal-950 text-parchment-300 border-t border-gold-500/20 py-20 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        {/* Latin Epigraph Banner */}
        <div className="text-center pb-14 border-b border-gold-500/15">
          <span className="text-2xl text-gold-400 font-serif">✝</span>
          <p className="mt-3 font-serif italic text-lg sm:text-xl text-parchment-200 tracking-wide max-w-2xl mx-auto">
            "In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum."
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gold-400/80 font-cinzel">
            John 1:1 • The Eternal Word
          </p>
        </div>

        {/* Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-14 border-b border-gold-500/15 text-sm">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full border border-gold-400/50 bg-gold-400/10 flex items-center justify-center text-gold-300 font-serif">
                ✝
              </span>
              <span className="font-serif tracking-widest text-xl text-parchment-100">
                VERBUM
              </span>
            </div>
            <p className="text-xs text-parchment-400 font-light leading-relaxed">
              A sacred digital anthology uniting Baroque chiaroscuro with contemporary editorial design to tell the biblical drama of redemption.
            </p>
            <p className="text-[11px] text-gold-400/70 font-cinzel">
              MCMXXVI — MMXXVI
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-300 font-cinzel font-semibold">
              The Journey
            </h4>
            <ul className="space-y-2 text-xs text-parchment-300">
              <li>
                <a href="#story" className="hover:text-gold-300 transition-colors">
                  The Six Epochs
                </a>
              </li>
              <li>
                <button onClick={onOpenScripture} className="hover:text-gold-300 transition-colors text-left">
                  Scripture Reader
                </button>
              </li>
              <li>
                <button onClick={onOpenFaith} className="hover:text-gold-300 transition-colors text-left">
                  Theological Pillars
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-gold-300 transition-colors text-left">
                  Aesthetic Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: The Six Chapters */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-300 font-cinzel font-semibold">
              Chapters
            </h4>
            <ul className="space-y-1.5 text-xs text-parchment-400 font-cinzel">
              <li>01. In the Beginning (Genesis)</li>
              <li>02. A Promise in the Stars (Patriarchs)</li>
              <li>03. The Way Through (Exodus)</li>
              <li>04. The Word Became Flesh (Christ)</li>
              <li>05. Morning Has Come (Resurrection)</li>
              <li>06. All Things Made New (Consummation)</li>
            </ul>
          </div>

          {/* Col 4: Keyboard Shortcuts & Accessibility */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-300 font-cinzel font-semibold">
              Accessibility & Keys
            </h4>
            <div className="space-y-2 text-xs text-parchment-400">
              <div className="flex items-center justify-between">
                <span>Next Chapter</span>
                <kbd className="px-2 py-0.5 rounded bg-charcoal-900 border border-gold-500/20 text-gold-300 text-[10px]">
                  ↓ / J
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Prev Chapter</span>
                <kbd className="px-2 py-0.5 rounded bg-charcoal-900 border border-gold-500/20 text-gold-300 text-[10px]">
                  ↑ / K
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Close Dialog</span>
                <kbd className="px-2 py-0.5 rounded bg-charcoal-900 border border-gold-500/20 text-gold-300 text-[10px]">
                  Esc
                </kbd>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setIsReducedMotion(!isReducedMotion)}
                  className="text-xs text-gold-400 hover:text-gold-300 underline font-cinzel"
                >
                  {isReducedMotion ? "Enable Smooth Animations" : "Enable Reduced Motion Mode"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-parchment-500">
          <p>
            © {new Date().getFullYear()} Verbum Anthology. Reverent classical art in the public domain. Soli Deo Gloria.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 hover:border-gold-400 bg-charcoal-900 text-parchment-300 hover:text-gold-200 transition-colors"
          >
            <span>Return to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
