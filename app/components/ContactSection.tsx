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
      color: "#E1306C",
    },
    {
      href: "https://github.com/PARANDHAMAREDDYBOMMAKA",
      icon: faGithub,
      color: "#F5F5F5",
    },
    {
      href: "https://x.com/PARANDHAMA123",
      icon: faXTwitter,
      color: "#1DA1F2",
    },
    {
      href: "https://www.linkedin.com/in/parandhama-reddy-bommaka/",
      icon: faLinkedin,
      color: "#0077B5",
    },
    {
      href: "https://www.facebook.com/parandhamareddy.sunny/",
      icon: faFacebook,
      color: "#1877F2",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="contact"
      className="py-16 text-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 text-gray-200"
    >
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 border-2 border-purple-500 rounded-xl opacity-20 animate-pulse"></div>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
      >
        Let&apos;s Connect!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg mb-6 text-gray-300"
      >
        Feel free to reach out at{" "}
        <a
          href="mailto:rparandhama63@gmail.com"
          className="text-yellow-400 hover:text-yellow-300 transition-all duration-300"
        >
          rparandhama63@gmail.com
        </a>
      </motion.p>

      {/* Social Icons with Interactive Glow */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delayChildren: 0.3, staggerChildren: 0.1 },
          },
        }}
        className="flex justify-center space-x-6 mt-4"
      >
        {socialLinks.map(({ href, icon, color }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              visible: { opacity: 1, scale: 1 },
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="relative group"
          >
            {/* Outer Glow Effect */}
            <div
              className="absolute inset-0 bg-opacity-30 blur-lg rounded-full transition-all duration-300"
              style={{ backgroundColor: color }}
            />
            {/* Icon */}
            <FontAwesomeIcon
              icon={icon}
              className="text-4xl transition-transform duration-300"
              style={{ color }}
            />
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;
