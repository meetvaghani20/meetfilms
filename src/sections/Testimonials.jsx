import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa6';
import { testimonials } from '../data/siteData.js';
import SectionHeading from '../components/SectionHeading.jsx';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = testimonials[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const move = (step) => {
    setIndex((value) => (value + step + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-ink py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Clients come for polished visuals and stay for a calm, reliable process."
          align="center"
        />

        <div className="mx-auto mt-12 max-w-4xl rounded border border-white/10 bg-white/[0.045] p-6 text-center shadow-soft sm:p-10">
          <FaQuoteLeft className="mx-auto text-3xl text-gold" />
          <p className="mt-6 text-xl font-semibold leading-9 text-white sm:text-2xl">"{active.quote}"</p>
          <div className="mt-8">
            <p className="font-extrabold text-champagne">{active.name}</p>
            <p className="mt-1 text-sm text-smoke">{active.role}</p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => move(-1)}
              className="grid h-11 w-11 place-items-center rounded border border-white/10 text-white transition hover:border-gold hover:text-gold"
            >
              <FaChevronLeft />
            </button>
            {testimonials.map((item, dotIndex) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Show testimonial ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`h-2.5 rounded-full transition ${
                  dotIndex === index ? 'w-8 bg-gold' : 'w-2.5 bg-white/22 hover:bg-white/50'
                }`}
              />
            ))}
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => move(1)}
              className="grid h-11 w-11 place-items-center rounded border border-white/10 text-white transition hover:border-gold hover:text-gold"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
