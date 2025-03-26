"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faXTwitter,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";

const ContactSection: React.FC = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/parandhamareddybommaka/",
      icon: faInstagram,
    },
    {
      href: "https://github.com/PARANDHAMAREDDYBOMMAKA",
      icon: faGithub,
    },
    {
      href: "https://x.com/PARANDHAMA123",
      icon: faXTwitter,
    },
    {
      href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/",
      icon: faLinkedin,
    },
    {
      href: "https://www.facebook.com/parandhamareddy.sunny/",
      icon: faFacebook,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      id="contact"
      className="py-16 text-center text-gray-200 bg-gray-900"
    >
      <h2 className="text-4xl font-bold mb-8 glow-text">Contact Me</h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg leading-8 mb-8"
      >
        Reach out to me at{" "}
        <a
          href="mailto:rparandhama63@gmail.com"
          className="text-yellow-500 hover:underline"
        >
          rparandhama63@gmail.com
        </a>{" "}
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.1,
            },
          },
        }}
        className="flex justify-center space-x-6"
      >
        {socialLinks.map(({ href, icon }, index) => (
          <motion.a
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 },
            }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={icon}
              className="text-3xl text-yellow-500 hover:text-yellow-400 transition-colors duration-300"
            />
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
