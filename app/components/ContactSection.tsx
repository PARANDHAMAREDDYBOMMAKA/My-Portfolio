"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Send } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDevice } from "../hooks/useDevice";
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { isMobile, isTouchDevice } = useDevice();

  const socialLinks = [
    {
      href: "https://github.com/PARANDHAMAREDDYBOMMAKA",
      icon: faGithub,
      name: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/",
      icon: faLinkedin,
      name: "LinkedIn",
    },
    {
      href: "https://x.com/PARANDHAMA123",
      icon: faXTwitter,
      name: "Twitter",
    },
    {
      href: "https://www.instagram.com/parandhamareddybommaka/",
      icon: faInstagram,
      name: "Instagram",
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 92%",
            end: "top 65%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        cardRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.96,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            end: "top 55%",
            scrub: 1.2,
          },
        }
      );

      gsap.fromTo(
        leftColRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );

      socialLinksRef.current.forEach((link, index) => {
        if (!link) return;

        gsap.fromTo(
          link,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: link,
              start: "top 95%",
              end: "top 75%",
              scrub: 1,
            },
            delay: index * 0.08,
          }
        );

        if (!isTouchDevice) {
          const handleMouseMove = (e: MouseEvent) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(link, {
              x: x * 0.2,
              y: y * 0.2,
              scale: 1.08,
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const handleMouseLeave = () => {
            gsap.to(link, {
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1, 0.4)",
            });
          };

          link.addEventListener("mousemove", handleMouseMove);
          link.addEventListener("mouseleave", handleMouseLeave);
        }
      });

      if (!isMobile) {
        gsap.to(cardRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, isMobile, isTouchDevice]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-(--bg-secondary) overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label mb-4 block"
          >
            Contact
          </motion.span>
          <h2
            ref={titleRef}
            className="section-title mb-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            Let&apos;s Work Together
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how I can help.
          </motion.p>
        </div>

        <div
          ref={cardRef}
          className="card-elevated p-8 md:p-12"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div ref={leftColRef}>
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">
                Get in Touch
              </h3>
              <p className="text-(--text-secondary) mb-8 leading-relaxed">
                I&apos;m currently available for freelance work and full-time opportunities.
                If you have a project that needs development, I&apos;d love to help.
              </p>

              <div className="space-y-4">
                <motion.a
                  href="mailto:rparandhama63@gmail.com"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-(--primary)/10 flex items-center justify-center group-hover:bg-(--primary)/20 group-hover:scale-110 transition-all">
                    <Mail className="w-5 h-5 text-(--primary)" />
                  </div>
                  <div>
                    <p className="text-xs text-(--text-muted) mb-0.5">Email</p>
                    <p className="text-sm text-(--text-primary) font-medium">rparandhama63@gmail.com</p>
                  </div>
                </motion.a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-(--bg-card) border border-(--border-subtle)">
                  <div className="w-10 h-10 rounded-lg bg-(--primary)/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-(--primary)" />
                  </div>
                  <div>
                    <p className="text-xs text-(--text-muted) mb-0.5">Location</p>
                    <p className="text-sm text-(--text-primary) font-medium">Available Worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            <div ref={rightColRef}>
              <h3 className="text-xl font-semibold text-(--text-primary) mb-4">
                Connect With Me
              </h3>
              <p className="text-(--text-secondary) mb-8 leading-relaxed">
                Follow me on social media to stay updated with my latest projects and thoughts.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.name}
                    ref={(el) => { socialLinksRef.current[index] = el; }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-(--bg-card) border border-(--border-subtle) hover:border-(--primary)/30 transition-all group"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <FontAwesomeIcon
                      icon={link.icon}
                      className="w-5 h-5 text-(--text-secondary) group-hover:text-(--primary) group-hover:scale-110 transition-all"
                    />
                    <span className="text-sm font-medium text-(--text-primary)">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>

              <motion.a
                href="mailto:rparandhama63@gmail.com"
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 bg-(--primary) hover:bg-(--primary-dark) text-white font-medium rounded-xl transition-all shadow-lg shadow-(--primary)/20"
              >
                <Send size={18} />
                <span>Send a Message</span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
