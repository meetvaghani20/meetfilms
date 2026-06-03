import { FaCheck, FaWandMagicSparkles } from 'react-icons/fa6';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { profileImage, stats } from '../data/siteData.js';

const highlights = [
  'Premium shoot planning, camera direction, and edit supervision',
  'Short-form, event, corporate, product, and YouTube workflows',
  'Color, audio, pacing, and delivery formats tuned for each platform',
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded border border-gold/20 bg-gold/5 blur-2xl" />
              <img
                src={profileImage}
                alt="Professional cinema camera representing Meet Vaghani profile"
                className="relative aspect-[4/5] w-full rounded object-cover shadow-soft"
                loading="lazy"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded border border-white/10 bg-black/62 p-5 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded bg-gold text-black">
                    <FaWandMagicSparkles />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-white">Luxury Cinematic Edits</p>
                    <p className="text-xs text-smoke">Shot, shaped, colored, and delivered with intent.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="About"
              title="A visual storyteller focused on emotion, rhythm, and premium detail."
              description="Meet Vaghani creates polished video experiences for clients who want their story to feel intentional from the first frame to the final fade. Every project is built with strong pre-production, clean capture, precise editing, and cinematic finishing."
            />

            <div className="mt-8 space-y-4">
              {highlights.map((item) => (
                <Reveal key={item} className="flex gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded bg-gold text-xs text-black">
                    <FaCheck />
                  </span>
                  <p className="text-sm leading-7 text-white/78 sm:text-base">{item}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06}>
                  <div className="rounded border border-white/10 bg-white/[0.04] p-4 text-center">
                    <p className="gold-text text-2xl font-extrabold">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-smoke">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
