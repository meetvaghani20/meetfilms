import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa6';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { contactFormConfig, services, socialLinks } from '../data/siteData.js';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      projectType: formData.get('projectType')?.toString(),
      message: formData.get('message')?.toString().trim(),
      submittedAt: new Date().toISOString(),
    };

    if (contactFormConfig.sheetEndpoint) {
      try {
        await fetch(contactFormConfig.sheetEndpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setStatus('Inquiry sent successfully.');
        form.reset();
        return;
      } catch {
        setStatus('Could not send to sheet. Opening WhatsApp instead.');
      }
    }

    const message = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Project Type: ${payload.projectType}`,
      `Message: ${payload.message}`,
    ].join('\n');
    window.open(`${contactFormConfig.fallbackWhatsApp}?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
    setStatus('WhatsApp opened with your inquiry.');
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-luxury-radial py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s shape your next film with clarity, taste, and cinematic energy."
              description="Share your project details, timeline, and preferred deliverables. Meet will get back with availability and the best production plan."
            />

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.045] p-4 text-sm font-bold text-white transition hover:border-gold hover:text-gold"
                  >
                    <Icon className="text-lg" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <Reveal>
            <form onSubmit={handleSubmit} className="rounded border border-white/10 bg-black/32 p-5 shadow-soft backdrop-blur-xl sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-smoke">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-2 w-full rounded border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/32 focus:border-gold"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-smoke">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/32 focus:border-gold"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-smoke">Project Type</span>
                <select
                  name="projectType"
                  className="mt-2 w-full rounded border border-white/10 bg-charcoal px-4 py-3 text-white outline-none transition focus:border-gold"
                >
                  {services.map((service) => (
                    <option key={service.title}>{service.title}</option>
                  ))}
                  <option>Product Video</option>
                </select>
              </label>
              <label className="mt-4 block">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-smoke">Message</span>
                <textarea
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell me about your date, location, budget, and deliverables."
                  className="mt-2 w-full resize-none rounded border border-white/10 bg-white/[0.05] px-4 py-3 text-white outline-none transition placeholder:text-white/32 focus:border-gold"
                />
              </label>
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded bg-gold px-6 py-4 text-sm font-extrabold text-black shadow-glow transition hover:bg-champagne sm:w-auto"
              >
                Send Inquiry
                <FaPaperPlane />
              </button>
              {status ? <p className="mt-4 text-sm font-semibold text-champagne">{status}</p> : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
