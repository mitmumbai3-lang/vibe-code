import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StorySection from "./components/StorySection";
import ScriptureSection from "./components/ScriptureSection";
import FaithSection from "./components/FaithSection";
import AboutSection from "./components/AboutSection";
import JourneySection from "./components/JourneySection";
import Footer from "./components/Footer";
import ChapterModal from "./components/ChapterModal";
import ThreeSacredCanvas from "./components/ThreeSacredCanvas";

import { chapters } from "./data/chapters";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const lenisRef = useRef(null);

  // Check user system preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
    }

    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Initialize Lenis Smooth Scroll with GSAP ScrollTrigger
  useEffect(() => {
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis scroll with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, [isReducedMotion]);

  // Smooth scroll helper
  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (lenisRef.current && !isReducedMotion) {
      lenisRef.current.scrollTo(element, { offset: -60, duration: 1.4 });
    } else {
      element.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
    }
  };

  const handleBeginJourney = () => {
    scrollToId("story");
  };

  const handleOpenScripture = () => {
    scrollToId("scripture");
  };

  const handleOpenFaith = () => {
    scrollToId("faith");
  };

  const handleOpenAbout = () => {
    scrollToId("about");
  };

  return (
    <div className="relative min-h-screen bg-charcoal-950 text-parchment-100 selection:bg-gold-500/30 selection:text-gold-100">
      {/* Subtle Physical Rag Paper Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Gentle Celestial Particle Cross / Starlight Canvas (Three.js with fallback) */}
      <ThreeSacredCanvas isReducedMotion={isReducedMotion} />

      {/* Fixed Transparent Baroque Navigation */}
      <Navbar
        onOpenScripture={handleOpenScripture}
        onOpenFaith={handleOpenFaith}
        onOpenAbout={handleOpenAbout}
        isReducedMotion={isReducedMotion}
        setIsReducedMotion={setIsReducedMotion}
      />

      {/* Main Content Flow */}
      <main id="main-content">
        {/* Full-Screen Hero */}
        <Hero
          onBeginJourney={handleBeginJourney}
          onOpenScripture={handleOpenScripture}
        />

        {/* Pinned Scroll-Driven Story Section (6 Chapters with Classical Paintings) */}
        <StorySection
          onSelectChapter={(chap) => setSelectedChapter(chap)}
          isReducedMotion={isReducedMotion}
        />

        {/* Canonical Scripture Explorer */}
        <ScriptureSection
          onSelectChapter={(chap) => setSelectedChapter(chap)}
        />

        {/* Faith & Theological Foundations */}
        <FaithSection />

        {/* Editorial About & Sacred Art Manifesto */}
        <AboutSection />

        {/* The Invitation Remains / Continue the Journey CTA */}
        <JourneySection
          onOpenScripture={handleOpenScripture}
        />
      </main>

      {/* Liturgical Editorial Footer */}
      <Footer
        onOpenScripture={handleOpenScripture}
        onOpenFaith={handleOpenFaith}
        onOpenAbout={handleOpenAbout}
        isReducedMotion={isReducedMotion}
        setIsReducedMotion={setIsReducedMotion}
      />

      {/* Deep-Dive Chapter Modal (Scripture & Masterwork Exegesis) */}
      {selectedChapter && (
        <ChapterModal
          chapter={selectedChapter}
          onClose={() => setSelectedChapter(null)}
          onNavigate={(chap) => setSelectedChapter(chap)}
        />
      )}
    </div>
  );
}
