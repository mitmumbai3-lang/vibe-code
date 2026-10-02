import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, Sparkles, ChevronRight, Eye } from "lucide-react";
import { chapters } from "../data/chapters";

gsap.registerPlugin(ScrollTrigger);

export default function StorySection({ onSelectChapter, isReducedMotion }) {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const pinWrapper = pinWrapperRef.current;
    if (!container || !pinWrapper) return;

    // If reduced motion is requested, use simpler intersection observer or unpinned scroll
    if (isReducedMotion) {
      const sceneCards = gsap.utils.toArray(".accessible-scene");
      sceneCards.forEach((scene, i) => {
        ScrollTrigger.create({
          trigger: scene,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) setActiveIndex(i);
          },
        });
      });
      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    const sceneElements = gsap.utils.toArray(".pinned-scene");
    const totalScenes = sceneElements.length;

    // Reset styles
    gsap.set(sceneElements, { opacity: 0, pointerEvents: "none" });
    if (sceneElements[0]) {
      gsap.set(sceneElements[0], { opacity: 1, pointerEvents: "auto" });
      const firstContent = sceneElements[0].querySelector(".scene-content");
      if (firstContent) gsap.set(firstContent, { opacity: 1, y: 0 });
    }

    // Master Pinned ScrollTrigger Timeline
    // Pins the wrapper for (totalScenes * 100)vh of scroll distance
    const totalDuration = totalScenes - 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalScenes * 120}%`,
        pin: pinWrapper,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const rawIndex = Math.min(Math.floor(progress * totalScenes), totalScenes - 1);
          setActiveIndex(rawIndex);
        },
      },
    });

    // Cross-fade between each consecutive scene
    for (let i = 0; i < totalScenes - 1; i++) {
      const current = sceneElements[i];
      const next = sceneElements[i + 1];
      const currentContent = current.querySelector(".scene-content");
      const nextContent = next.querySelector(".scene-content");
      const currentImage = current.querySelector(".scene-image");
      const nextImage = next.querySelector(".scene-image");

      const stepTime = i;

      tl.to(
        currentContent,
        {
          opacity: 0,
          y: -30,
          duration: 0.45,
          ease: "power2.inOut",
        },
        stepTime + 0.4
      )
        .to(
          current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.set(current, { pointerEvents: "none" });
            },
            onReverseComplete: () => {
              gsap.set(current, { pointerEvents: "auto" });
            },
          },
          stepTime + 0.5
        )
        .fromTo(
          next,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power1.inOut",
            onStart: () => {
              gsap.set(next, { pointerEvents: "auto" });
            },
          },
          stepTime + 0.5
        )
        .fromTo(
          nextContent,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          stepTime + 0.65
        )
        // Gentle painterly Ken Burns motion on background images
        .fromTo(
          nextImage,
          { scale: 1.08 },
          { scale: 1.0, duration: 1.0, ease: "none" },
          stepTime + 0.4
        );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isReducedMotion]);

  // Jump to chapter on click
  const jumpToChapter = (index) => {
    if (isReducedMotion) {
      const target = document.getElementById(`chapter-${chapters[index].id}`);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const st = ScrollTrigger.getAll().find((s) => s.trigger === containerRef.current);
    if (!st) return;

    const total = chapters.length;
    const targetProgress = index / (total - 1);
    const scrollPos = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: scrollPos, behavior: "smooth" });
  };

  // Keyboard navigation listener (ArrowUp/ArrowDown, J/K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only navigate if story section is currently in view
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5;
      if (!inView) return;

      if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        if (activeIndex < chapters.length - 1) {
          e.preventDefault();
          jumpToChapter(activeIndex + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
        if (activeIndex > 0) {
          e.preventDefault();
          jumpToChapter(activeIndex - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <section id="story" ref={containerRef} className="relative bg-charcoal-950 text-parchment-100">
      {/* Reduced Motion View: Accessible Vertical Flow */}
      {isReducedMotion ? (
        <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto space-y-32">
          {chapters.map((chapter, idx) => (
            <article
              key={chapter.id}
              id={`chapter-${chapter.id}`}
              className="accessible-scene parchment-panel p-8 md:p-14 rounded-2xl border border-gold-400/25 relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-[0.35em] text-gold-300 font-cinzel">
                  Chapter {chapter.number} • {chapter.epoch}
                </span>
                <h2 className="mt-3 font-serif text-4xl md:text-6xl text-parchment-50">
                  {chapter.title}
                </h2>
                <p className="mt-2 text-gold-400 font-cinzel text-sm tracking-wider">
                  {chapter.verse}
                </p>
                <blockquote className="my-6 pl-4 border-l-2 border-gold-400/60 font-serif italic text-lg text-parchment-200">
                  "{chapter.verseFull}"
                </blockquote>
                <p className="text-base text-parchment-300 leading-relaxed max-w-2xl">
                  {chapter.text}
                </p>
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => onSelectChapter(chapter)}
                    className="px-6 py-2.5 rounded-full bg-gold-400 text-charcoal-950 text-xs font-semibold tracking-wider uppercase"
                  >
                    Examine Passage & Art
                  </button>
                </div>
              </div>
              <img
                src={chapter.image}
                alt={chapter.title}
                className="mt-8 w-full h-80 object-cover rounded-xl border border-gold-500/20"
              />
            </article>
          ))}
        </div>
      ) : (
        /* Pinned Cinematic Scroll-Scrubbed Stage */
        <div ref={pinWrapperRef} className="relative w-full h-screen overflow-hidden">
          {/* Render All 6 Pinned Chapters Stacking Over Each Other */}
          {chapters.map((chapter, idx) => (
            <article
              key={chapter.id}
              className={`pinned-scene absolute inset-0 w-full h-full flex items-end justify-start px-6 pb-16 md:px-16 md:pb-24 lg:px-24 select-none ${
                idx === 0 ? "opacity-100" : "opacity-0"
              }`}
              aria-label={`Chapter ${chapter.number}: ${chapter.title}`}
            >
              {/* Classical Oil Painting Background with Halftone and Chiaroscuro Overlays */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <img
                  src={chapter.image}
                  alt={`${chapter.artTitle} classical oil painting`}
                  className="scene-image w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
                  loading={idx <= 1 ? "eager" : "lazy"}
                />
                {/* Baroque Dramatic Gradient Overlays: Deep Charcoal bottom & left for pristine text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/50 to-transparent" />
                <div className="absolute inset-0 chiaroscuro-vignette opacity-80 pointer-events-none" />
                <div className="absolute inset-0 halftone-dots opacity-20 pointer-events-none" />
              </div>

              {/* Main Content Card with Warm Parchment Panel Aesthetics */}
              <div className="scene-content relative z-10 max-w-3xl w-full parchment-panel p-6 sm:p-8 md:p-12 rounded-2xl border border-gold-400/25">
                {/* Epoch Badge & Verse Reference */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gold-500/15">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold-400/20 text-gold-300 font-cinzel text-xs font-semibold">
                      {chapter.number}
                    </span>
                    <span className="text-xs uppercase tracking-[0.3em] text-gold-300 font-cinzel">
                      Act {chapter.number} • {chapter.epoch}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-charcoal-900/80 border border-gold-400/20 text-[11px] font-cinzel text-parchment-200">
                    <BookOpen className="w-3 h-3 text-gold-400" />
                    {chapter.verse}
                  </span>
                </div>

                {/* Chapter Title */}
                <h2 className="mt-4 font-serif text-3xl sm:text-5xl md:text-6xl text-parchment-50 tracking-tight leading-tight">
                  {chapter.title}
                </h2>

                <p className="mt-1 text-xs sm:text-sm uppercase tracking-[0.25em] text-gold-400/80 font-cinzel">
                  {chapter.subtitle}
                </p>

                {/* Short Poetic Explanation */}
                <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-parchment-200 font-light">
                  {chapter.text}
                </p>

                {/* Scripture Quote Preview */}
                <div className="mt-5 p-3.5 sm:p-4 rounded-lg bg-charcoal-950/60 border-l-2 border-gold-400 text-xs sm:text-sm italic text-parchment-300 leading-relaxed font-serif">
                  "{chapter.verseFull}"
                </div>

                {/* Interactive Action Bar */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gold-500/15">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onSelectChapter(chapter)}
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-400 hover:bg-gold-300 text-charcoal-950 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-divine active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Examine Art & Scripture</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-[11px] text-parchment-400 font-cinzel">
                    <span>Art:</span>
                    <span className="text-gold-300/90 italic">{chapter.artTitle}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Floating Chapter Progress Rail (Right Side) */}
          <aside
            aria-label="Story Chapter Progress"
            className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-4 bg-charcoal-950/60 backdrop-blur-md p-3.5 rounded-full border border-gold-500/20 shadow-2xl"
          >
            <div className="text-[9px] uppercase tracking-widest text-gold-400/80 font-cinzel writing-mode-vertical rotate-180 mb-2">
              Epochs
            </div>

            {/* Vertical Chapter Dots */}
            {chapters.map((chap, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={chap.id}
                  onClick={() => jumpToChapter(idx)}
                  className="group relative flex items-center justify-center p-1.5 focus:outline-none"
                  aria-label={`Jump to Chapter ${chap.number}: ${chap.title}`}
                >
                  {/* Tooltip on hover */}
                  <span className="absolute right-10 px-3 py-1 rounded bg-charcoal-900 border border-gold-400/30 text-parchment-100 text-xs font-cinzel whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                    {chap.number}. {chap.title}
                  </span>

                  {/* Dot */}
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-3 h-3 bg-gold-400 ring-4 ring-gold-400/25 shadow-candle"
                        : "w-2 h-2 bg-parchment-400/30 group-hover:bg-gold-400/60"
                    }`}
                  />
                </button>
              );
            })}

            {/* Chapter Counter Badge */}
            <div className="mt-2 text-[10px] font-cinzel font-semibold text-gold-300 tracking-wider">
              {chapters[activeIndex].number}/06
            </div>
          </aside>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-charcoal-800/80 z-30">
            <div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-parchment-100 transition-all duration-150"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
