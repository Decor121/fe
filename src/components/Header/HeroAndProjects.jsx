import React, { useState } from 'react';
import { heroSlides } from '../../const/const';

const HeroAndProjects = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);


  return (
    <>
      {/* Hero Slider */}
      <section className="relative overflow-hidden bg-black" style={{ height: '100vh', minHeight: '500px' }}>
        {/* Slide Images */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
              style={{ opacity: 0.9 }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-8 z-10">
          <button
            onClick={prev}
            aria-label="Previous"
            className="text-white/50 hover:text-white transition-all transform hover:scale-110"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="text-white/50 hover:text-white transition-all transform hover:scale-110"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[2px] transition-all duration-300 ${i === current ? 'w-10 bg-white' : 'w-10 bg-white opacity-50'
                }`}
            />
          ))}
        </div>

        {/* Floating Logo Bottom-Right */}
        <div className="absolute bottom-4 right-4 z-10 opacity-70">
          <span className="text-[#D4AF37] font-serif text-sm font-bold tracking-widest">
            HOME DECOR
          </span>
        </div>
      </section>
    </>
  );
};

export default HeroAndProjects;
