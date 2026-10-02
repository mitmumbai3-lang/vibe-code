import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Menu, X, Compass, BookOpen, Sun, Sparkles } from "lucide-react";
import { ambientAudio } from "../utils/audio";

export default function Navbar({ onOpenScripture, onOpenFaith, onOpenAbout, isReducedMotion, setIsReducedMotion }) {
  const [scrolled, setScrolled] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = ambientAudio.toggle();
    setAudioActive(active);
  };

  const scrollToStory = (e) => {
    e?.preventDefault();
    setMobileMenuOpen(false);
    const storyElem = document.getElementById("story");
    if (storyElem) {
      storyElem.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0c0a09]/85 backdrop-blur-md border-b border-gold-500/20 py-3.5 shadow-2xl"
            : "bg-gradient-to-b from-[#0c0a09]/90 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="group flex items-center gap-3 text-parchment-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-sm"
            aria-label="Verbum Home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300 font-serif text-lg group-hover:border-gold-300 group-hover:scale-105 transition-all">
              ✝
            </span>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-xl font-medium text-parchment-100 group-hover:text-gold-200 transition-colors">
                VERBUM
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-400/70 -mt-1 hidden sm:inline">
                Sacred Narrative
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-parchment-300" aria-label="Main Navigation">
            <a
              href="#story"
              onClick={scrollToStory}
              className="hover:text-gold-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all"
            >
              The Story
            </a>
            <button
              onClick={onOpenScripture}
              className="hover:text-gold-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all focus:outline-none text-xs uppercase tracking-[0.2em]"
            >
              Scripture
            </button>
            <button
              onClick={onOpenFaith}
              className="hover:text-gold-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all focus:outline-none text-xs uppercase tracking-[0.2em]"
            >
              Faith
            </button>
            <button
              onClick={onOpenAbout}
              className="hover:text-gold-300 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-400 hover:after:w-full after:transition-all focus:outline-none text-xs uppercase tracking-[0.2em]"
            >
              About
            </button>
          </nav>

          {/* Controls & CTA */}
          <div className="flex items-center gap-3">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                audioActive
                  ? "border-gold-400/60 bg-gold-400/15 text-gold-200 shadow-candle"
                  : "border-parchment-400/20 bg-charcoal-850/60 text-parchment-400 hover:border-gold-500/40 hover:text-parchment-200"
              }`}
              title={audioActive ? "Mute ambient cathedral drone" : "Play ambient cathedral drone"}
              aria-label={audioActive ? "Mute ambient cathedral sound" : "Play ambient cathedral sound"}
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
                  <span className="hidden lg:inline text-[11px] font-sans">Aura On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-60" />
                  <span className="hidden lg:inline text-[11px] font-sans">Sound</span>
                </>
              )}
            </button>

            {/* Reduced Motion Toggle */}
            <button
              onClick={() => setIsReducedMotion(!isReducedMotion)}
              className={`p-1.5 rounded-full border text-xs transition-colors hidden sm:flex items-center justify-center ${
                isReducedMotion
                  ? "border-gold-400 text-gold-300 bg-gold-400/10"
                  : "border-parchment-400/20 text-parchment-400 hover:text-parchment-200"
              }`}
              title={isReducedMotion ? "Reduced motion active" : "Toggle reduced motion"}
              aria-label="Toggle reduced motion"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* "Begin the Journey" CTA */}
            <a
              href="#story"
              onClick={scrollToStory}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 hover:from-gold-200 hover:to-gold-400 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-charcoal-950 transition-all duration-300 shadow-md hover:shadow-divine active:scale-95"
            >
              Begin the Journey
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-parchment-200 hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal-950/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-12 animate-in fade-in duration-300">
          <div className="flex flex-col gap-6 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-400/60 pb-2 border-b border-gold-500/20">
              The Sacred Canon
            </span>
            <a
              href="#story"
              onClick={scrollToStory}
              className="font-serif text-2xl text-parchment-100 hover:text-gold-300 py-2"
            >
              The Story
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScripture();
              }}
              className="font-serif text-2xl text-parchment-100 hover:text-gold-300 py-2"
            >
              Scripture
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFaith();
              }}
              className="font-serif text-2xl text-parchment-100 hover:text-gold-300 py-2"
            >
              Faith
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="font-serif text-2xl text-parchment-100 hover:text-gold-300 py-2"
            >
              About
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleToggleAudio}
              className="w-full py-3 rounded-full border border-gold-500/30 text-parchment-200 text-sm flex items-center justify-center gap-2"
            >
              {audioActive ? <Volume2 className="w-4 h-4 text-gold-300" /> : <VolumeX className="w-4 h-4" />}
              {audioActive ? "Mute Cathedral Drone" : "Enable Cathedral Drone"}
            </button>

            <a
              href="#story"
              onClick={scrollToStory}
              className="w-full text-center py-3.5 rounded-full bg-gold-400 font-semibold tracking-wider text-charcoal-950 text-sm uppercase"
            >
              Begin the Journey
            </a>
          </div>
        </div>
      )}
    </>
  );
}
