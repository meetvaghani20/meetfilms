import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { services } from '../data/siteData.js';

export default function Services() {
  return (
    <section id="services" className="bg-luxury-radial py-20 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Production and post-production built for premium visual impact."
          description="From planning and shooting to final edit exports, each service is shaped for clean storytelling, brand consistency, and platform-specific performance."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.05}>
                <motion.article
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:border-gold/50 hover:bg-white/[0.07]"
                >
                  <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
                  <motion.span
                    whileHover={{ rotate: -8 }}
                    className="relative grid h-12 w-12 place-items-center rounded bg-gold/12 text-xl text-gold transition group-hover:bg-gold group-hover:text-black"
                  >
                    <Icon />
                  </motion.span>
                  <h3 className="relative mt-6 text-xl font-extrabold text-white">{service.title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-smoke">{service.description}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
