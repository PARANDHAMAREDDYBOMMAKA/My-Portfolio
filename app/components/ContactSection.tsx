"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useGazetteMotion } from "../utils/motion";

const socialLinks = [
  { href: "https://github.com/PARANDHAMAREDDYBOMMAKA", icon: faGithub, name: "GitHub" },
  { href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/", icon: faLinkedin, name: "LinkedIn" },
  { href: "https://x.com/PARANDHAMA123", icon: faXTwitter, name: "Twitter" },
  { href: "https://www.instagram.com/parandhamareddybommaka/", icon: faInstagram, name: "Instagram" },
];

const emailAddress = "rparandhama63@gmail.com";

const ContactSection: React.FC = () => {
  const sectionRef = useGazetteMotion<HTMLElement>();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-secondary) overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <span data-ink className="byline block mb-3">Correspondence &mdash; write to the desk</span>
          <h2 data-ink className="text-display text-4xl md:text-5xl text-(--text-primary) mb-5 tracking-tight">
            Let&rsquo;s talk
          </h2>
          <div data-rule className="hairline-gold w-24 mx-auto mb-6" />
          <p data-ink className="text-(--text-secondary) text-base md:text-lg mb-3 leading-relaxed">
            I&apos;m open to GenAI and full-stack roles, interesting conversations,
            or just a friendly hello.
          </p>
          <p data-ink className="text-(--text-muted) text-sm mb-12">
            Drop a line below &mdash; I usually reply within a day.
          </p>

          <div data-ink className="mb-12">
            <a
              href={`mailto:${emailAddress}`}
              className="underline-sketch inline-block text-2xl md:text-4xl font-semibold text-(--text-primary) hover:text-(--primary) transition-colors duration-500 ease-(--ease-soft) break-all"
            >
              {emailAddress}
            </a>
          </div>

          <p className="hidden print:block text-sm text-(--text-secondary)">
            github.com/PARANDHAMAREDDYBOMMAKA &nbsp;|&nbsp; linkedin.com/in/parandhama-reddy-bommaka &nbsp;|&nbsp; x.com/PARANDHAMA123
          </p>

          <div data-ink className="flex items-center justify-center gap-4 print:hidden">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-(--text-muted) hover:text-(--primary) hover:bg-(--bg-elevated) hover:-translate-y-1 transition-all duration-300 ease-(--ease-soft)"
                aria-label={link.name}
              >
                <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
