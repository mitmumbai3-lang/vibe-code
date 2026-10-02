import React, { useEffect } from "react";
import { X, BookOpen, Palette, ChevronLeft, ChevronRight, Share2, Sparkles } from "lucide-react";
import { chapters } from "../data/chapters";

export default function ChapterModal({ chapter, onClose, onNavigate }) {
  useEffect(() => {
    if (!chapter) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") navigateStep(-1);
      if (e.key === "ArrowRight") navigateStep(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [chapter]);

  if (!chapter) return null;

  const currentIndex = chapters.findIndex((c) => c.id === chapter.id);

  const navigateStep = (direction) => {
    const nextIdx = (currentIndex + direction + chapters.length) % chapters.length;
    onNavigate(chapters[nextIdx]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-charcoal-950/80 backdrop-blur-xl animate-in fade-in duration-300"
    >
      {/* Background backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto parchment-panel rounded-2xl border border-gold-400/30 p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col gap-8 scrollbar-thin">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-gold-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-300 font-cinzel">
              Act {chapter.number} • {chapter.epoch}
            </span>
            <span className="text-gold-500/30">|</span>
            <span className="text-xs text-parchment-300 font-cinzel">
              {chapter.verse}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prev / Next buttons */}
            <button
              onClick={() => navigateStep(-1)}
              className="p-1.5 rounded-full border border-parchment-400/20 hover:border-gold-400 text-parchment-300 hover:text-gold-300 transition-colors"
              title="Previous Epoch"
              aria-label="Previous Chapter"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateStep(1)}
              className="p-1.5 rounded-full border border-parchment-400/20 hover:border-gold-400 text-parchment-300 hover:text-gold-300 transition-colors"
              title="Next Epoch"
              aria-label="Next Chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 ml-2 rounded-full border border-gold-500/30 hover:bg-gold-500/20 text-parchment-200 transition-colors"
              title="Close modal (Esc)"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Artwork Hero in Modal */}
        <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-gold-400/20 group">
          <img
            src={chapter.image}
            alt={chapter.artTitle}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-cinzel">
                Masterwork Canvas
              </span>
              <h4 className="font-serif text-lg text-parchment-100">
                {chapter.artTitle}
              </h4>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-charcoal-950/80 border border-gold-500/30 text-gold-300 font-cinzel">
              {chapter.artStyle}
            </span>
          </div>
        </div>

        {/* Title & Epigraph */}
        <div>
          <h3 id="modal-title" className="font-serif text-3xl sm:text-5xl text-parchment-50">
            {chapter.title}
          </h3>
          <p className="mt-1 text-sm uppercase tracking-[0.25em] text-gold-400 font-cinzel">
            {chapter.subtitle}
          </p>
        </div>

        {/* Two Column Layout: Scripture & Classical Curatorial Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gold-500/15">
          {/* Left Column: Scripture & Theological Arc */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 font-cinzel">
              <BookOpen className="w-4 h-4 text-gold-400" />
              <span>Sacred Scripture</span>
            </div>

            <div className="p-6 rounded-xl bg-charcoal-950/70 border border-gold-500/20">
              <div className="font-serif italic text-lg sm:text-xl text-parchment-100 leading-relaxed">
                <span className="float-left text-5xl font-serif text-gold-400 font-bold leading-none pr-3 pt-1">
                  {chapter.verseFull.charAt(0)}
                </span>
                {chapter.verseFull.slice(1)}
              </div>
              <p className="mt-4 text-right text-xs uppercase tracking-widest text-gold-400 font-cinzel">
                — {chapter.verse}
              </p>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-parchment-400 font-cinzel mb-2">
                Theological Significance
              </h5>
              <p className="text-sm text-parchment-300 leading-relaxed font-light">
                {chapter.theology}
              </p>
            </div>
          </div>

          {/* Right Column: Historical Artistry & Visual Exegesis */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-300 font-cinzel">
              <Palette className="w-4 h-4 text-gold-400" />
              <span>Classical Art Analysis</span>
            </div>

            <div className="p-6 rounded-xl bg-charcoal-900/60 border border-gold-500/15 space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-cinzel">
                  Technique & Lighting
                </span>
                <p className="mt-1 text-sm text-parchment-200 leading-relaxed">
                  {chapter.artDescription}
                </p>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-gold-400/80 font-cinzel">
                  Tradition & Provenance
                </span>
                <p className="mt-1 text-sm text-parchment-300 leading-relaxed">
                  Influenced by the masters of the Italian and Dutch Baroque, utilizing extreme tenebrism and chiaroscuro where spiritual light functions not merely as illumination, but as divine revelation against mortal vulnerability.
                </p>
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-parchment-400 font-cinzel mb-2">
                Reflective Meditation
              </h5>
              <p className="text-sm text-parchment-300 leading-relaxed font-light">
                {chapter.text}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gold-500/20">
          <button
            onClick={() => navigateStep(-1)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-300 font-cinzel"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Act</span>
          </button>

          <span className="text-xs text-gold-400 font-cinzel">
            {currentIndex + 1} of {chapters.length}
          </span>

          <button
            onClick={() => navigateStep(1)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-parchment-300 hover:text-gold-300 font-cinzel"
          >
            <span>Next Act</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
