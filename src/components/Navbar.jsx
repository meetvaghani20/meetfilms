import { useEffect, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { navLinks } from '../data/siteData.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-ink/82 shadow-soft backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#home" className="font-display text-xl font-extrabold text-white">
          Meet <span className="gold-text">Vaghani</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/72 transition hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden rounded border border-gold/40 px-5 py-2.5 text-sm font-bold text-champagne transition hover:border-gold hover:bg-gold hover:text-black md:inline-flex"
        >
          Book a Shoot
        </a>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded border border-white/10 bg-white/5 text-white md:hidden"
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-ink/95 px-4 pb-5 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
