import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import VideoModal from '../components/VideoModal.jsx';
import { portfolioCategories, portfolioItems } from '../data/siteData.js';

const DEFAULT_THUMBNAIL =
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80';
const DEFAULT_ASPECT_RATIO = '16 / 9';

function getGoogleDriveFileId(value) {
  const link = value?.toString().trim();
  if (!link) return '';

  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/i,
    /drive\.google\.com\/open\?id=([^&]+)/i,
    /drive\.google\.com\/uc\?id=([^&]+)/i,
    /[?&]id=([^&]+)/i,
  ];

  for (const pattern of patterns) {
    const match = link.match(pattern);
    if (match?.[1]) return decodeURIComponent(match[1]);
  }

  return /^[a-zA-Z0-9_-]{20,}$/.test(link) ? link : '';
}

function createDriveMedia(googleDriveUrl) {
  const fileId = getGoogleDriveFileId(googleDriveUrl);
  if (!fileId) return {};

  return {
    videoUrl: `https://drive.google.com/file/d/${fileId}/view`,
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`,
    googleDriveUrl: `https://drive.google.com/file/d/${fileId}/view`,
  };
}

function createGalleryItem(item) {
  const driveMedia = createDriveMedia(item.googleDriveUrl);

  return {
    id: item.id || item.title,
    title: item.title,
    category: item.category,
    year: item.year || new Date().getFullYear().toString(),
    thumbnail: item.thumbnail || item.thumbnailUrl || driveMedia.thumbnailUrl || DEFAULT_THUMBNAIL,
    videoUrl: item.videoUrl || driveMedia.videoUrl,
    embedUrl: item.embedUrl || driveMedia.embedUrl,
    googleDriveUrl: item.googleDriveUrl || driveMedia.googleDriveUrl,
    aspectRatio: item.aspectRatio || DEFAULT_ASPECT_RATIO,
  };
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);

  const allItems = useMemo(() => portfolioItems.map(createGalleryItem), []);
  
  const visibleItems = useMemo(() => {
    if (activeCategory === 'All') return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, allItems]);

  return (
    <section id="portfolio" className="bg-ink py-20 sm:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected films, edits, campaigns, and social-first stories."
            description="A showcase of cinematic works and creative storytelling."
            align="center"
          />
        </div>

        <div className="mx-auto mt-9 flex max-w-6xl flex-wrap justify-center gap-2 sm:gap-3">
          {portfolioCategories.map((category) => (
            <motion.div key={category} layout>
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-10 rounded border px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.13em] transition sm:min-h-11 sm:px-4 sm:text-xs ${
                  activeCategory === category
                    ? 'border-gold bg-gold text-black'
                    : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-gold/60 hover:text-gold'
                }`}
              >
                {category}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.04}>
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="group overflow-hidden rounded border border-white/10 bg-white/[0.045]"
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: item.aspectRatio || DEFAULT_ASPECT_RATIO }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveVideo(item)}
                      className="relative block h-full w-full overflow-hidden text-left"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/18 to-transparent" />
                      <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/14 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
                      <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-black shadow-glow transition group-hover:scale-110 group-hover:shadow-[0_0_70px_rgba(214,177,93,0.36)]">
                        <FaPlay />
                      </span>
                      <span className="absolute bottom-4 left-4 right-4 rounded border border-white/60 bg-white/82 p-3 shadow-soft backdrop-blur-md">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b88718]">
                          {item.category} / {item.year}
                        </span>
                        <span className="mt-2 block text-xl font-extrabold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
                          {item.title}
                        </span>
                      </span>
                    </button>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <VideoModal item={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}

