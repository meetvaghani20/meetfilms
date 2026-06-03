import { socialLinks } from '../data/siteData.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div>
          <a href="#home" className="font-display text-xl font-extrabold text-white">
            Meet <span className="gold-text">Vaghani</span>
          </a>
          <p className="mt-2 text-sm text-smoke">Professional Video Shooter & Video Editor</p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="grid h-10 w-10 place-items-center rounded border border-white/10 text-white/72 transition hover:border-gold hover:text-gold"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <p className="text-sm text-smoke">© {new Date().getFullYear()} Meet Vaghani. All rights reserved.</p>
      </div>
    </footer>
  );
}
