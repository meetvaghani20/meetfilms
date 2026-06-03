import { AnimatePresence, motion } from 'framer-motion';

export default function Loader({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-ink"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="mx-auto h-14 w-14 rounded-full border border-white/15 border-t-gold"
            />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.45em] text-champagne">Meet Vaghani</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
