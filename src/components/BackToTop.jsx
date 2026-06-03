import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#home"
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded border border-gold/40 bg-gold text-black shadow-glow transition duration-300 hover:bg-champagne ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0 pointer-events-none'
      }`}
    >
      <FaArrowUp />
    </a>
  );
}
