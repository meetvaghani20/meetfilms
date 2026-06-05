import {
  FaBuilding,
  FaBriefcase,
  FaCakeCandles,
  FaCameraRetro,
  FaClapperboard,
  FaEnvelope,
  FaHandshake,
  FaHouse,
  FaInstagram,
  FaMotorcycle,
  FaStore,
  FaVideo,
  FaWandMagicSparkles,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa6';

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '10+', label: 'Films Delivered' },
  { value: '2+', label: 'Brand Shoots' },
  { value: '98%', label: 'Client Satisfaction' },
];

export const services = [
  {
    title: 'Video Shooting',
    description: 'Cinematic camera work, lighting, framing, and on-location direction for premium productions.',
    icon: FaCameraRetro,
  },
  {
    title: 'Video Editing',
    description: 'Story-first edits with clean pacing, sound polish, titles, and delivery-ready exports.',
    icon: FaClapperboard,
  },
  {
    title: 'Instagram Reels Editing',
    description: 'High-retention short-form edits with rhythm, captions, transitions, and social-first hooks.',
    icon: FaWandMagicSparkles,
  },
  {
    title: 'Business Reel Shooting',
    description: 'Premium business reels for brands, founders, offices, cafes, stores, and promotional campaigns.',
    icon: FaBriefcase,
  },
  {
    title: 'Instagram Handling',
    description: 'Content planning, reel coordination, upload support, and visual consistency for Instagram growth.',
    icon: FaInstagram,
  },
  {
    title: 'Freelancing',
    description: 'Flexible freelance shooting and editing support for agencies, creators, brands, and production teams.',
    icon: FaHandshake,
  },
  {
    title: 'Car/Bike Delivery Shooting',
    description: 'Stylish delivery shoots for cars, bikes, showrooms, dealerships, and customer handover moments.',
    icon: FaMotorcycle,
  },
  {
    title: 'Event Video Shoot',
    description: 'Clean event coverage with highlight reels, candid moments, stage visuals, and social-ready edits.',
    icon: FaVideo,
  },
  {
    title: 'Birthday Shoot',
    description: 'Memorable birthday videos with candid coverage, cinematic moments, music, and short highlight edits.',
    icon: FaCakeCandles,
  },
  {
    title: 'Home Interior Video',
    description: 'Elegant walkthrough videos for interiors, real estate, decor brands, and architecture portfolios.',
    icon: FaHouse,
  },
  {
    title: 'Short Cinematic Video',
    description: 'Compact cinematic films with strong visuals, color grading, pacing, and polished sound design.',
    icon: FaClapperboard,
  },
  {
    title: 'Opening Reels',
    description: 'Launch-day reels for new shops, cafes, studios, showrooms, offices, and business openings.',
    icon: FaWandMagicSparkles,
  },
  {
    title: 'Shop Reels',
    description: 'High-energy shop reels for product displays, offers, customer experience, and brand promotion.',
    icon: FaStore,
  },
  {
    title: 'Corporate Videos',
    description: 'Sharp brand films, interviews, explainers, office culture films, and campaign videos.',
    icon: FaBuilding,
  },
  {
    title: 'YouTube Editing',
    description: 'Long-form edits with structure, jump cuts, motion graphics, thumbnails, and audio balancing.',
    icon: FaYoutube,
  },
];

export const portfolioCategories = [
  'All',
  'Reels',
  'Corporate',
  'Product Videos',
  'Events',
  'Business Reel Shooting',
  'Instagram Handling',
  'Car/Bike Delivery Shooting',
  'Event Video Shoot',
  'Birthday Shoot',
  'Home Interior Video',
  'Short Cinematic Video',
  'Opening Reels',
  'Shop Reels',
];

export const portfolioItems = [
  // Example 1: Google Drive Video
  {
    title: 'Luxury Car Delivery',
    category: 'Car/Bike Delivery Shooting',
    year: '2026',
    googleDriveUrl: 'https://drive.google.com/file/d/1Wzwf1MNSzJ7PdsVUXA-EzOMDxmtCEX1a/view?usp=drive_link',
    thumbnailUrl: '/meet filma-Cover.jpg',
    // Thumbnail is automatically generated from Google Drive if not provided
    aspectRatio: '9 / 16',
  },
  // Example 2: YouTube Video
  
];

export const testimonials = [
  {
    name: 'Aarav Shah',
    role: 'Brand Founder',
    quote:
      'The product film looked premium from the first frame. The edit, lighting, and sound design helped our campaign stand out.',
  },
  {
    name: 'Neha Patel',
    role: 'Content Creator',
    quote:
      'My reels finally started feeling polished and intentional. Meet understands pacing, captions, and visual rhythm beautifully.',
  },
];

export const socialLinks = [
  { label: 'WhatsApp', href: 'https://wa.me/919327434099', icon: FaWhatsapp },
  { label: 'Instagram', href: 'https://www.instagram.com/meet_films_4', icon: FaInstagram },
  { label: 'YouTube', href: 'https://youtube.com/@mk_vlog_04', icon: FaYoutube },
  { label: 'Email', href: 'mailto:hello@meetvaghani601@gmail.com', icon: FaEnvelope },
];

export const contactFormConfig = {
  sheetEndpoint: '',
  fallbackWhatsApp: 'https://wa.me/919327434099',
};

export const heroVideo =
  'https://cdn.coverr.co/videos/coverr-filmmaker-editing-video-footage-9319/1080p.mp4';

export const profileImage =
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85';
