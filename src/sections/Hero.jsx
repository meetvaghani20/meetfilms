import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay } from 'react-icons/fa6';
import { heroVideo } from '../data/siteData.js';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-20">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1800&q=85"
      />
      <div className="video-mask absolute inset-0" />
      <div className="noise-overlay" />
      <div className="cinematic-sweep absolute inset-0" />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 36, 0], y: [0, -24, 0], opacity: [0.28, 0.48, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-12rem] top-20 h-72 w-72 rounded-full bg-gold/18 blur-3xl sm:h-96 sm:w-96"
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -28, 0], y: [0, 30, 0], opacity: [0.18, 0.34, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-[-10rem] h-72 w-72 rounded-full bg-emerald/12 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="section-shell relative z-10 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_360px]">
          <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-gold"
          >
            Cinematic Visual Storytelling
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="font-display text-5xl font-extrabold leading-none text-white sm:text-7xl lg:text-8xl"
          >
            Meet <span className="gold-text">Vaghani</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24 }}
            className="mt-7 max-w-2xl text-lg font-medium leading-8 text-white/82 sm:text-2xl"
          >
            Professional Video Shooter & Video Editor crafting refined films for brands, creators, events,
            products, and premium digital campaigns.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-3 rounded bg-gold px-6 py-4 text-sm font-extrabold text-black shadow-glow transition hover:bg-champagne"
            >
              <FaPlay />
              View Portfolio
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded border border-white/18 bg-white/8 px-6 py-4 text-sm font-extrabold text-white backdrop-blur transition hover:border-gold hover:text-gold"
            >
              Contact Me
              <FaArrowRight />
            </a>
          </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.48, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel relative overflow-hidden rounded p-6"
            >
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Showreel Ready</p>
              <p className="mt-5 font-display text-5xl font-extrabold text-white">HD/4K</p>
              <p className="mt-3 text-sm leading-6 text-smoke">Cinematic production, social edits, color grading, and final delivery for every screen.</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="glass-panel ml-12 mt-5 rounded p-5"
            >
              <p className="text-3xl font-extrabold text-champagne">10+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-smoke">Projects Edited</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
