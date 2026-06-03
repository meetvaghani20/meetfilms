import { motion } from 'framer-motion';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-gold">{eyebrow}</p>
      <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-sm leading-7 text-smoke sm:text-base">{description}</p> : null}
    </motion.div>
  );
}
