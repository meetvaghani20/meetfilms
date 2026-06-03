import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';

export default function VideoModal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/88 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.28 }}
            className="w-full max-w-5xl overflow-hidden rounded border border-white/10 bg-charcoal shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">{item.category}</p>
                <h3 className="mt-1 text-base font-bold text-white sm:text-lg">{item.title}</h3>
              </div>
              <button
                type="button"
                aria-label="Close video"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded border border-white/10 text-white transition hover:border-gold hover:text-gold"
              >
                <FaXmark />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              {item.videoUrl ? (
                <video src={item.videoUrl} className="h-full w-full" controls playsInline />
              ) : (
                <iframe
                  title={item.title}
                  src={item.embedUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
