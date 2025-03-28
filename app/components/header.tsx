"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as THREE from "three";

const NAV_ITEMS = ["About", "Tech Stacks", "Projects", "Contact"];

const Header: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Dots evenly spaced in center
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const spacing = 20; // Adjust spacing between dots
    for (let i = 0; i < NAV_ITEMS.length; i++) {
      vertices.push((i - (NAV_ITEMS.length - 1) / 2) * spacing, 0, 0);
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 7 }); // Increased size
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 50;

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isScrolled) {
        points.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      mount.removeChild(renderer.domElement);
    };
  }, [isScrolled]);

  return (
    <header
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 shadow-lg transition-all duration-500 ease-in-out rounded-full overflow-hidden flex justify-center items-center ${
        isScrolled && !isHovered
          ? "w-[12%] h-14 bg-black bg-opacity-80 backdrop-blur-lg"
          : "w-[50%] h-16 bg-black bg-opacity-60"
      } ${isHovered ? "w-[50%] h-16" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dots visible when header is in capsule mode */}
      <div
        ref={mountRef}
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-500 ${
          isScrolled && !isHovered ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Navigation bar (Hidden in capsule mode) */}
      <nav
        className={`relative z-10 transition-all duration-500 flex justify-center items-center ${
          isScrolled && !isHovered
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <ul className="flex justify-center space-x-6 text-center">
          {NAV_ITEMS.map((item) => (
            <li key={item} className="flex justify-center items-center">
              <Link
                href={`#${item.toLowerCase().replace(" ", "")}`}
                className="text-white text-lg hover:text-purple-500 transition-colors duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
