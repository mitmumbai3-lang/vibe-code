import React from "react";
import { Palette, Eye, Feather, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-charcoal-900 border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-gold-300 font-cinzel">
              Design & Theological Manifesto
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-parchment-50 leading-tight">
              A Sanctuary of Ink, Canvas, & Light.
            </h2>
            <p className="text-base sm:text-lg text-parchment-200 font-light leading-relaxed">
              In an era dominated by hyper-distracted digital interfaces and superficial church templates, <span className="font-serif italic text-gold-300">Verbum</span> was conceived as a digital sanctuary. We marry the dramatic visual theological tradition of the Baroque with contemporary editorial restraint.
            </p>

            <div className="space-y-4 pt-4 text-sm sm:text-base text-parchment-300 font-light leading-relaxed">
              <p>
                Classical master painters understood that truth cannot be flattened into sterile bullet points. Through <strong className="text-gold-200 font-normal">chiaroscuro</strong>—the violent, intimate collision of deep shadow and radiant light—Caravaggio, Rembrandt, and Tintoretto painted what theology proclaims: grace is most luminous when confronted with the reality of human brokenness.
              </p>
              <p>
                Every visual element here—from the grain of 17th-century rag paper to halftone dissolves, warm parchment panels, and disciplined serif typography—serves to elevate the mind toward reverence, stillness, and wonder.
              </p>
            </div>

            {/* Core Values Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-gold-500/15">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-parchment-100 font-cinzel">Baroque Art</h4>
                  <p className="text-[11px] text-parchment-400">Sacred Tenebrism</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300">
                  <Feather className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-parchment-100 font-cinzel">Editorial</h4>
                  <p className="text-[11px] text-parchment-400">High Restraint</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center text-gold-300">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-parchment-100 font-cinzel">Universal</h4>
                  <p className="text-[11px] text-parchment-400">Accessible Design</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Panel: Baroque Frame Preview */}
          <div className="lg:col-span-5">
            <div className="parchment-panel rounded-2xl p-6 sm:p-8 border border-gold-400/30 shadow-2xl relative">
              <div className="relative rounded-xl overflow-hidden border border-gold-500/30 aspect-[4/5]">
                <img
                  src="/images/jesus.jpg"
                  alt="Baroque painting study in chiaroscuro"
                  className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-300 font-cinzel">
                    Visual Exegesis
                  </span>
                  <p className="font-serif text-lg text-parchment-100 mt-1">
                    "Light shines in the darkness, and the darkness has not overcome it."
                  </p>
                  <p className="text-xs text-gold-400/80 font-cinzel mt-1">
                    John 1:5
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-parchment-400 font-cinzel tracking-widest uppercase">
                  VERBUM ARCHIVE • MCMXXVI–MMXXVI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
