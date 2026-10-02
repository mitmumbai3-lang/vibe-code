import React, { useState } from "react";
import { BookOpen, Search, ArrowRight, Bookmark, Sparkles, Filter } from "lucide-react";
import { chapters } from "../data/chapters";

export default function ScriptureSection({ onSelectChapter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTestament, setFilterTestament] = useState("all");

  const filteredChapters = chapters.filter((chapter) => {
    const matchesSearch =
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.verse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.verseFull.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.epoch.toLowerCase().includes(searchTerm.toLowerCase());

    const isOldTestament = ["creation", "abraham", "exodus"].includes(chapter.id);
    const matchesTestament =
      filterTestament === "all" ||
      (filterTestament === "ot" && isOldTestament) ||
      (filterTestament === "nt" && !isOldTestament);

    return matchesSearch && matchesTestament;
  });

  return (
    <section id="scripture" className="relative py-32 px-6 md:px-12 bg-charcoal-900 border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-gold-500/20">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-gold-300 font-cinzel">
              Canonical Texts
            </span>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-parchment-50">
              The Living Scripture
            </h2>
            <p className="mt-4 max-w-xl text-base text-parchment-300 font-light">
              Explore the six foundational covenants and encounters that shape the biblical narrative from the dawn of light to the renewed city.
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-parchment-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search verse or keyword..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-full bg-charcoal-800 border border-gold-500/25 text-xs text-parchment-100 placeholder:text-parchment-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-charcoal-850 rounded-full border border-gold-500/20">
              <button
                onClick={() => setFilterTestament("all")}
                className={`px-3 py-1 text-xs rounded-full transition-colors font-cinzel ${
                  filterTestament === "all"
                    ? "bg-gold-400 text-charcoal-950 font-semibold"
                    : "text-parchment-300 hover:text-gold-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterTestament("ot")}
                className={`px-3 py-1 text-xs rounded-full transition-colors font-cinzel ${
                  filterTestament === "ot"
                    ? "bg-gold-400 text-charcoal-950 font-semibold"
                    : "text-parchment-300 hover:text-gold-200"
                }`}
              >
                Old Testament
              </button>
              <button
                onClick={() => setFilterTestament("nt")}
                className={`px-3 py-1 text-xs rounded-full transition-colors font-cinzel ${
                  filterTestament === "nt"
                    ? "bg-gold-400 text-charcoal-950 font-semibold"
                    : "text-parchment-300 hover:text-gold-200"
                }`}
              >
                New Testament
              </button>
            </div>
          </div>
        </div>

        {/* Scripture Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filteredChapters.map((chapter) => (
            <article
              key={chapter.id}
              className="parchment-panel rounded-xl p-7 border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gold-500/10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-cinzel">
                    Chapter {chapter.number}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-charcoal-950/70 border border-gold-400/20 text-parchment-300 font-cinzel">
                    {chapter.verse}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-2xl text-parchment-100 group-hover:text-gold-200 transition-colors">
                  {chapter.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gold-400/70 font-cinzel mt-1">
                  {chapter.epoch}
                </p>

                <p className="mt-4 font-serif italic text-sm text-parchment-200 line-clamp-3 leading-relaxed border-l border-gold-400/40 pl-3">
                  "{chapter.verseFull}"
                </p>

                <p className="mt-4 text-xs text-parchment-300 leading-relaxed font-light">
                  {chapter.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold-500/15 flex items-center justify-between">
                <button
                  onClick={() => onSelectChapter(chapter)}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-300 hover:text-gold-200 transition-colors font-cinzel"
                >
                  <span>Examine Passage</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <span className="text-[11px] text-parchment-400 italic">
                  {chapter.artStyle.split(" ")[0]} Style
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
