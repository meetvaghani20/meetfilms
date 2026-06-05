import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCloudArrowUp, FaLock, FaPenToSquare, FaPlay, FaRightFromBracket, FaTrash, FaXmark } from 'react-icons/fa6';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import VideoModal from '../components/VideoModal.jsx';
import { portfolioCategories, portfolioItems } from '../data/siteData.js';

const API_URL = '/api/portfolio';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'Meet@2005';
const DEFAULT_THUMBNAIL =
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80';
const DEFAULT_ASPECT_RATIO = '16 / 9';

function getVideoAspectRatio(file) {
  return new Promise((resolve) => {
    if (!file?.size) {
      resolve('');
      return;
    }

    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);

    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const { videoWidth, videoHeight } = video;
      URL.revokeObjectURL(objectUrl);
      resolve(videoWidth && videoHeight ? `${videoWidth} / ${videoHeight}` : '');
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve('');
    };
    video.src = objectUrl;
  });
}

function getVideoUrlAspectRatio(videoUrl) {
  return new Promise((resolve) => {
    if (!videoUrl) {
      resolve('');
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const { videoWidth, videoHeight } = video;
      resolve(videoWidth && videoHeight ? `${videoWidth} / ${videoHeight}` : '');
    };
    video.onerror = () => resolve('');
    video.src = videoUrl;
  });
}

async function getApiUploads() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Portfolio upload server is not running.');
  return response.json();
}

async function saveApiUpload(formData, id) {
  const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
    method: id ? 'PUT' : 'POST',
    headers: {
      'X-Admin-Password': ADMIN_PASSWORD,
    },
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Portfolio API save failed');
  }
  return response.json();
}

async function deleteApiUpload(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'X-Admin-Password': ADMIN_PASSWORD,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Portfolio API delete failed');
  }
}

function createGalleryItem(item) {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    year: item.year,
    thumbnail: item.thumbnailUrl || DEFAULT_THUMBNAIL,
    videoUrl: item.videoUrl,
    aspectRatio: item.aspectRatio || DEFAULT_ASPECT_RATIO,
    hasSavedAspectRatio: Boolean(item.aspectRatio),
    isServerItem: Boolean(item.videoUrl),
  };
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('portfolioAdmin') === 'true');
  const [adminOpen, setAdminOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [uploadedItems, setUploadedItems] = useState([]);
  const [storedUploadItems, setStoredUploadItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadNotice, setUploadNotice] = useState('');

  const handleVideoFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadNotice('');
      return;
    }

    setUploadNotice(`Video file selected: ${file.name}`);
  };

  const handleThumbnailFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadNotice('');
      return;
    }

    setUploadNotice(`Thumbnail image selected: ${file.name}`);
  };

  const loadStoredPortfolioItems = async () => {
    try {
      const items = await getApiUploads();
      const sortedItems = items.sort((first, second) => second.createdAt - first.createdAt);
      setStoredUploadItems(sortedItems);
      setUploadedItems(sortedItems.map(createGalleryItem));
    } catch (error) {
      setStoredUploadItems([]);
      setUploadedItems([]);
      setUploadNotice(error.message);
    }
  };

  useEffect(() => {
    loadStoredPortfolioItems().catch(() => {
      setUploadNotice('Saved uploads could not be loaded.');
    });
  }, []);

  useEffect(() => {
    const itemsMissingRatio = uploadedItems.filter((item) => item.videoUrl && !item.hasSavedAspectRatio);
    if (!itemsMissingRatio.length) return;

    let isMounted = true;

    Promise.all(
      itemsMissingRatio.map(async (item) => ({
        id: item.id,
        aspectRatio: await getVideoUrlAspectRatio(item.videoUrl),
      })),
    ).then((ratios) => {
      if (!isMounted) return;

      setUploadedItems((items) =>
        items.map((item) => {
          const ratio = ratios.find((entry) => entry.id === item.id)?.aspectRatio;
          return ratio ? { ...item, aspectRatio: ratio, hasSavedAspectRatio: true } : item;
        }),
      );
    });

    return () => {
      isMounted = false;
    };
  }, [uploadedItems]);

  const allItems = useMemo(() => [...uploadedItems, ...portfolioItems], [uploadedItems]);
  const visibleItems = useMemo(() => {
    if (activeCategory === 'All') return allItems;
    return allItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, allItems]);

  const handleAdminLogin = (event) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('portfolioAdmin', 'true');
      setIsAdmin(true);
      setAdminError('');
      setPassword('');
      return;
    }
    setAdminError('Wrong admin password.');
  };

  const handleProjectUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const videoFile = formData.get('videoFile');
    const thumbnailFile = formData.get('thumbnailFile');
    const title = formData.get('title')?.toString().trim();
    const category = formData.get('category')?.toString();

    if (!title) {
      setUploadNotice('Project title is required.');
      return;
    }

    if (!editingItem && !videoFile?.size) {
      setUploadNotice('Please select a video file.');
      return;
    }

    const existingItem = editingItem ? storedUploadItems.find((item) => item.id === editingItem.id) : null;
    if (editingItem && !existingItem) return;

    try {
      const apiFormData = new FormData();
      apiFormData.append('title', title);
      apiFormData.append('category', category);
      apiFormData.append('aspectRatio', videoFile?.size ? await getVideoAspectRatio(videoFile) : existingItem?.aspectRatio || DEFAULT_ASPECT_RATIO);
      if (videoFile?.size) apiFormData.append('videoFile', videoFile);
      if (thumbnailFile?.size) apiFormData.append('thumbnailFile', thumbnailFile);

      await saveApiUpload(apiFormData, editingItem?.id);
      await loadStoredPortfolioItems();
      setActiveCategory('All');
      setEditingItem(null);
      setUploadNotice(editingItem ? 'Project updated successfully.' : 'Project uploaded successfully.');
      event.currentTarget.reset();
    } catch (error) {
      setUploadNotice(error.message || 'Project could not be saved. Make sure the upload server is running.');
    }
  };

  const handleEditProject = (item) => {
    const storedItem = storedUploadItems.find((upload) => upload.id === item.id);
    if (!storedItem) return;

    setEditingItem(storedItem);
    setAdminOpen(true);
    setUploadNotice('Editing uploaded project.');
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setUploadNotice('');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('portfolioAdmin');
    setIsAdmin(false);
    setEditingItem(null);
    setPassword('');
    setAdminError('');
    setUploadNotice('Admin logged out.');
  };

  const handleDeleteProject = async (item) => {
    const confirmed = window.confirm(`Delete "${item.title}" from Portfolio?`);
    if (!confirmed) return;

    try {
      await deleteApiUpload(item.id);
      if (activeVideo?.id === item.id) setActiveVideo(null);
      await loadStoredPortfolioItems();
      setUploadNotice('Project deleted successfully.');
    } catch (error) {
      setUploadNotice(error.message || 'Project could not be deleted.');
    }
  };

  return (
    <section id="portfolio" className="bg-ink py-20 sm:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected films, edits, campaigns, and social-first stories."
            description="A clean sample gallery for your selected work. Add your uploaded videos and thumbnails when final project media is ready."
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

        <div className="mx-auto mt-8 max-w-3xl rounded border border-white/10 bg-white/[0.035] p-4">
          <button
            type="button"
            onClick={() => setAdminOpen((value) => !value)}
            className="mx-auto flex items-center justify-center gap-2 rounded border border-gold/40 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-champagne transition hover:border-gold hover:bg-gold hover:text-black"
          >
            <FaLock />
            Admin Project Upload
          </button>

          <AnimatePresence>
            {adminOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {!isAdmin ? (
                  <form onSubmit={handleAdminLogin} className="mx-auto mt-5 flex max-w-md flex-col gap-3 sm:flex-row">
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Admin password"
                      className="min-h-11 flex-1 rounded border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="min-h-11 rounded bg-gold px-5 text-sm font-extrabold text-black transition hover:bg-champagne"
                    >
                      Login
                    </button>
                    {adminError ? <p className="text-sm font-semibold text-red-300 sm:basis-full">{adminError}</p> : null}
                  </form>
                ) : (
                  <form
                    key={editingItem?.id ?? 'new-project'}
                    onSubmit={handleProjectUpload}
                    className="mt-5 grid gap-3 sm:grid-cols-2"
                  >
                    <div className="flex items-center justify-between gap-3 rounded border border-white/10 bg-black/20 px-4 py-3 sm:col-span-2">
                      <span className="text-sm font-bold text-champagne">Admin logged in</span>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:border-gold hover:text-gold"
                      >
                        <FaRightFromBracket />
                        Logout
                      </button>
                    </div>
                    <input
                      name="title"
                      type="text"
                      required
                      defaultValue={editingItem?.title ?? ''}
                      placeholder="Project title"
                      className="min-h-11 rounded border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-gold"
                    />
                    <select
                      name="category"
                      defaultValue={editingItem?.category}
                      className="min-h-11 rounded border border-white/10 bg-charcoal px-4 text-sm text-white outline-none transition focus:border-gold"
                    >
                      {portfolioCategories.filter((category) => category !== 'All').map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                    <label className="rounded border border-dashed border-white/15 bg-black/24 p-4 text-center transition hover:border-gold sm:col-span-2">
                      <FaCloudArrowUp className="mx-auto text-2xl text-gold" />
                      <span className="mt-2 block text-sm font-bold text-white">Upload video file</span>
                      <span className="mt-1 block text-xs text-smoke">MP4, MOV, WEBM</span>
                      <input
                        name="videoFile"
                        type="file"
                        accept="video/*"
                        required={!editingItem}
                        className="sr-only"
                        onChange={handleVideoFileChange}
                      />
                    </label>
                    <label className="rounded border border-dashed border-white/15 bg-black/24 p-4 text-center transition hover:border-gold sm:col-span-2">
                      <span className="text-sm font-bold text-white">Upload thumbnail image</span>
                      <span className="mt-1 block text-xs text-smoke">Optional JPG or PNG</span>
                      <input
                        name="thumbnailFile"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleThumbnailFileChange}
                      />
                    </label>
                    <button
                      type="submit"
                      className="rounded bg-gold px-5 py-3 text-sm font-extrabold text-black transition hover:bg-champagne sm:col-span-2"
                    >
                      {editingItem ? 'Update Project' : 'Add Project To Portfolio'}
                    </button>
                    {editingItem ? (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center justify-center gap-2 rounded border border-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-gold hover:text-gold sm:col-span-2"
                      >
                        <FaXmark />
                        Cancel Edit
                      </button>
                    ) : null}
                    <AnimatePresence>
                      {uploadNotice ? (
                        <motion.p
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="rounded border border-gold/30 bg-gold/10 px-4 py-3 text-sm font-semibold text-champagne sm:col-span-2"
                        >
                          {uploadNotice}
                        </motion.p>
                      ) : null}
                    </AnimatePresence>
                  </form>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <Reveal key={item.id ?? item.title} delay={index * 0.04}>
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
                      <span className="mt-2 block text-xl font-extrabold text-black drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">{item.title}</span>
                    </span>
                    </button>
                    {isAdmin && item.id ? (
                      <div className="absolute right-3 top-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditProject(item)}
                          aria-label={`Edit ${item.title}`}
                          className="grid h-9 w-9 place-items-center rounded border border-white/15 bg-black/70 text-white backdrop-blur transition hover:border-gold hover:text-gold"
                        >
                          <FaPenToSquare />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(item)}
                          aria-label={`Delete ${item.title}`}
                          className="grid h-9 w-9 place-items-center rounded border border-red-300/30 bg-black/70 text-red-200 backdrop-blur transition hover:border-red-300 hover:bg-red-400/15"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ) : null}
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
